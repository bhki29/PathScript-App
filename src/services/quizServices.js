import {
  collection,
  getDocs,
  getCountFromServer,
  getDoc,
  orderBy,
  query,
  doc,
  setDoc,
  runTransaction,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { getLocalDateKey } from "../utils/date";

export async function getLearningPaths() {
  const snap = await getDocs(collection(db, "learningPaths"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getLearningPathsWithProgress(uid) {
  const paths = await getLearningPaths();

  const userSnap = uid ? await getDoc(doc(db, "users", uid)) : null;
  const progressMap =
    userSnap && userSnap.exists() ? userSnap.data().progress || {} : {};

  const withProgress = await Promise.all(
    paths.map(async (path) => {
      let totalQuestions = 0;
      try {
        const countSnap = await getCountFromServer(
          collection(db, "learningPaths", path.id, "questions"),
        );
        totalQuestions = countSnap.data().count;
      } catch (err) {
        totalQuestions = 0;
      }

      const unlockedOrder = progressMap[path.id] || 1;
      const completed = Math.max(unlockedOrder - 1, 0);
      const percent =
        totalQuestions > 0
          ? Math.min(Math.round((completed / totalQuestions) * 100), 100)
          : 0;

      return { ...path, percent, totalQuestions, completed };
    }),
  );

  return withProgress;
}

export async function getQuestions(pathId) {
  const q = query(
    collection(db, "learningPaths", pathId, "questions"),
    orderBy("order"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getUnlockedOrder(uid, pathId) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return 1;
  const progress = snap.data().progress || {};
  return progress[pathId] || 1;
}

export async function getLives(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return 5;
  const lives = snap.data().lives;
  return typeof lives === "number" ? lives : 5;
}

export async function submitAnswer(uid, pathId, order, points, correct) {
  const userRef = doc(db, "users", uid);
  let livesAfter = 5;

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(userRef);
    const data = snap.exists() ? snap.data() : {};
    const currentPoints = data.points || 0;
    const progress = data.progress || {};
    const currentUnlocked = progress[pathId] || 1;
    const currentLives = typeof data.lives === "number" ? data.lives : 5;

    const updates = {};

    if (correct) {
      updates.points = currentPoints + points;
      const nextUnlocked = Math.max(currentUnlocked, order + 1);
      updates.progress = { ...progress, [pathId]: nextUnlocked };

      const activity = data.activity || {};
      const todayKey = getLocalDateKey();
      updates.activity = {
        ...activity,
        [todayKey]: (activity[todayKey] || 0) + points,
      };

      livesAfter = currentLives;
    } else {
      const nextLives = Math.max(currentLives - 1, 0);
      updates.lives = nextLives;
      livesAfter = nextLives;
    }

    transaction.set(userRef, updates, { merge: true });
  });

  return livesAfter;
}

export async function resetLives(uid) {
  await setDoc(doc(db, "users", uid), { lives: 5 }, { merge: true });
}
