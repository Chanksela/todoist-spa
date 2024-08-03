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

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is authenticated", user);
    // Perform Firestore operations
  } else {
    console.log("User is not authenticated");
    // Redirect to login page or show authentication UI
  }
});

export { auth, db };
