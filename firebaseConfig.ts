
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-w102hHM4Zi7cE7OXxoMYywsdbjZb8Io",
  authDomain: "hrhs-b9955.firebaseapp.com",
  projectId: "hrhs-b9955",
  storageBucket: "hrhs-b9955.firebasestorage.app",
  messagingSenderId: "28129734887",
  appId: "1:28129734887:web:a57f521053fc525673b242",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
