// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCBsjIs9_CTF4oX6KL9nvHavwGocasgSIg",
    authDomain: "gamematch-7631c.firebaseapp.com",
    projectId: "gamematch-7631c",
    storageBucket: "gamematch-7631c.appspot.com",
    messagingSenderId: "707363486848",
    appId: "1:707363486848:web:1529c53254681bff233a65"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

