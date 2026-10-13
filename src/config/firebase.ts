// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCADmp5JoanXCjiLrcQzJmasZ_NmVIT7_c",
  authDomain: "opsi-b2a73.firebaseapp.com",
  databaseURL: "https://opsi-b2a73-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "opsi-b2a73",
  storageBucket: "opsi-b2a73.firebasestorage.app",
  messagingSenderId: "860803989637",
  appId: "1:860803989637:web:32e64dcf61badcaf81a9ec",
  measurementId: "G-Z7CR64XLNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 
