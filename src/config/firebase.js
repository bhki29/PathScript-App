import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { initializeFirestore, getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBw21We-0uSw5uuqJ-8FHWlRHXGCAu2zQc",
  authDomain: "pathscript.firebaseapp.com",
  projectId: "pathscript",
  storageBucket: "pathscript.firebasestorage.app",
  messagingSenderId: "651083166241",
  appId: "1:651083166241:web:ab9d9322de8e9874e1a960",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = (() => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (e) {
    return getAuth(app);
  }
})();

export const db = (() => {
  try {
    return initializeFirestore(app, {
      experimentalForceLongPolling: true,
      useFetchStreams: false,
    });
  } catch (e) {
    // sudah pernah di-inisialisasi (fast refresh) -> pakai instance yang ada
    return getFirestore(app);
  }
})();

export default app;
