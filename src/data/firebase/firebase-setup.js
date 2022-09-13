// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIlIpH8h7Aq5kfHLZuUQ-x5mtSsx_tRsg",
  authDomain: "shoppe-users-base.firebaseapp.com",
  projectId: "shoppe-users-base",
  storageBucket: "shoppe-users-base.appspot.com",
  messagingSenderId: "993990695561",
  appId: "1:993990695561:web:e163ec7aa55d78d06a4458",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const dataBase = getFirestore(app);
