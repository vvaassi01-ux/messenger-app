import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

// 🆕 CREATE NEW USER (Sign Up)
const handleSignUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Registered user:", userCredential.user);
  } catch (error) {
    console.error("Sign up error code:", error);
  }
};

// 🔑 LOGIN EXISTING USER (Sign In)
const handleLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in user:", userCredential.user);
  } catch (error) {
    console.error("Login error code:", error);
  }
};

// 🚪 LOG OUT
const handleLogOut = async () => {
  try {
    await signOut(auth);
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
