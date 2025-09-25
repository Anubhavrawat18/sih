import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfAYhDoYLgQeiujQsp6zQTrdAOkmZ1bIY",
  authDomain: "sih25-472317-7ad51.firebaseapp.com",
  projectId: "sih25-472317-7ad51",
  storageBucket: "sih25-472317-7ad51.firebasestorage.app",
  messagingSenderId: "777523139075",
  appId: "1:777523139075:web:57432c5c27edc6a735b436",
  measurementId: "G-4FQXV9YF4L",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
