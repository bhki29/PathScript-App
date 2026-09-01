# PathScript Apps

PathScript adalah aplikasi belajar coding berbasis React Native (Expo) yang membantu pengguna mempelajari bahasa/tools pemrograman (JavaScript, TypeScript, Node.js, React, React Native) lewat jalur belajar (_learning path_) berbentuk kuis bertahap. Setiap jawaban benar memberi poin, membuka soal berikutnya, dan tercatat sebagai progres mingguan pengguna. Data pengguna (autentikasi, progres, poin, dan foto profil) disimpan di Firebase Authentication & Cloud Firestore.

## Features

- **Autentikasi** — Register & login dengan email/password (Firebase Authentication), lengkap dengan pesan error yang mudah dipahami.
- **Learning Path & Kuis** — Daftar jalur belajar (JavaScript, TypeScript, Node.js, React, React Native) dengan soal berurutan; soal berikutnya terbuka setelah soal sebelumnya dijawab benar.
- **Sistem Nyawa (Lives)** — Pengguna punya jatah nyawa yang berkurang saat menjawab salah, dan bisa direset.
- **Poin & Progres** — Poin bertambah setiap jawaban benar, disimpan per pengguna di Firestore beserta progres tiap learning path.
- **Edit Foto Profil** — Pilih foto dari galeri, otomatis di-resize & dikompres, lalu disimpan sebagai base64 di Firestore — tanpa perlu Firebase Storage/paket Blaze.
- **Weekly Progress** — Grafik aktivitas 7 hari terakhir (Senin–Minggu) dibangun dari data poin harian asli pengguna, bukan data dummy.
- **Sinkronisasi Profil Global** — Data profil (foto, poin, aktivitas) dikelola terpusat lewat `AuthContext`, sehingga Home dan Profile selalu menampilkan data terbaru yang sama secara otomatis.
- **Pencarian Learning Path** — Kolom pencarian di Home untuk memfilter learning path berdasarkan judul.

## Project structure

```
PathScript-app/
  App.js                      # Root component: AuthProvider + NavigationContainer
  app.json                    # Konfigurasi Expo (icon, splash, plugin, permission)
  index.js                    # Entry point Expo
  assets/                     # Icon, font, ilustrasi, dan asset UI (point.png, edit-profile.png, dll)
  scripts/
    seed.js                   # Script seeding data learningPaths & questions ke Firestore
  src/
    config/
      firebase.js              # Inisialisasi Firebase App, Auth (dengan persistence), dan Firestore
    context/
      AuthContext.js           # State auth (user) + profil Firestore (points, photoBase64, activity) - single source of truth
    navigation/
      RootNvigator.js          # Switch antara AuthStack & MainTabs berdasarkan status login
      AuthStack.js              # Stack navigator untuk layar login/register
      MainTabs.js                # Tab navigator utama (Home, Profile, dst)
    screens/
      SplashScreen.js           # Splash screen saat auth state dicek
      AuthScreen.js              # Layar login & register
      HomeScreen.js               # Daftar learning path + progres + pencarian
      QuizPathScreen.js            # Daftar soal dalam satu learning path
      QuizQuestionScreen.js         # Layar menjawab soal kuis
      ProfileScreen.js               # Edit foto profil, badge poin, grafik Weekly Progress, logout
    services/
      authService.js            # register, login, logout, mapping pesan error auth
      quizServices.js            # CRUD learning path/soal, submit jawaban, progres, lives, activity harian
      profileService.js          # Pick foto galeri -> resize/compress -> simpan base64 ke Firestore
    theme/
      colors.js                  # Palet warna aplikasi (dark theme)
    utils/
      date.js                    # Helper tanggal lokal untuk perhitungan Weekly Progress
```

## Get started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Konfigurasi Firebase**

   Project ini memakai Firebase Authentication (Email/Password) dan Cloud Firestore. File `src/config/firebase.js` **tidak ikut ter-commit ke repository** (lihat `.gitignore`) karena berisi kredensial project. Buat file `src/config/firebase.js` sendiri dengan isi berikut, lalu isi `firebaseConfig` sesuai project Firebase kamu (Project Settings > General > Your apps):

   ```javascript
   import { initializeApp, getApps, getApp } from "firebase/app";
   import {
     initializeAuth,
     getReactNativePersistence,
     getAuth,
   } from "firebase/auth";
   import { initializeFirestore, getFirestore } from "firebase/firestore";
   import AsyncStorage from "@react-native-async-storage/async-storage";

   //masukan api key yang sudah dibuat di firebase disini
   const firebaseConfig = {
     apiKey: "",
     authDomain: "",
     projectId: "",
     storageBucket: "",
     messagingSenderId: "",
     appId: "",
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
       return getFirestore(app);
     }
   })();

   export default app;
   ```

   Setelah itu, aktifkan **Authentication > Email/Password** dan **Firestore Database** di Firebase Console (Storage tidak dibutuhkan).

3. **(Opsional) Seed data learning path & soal**

   ```bash
   node scripts/seed.js
   ```

   Membutuhkan `scripts/serviceAccountKey.json` (Firebase Admin SDK service account) — jangan commit file ini ke repository publik.

4. **Jalankan aplikasi**

   ```bash
   npx expo start
   ```

   Lalu buka di Expo Go (scan QR code), emulator Android, atau simulator iOS. Bisa juga langsung:

   ```bash
   npm run android
   npm run ios
   npm run web
   ```

## Notes

- **Tanpa Firebase Storage** — Fitur edit foto profil sengaja tidak memakai Firebase Storage karena membutuhkan paket berbayar (Blaze). Sebagai gantinya, foto di-resize ke ±400px, dikompres, lalu disimpan sebagai string base64 pada dokumen `users/{uid}.photoBase64` di Firestore. Ada batas ukuran (~700KB) agar tidak melebihi limit dokumen Firestore (1MB).
- **Kredensial Firebase** — `src/config/firebase.js` **tidak ada di repository** (masuk `.gitignore`) karena berisi `firebaseConfig` dengan kredensial project. Setiap developer wajib membuat file ini sendiri secara lokal mengikuti template di bagian _Get started_ di atas. Jangan pernah commit file ini dengan value asli.
- **`scripts/serviceAccountKey.json`** — berisi kredensial admin Firebase, pastikan file ini masuk `.gitignore` dan tidak pernah ter-push ke repository publik.
- **Weekly Progress** — data aktivitas mingguan mengikuti waktu lokal perangkat pengguna (bukan UTC), lihat `src/utils/date.js`.
- Dibangun dengan **Expo SDK 54** — jika menambah native module baru, jalankan `npx expo install <package>` agar versinya tetap kompatibel.
