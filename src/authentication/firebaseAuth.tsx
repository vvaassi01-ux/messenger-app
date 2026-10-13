import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

// 🆕 CREATE NEW USER (Sign Up)
export const handleSignUp = async (email: string, password: string) => {
  
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Registered user:", userCredential.user);
  }


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
