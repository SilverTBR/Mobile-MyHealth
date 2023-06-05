import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAVjF7NpQG90Tc4cVSXbgg8en8H2xXy0q8",
  authDomain: "projetomobile-myhealth.firebaseapp.com",
  projectId: "projetomobile-myhealth",
  storageBucket: "projetomobile-myhealth.appspot.com",
  messagingSenderId: "476730310329",
  appId: "1:476730310329:web:4a913584cad1029e3da568"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export {auth, db, storage}