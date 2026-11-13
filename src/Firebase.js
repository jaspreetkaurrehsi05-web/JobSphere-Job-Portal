import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgA_DcwldlA2dtzhHeyt0UYPL4M8Q4GOM",
  authDomain: "jaspreet-jobsphere.firebaseapp.com",
  projectId: "jaspreet-jobsphere",
  storageBucket: "jaspreet-jobsphere.firebasestorage.app",
  messagingSenderId: "788194131901",
  appId: "1:788194131901:web:fc7739f919fe5fbb3b9cd4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);