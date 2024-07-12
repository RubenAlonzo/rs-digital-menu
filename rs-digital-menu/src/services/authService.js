import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';

// Login function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Signed in
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};