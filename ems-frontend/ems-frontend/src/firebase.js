
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBO21oYiK3MS09-6_A7oaa_WHkAvR8pCcY",
  authDomain: "login-event-4df94.firebaseapp.com",
  projectId: "login-event-4df94",
  storageBucket: "login-event-4df94.appspot.com",
  messagingSenderId: "485445882822",
  appId: "1:485445882822:web:de119aa4ae1499eb5658c7",
  measurementId: "G-FP3Y0ZQ3YT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
