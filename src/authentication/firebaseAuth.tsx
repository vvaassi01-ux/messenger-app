import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

// 🆕 CREATE NEW USER (Sign Up)
export const handleSignUp = async (email: string, password: string, firstName: string, lastName: string, username: string) => {
  // Pass the raw promise up to your registration component try/catch block
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // 2. Write a new document into the 'users' collection using the new Auth uid
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    firstName: firstName,
    lastName: lastName,
    username: username.toLowerCase().trim(), // Keep searching simple by lowercasing handles
    email: email.toLowerCase().trim(),
    createdAt: new Date().toISOString()
  });

  return user;
};


// 🔑 LOGIN EXISTING USER (Sign In)
export const handleLogin = async (email: string, password: string) => {

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  console.log("Logged in user:", userCredential.user);
};

// 🚪 LOG OUT
export const handleLogOut = async () => {
  try {
    await signOut(auth);
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
