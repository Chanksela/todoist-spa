import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2L06uGh3NSS6vosoO_MNZeMi0JVt8Sg8",
  authDomain: "todoist-91eb1.firebaseapp.com",
  projectId: "todoist-91eb1",
  storageBucket: "todoist-91eb1.appspot.com",
  messagingSenderId: "928856930547",
  appId: "1:928856930547:web:fd0b177f4fbb4a8b6d1f86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
