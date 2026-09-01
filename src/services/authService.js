import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export async function registerWithEmail(email, password, username) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: username });

  try {
    await setDoc(doc(db, "users", cred.user.uid), {
      username,
      email,
      points: 0,
      activity: {},
      createdAt: serverTimestamp(),
    });
  } catch (firestoreError) {
    console.error("Gagal membuat dokumen user di Firestore:", firestoreError);
  }

  return cred.user;
}

export async function loginWithEmail(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logout() {
  await signOut(auth);
}

export function mapAuthError(error) {
  const code = error?.code || "";
  switch (code) {
    case "auth/invalid-email":
      return "Format email tidak valid.";
    case "auth/email-already-in-use":
      return "Email sudah terdaftar. Coba login.";
    case "auth/weak-password":
      return "Password minimal 6 karakter.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email atau password salah.";
    default:
      return "Terjadi kesalahan. Coba lagi.";
  }
}
