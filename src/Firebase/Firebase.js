import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBiGCKjhl6ppeBy2roZpv3caBqSQCZDR7E",
  authDomain: "filmyverse-e8055.firebaseapp.com",
  projectId: "filmyverse-e8055",
  storageBucket: "filmyverse-e8055.appspot.com",
  messagingSenderId: "404504534307",
  appId: "1:404504534307:web:87186e0b9a073f5b660096",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db , "users");

export default app;
