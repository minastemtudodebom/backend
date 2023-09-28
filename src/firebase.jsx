// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCqIQAaJmGXjj4Q7CeqLxCnijPjGYQsCok",
  authDomain: "minastemtudodebom-6dd23.firebaseapp.com",
  projectId: "minastemtudodebom-6dd23",
  storageBucket: "minastemtudodebom-6dd23.appspot.com",
  messagingSenderId: "765319458438",
  appId: "1:765319458438:web:44469f41a1e7e7c5b1ab07"
};
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const db = getFirestore(app)
export {db}
