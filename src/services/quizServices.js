import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  setDoc,
  increment,
} from "firebase/firestore";
import { db } from "../config/firebase";

export async function getLearningPaths() {
  const snap = await getDocs(collection(db, "learningPaths"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getQuestions(pathId) {
  const q = query(
    collection(db, "learningPaths", pathId, "questions"),
    orderBy("order"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function submitAnswer(uid, points) {
  await setDoc(
    doc(db, "users", uid),
    { points: increment(points) },
    { merge: true },
  );
}
