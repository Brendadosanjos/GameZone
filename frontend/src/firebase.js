
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpaSWPslUS5Bz8i8H1w3x-6HoY5iD5qno",
  authDomain: "gamezone-unifor.firebaseapp.com",
  projectId: "gamezone-unifor",
  storageBucket: "gamezone-unifor.firebasestorage.app",
  messagingSenderId: "881775091190",
  appId: "1:881775091190:web:2bc03c0ce720100025fbd7"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);


const auth = getAuth(app);

export { db, auth };