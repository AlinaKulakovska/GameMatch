import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// Get user profile data
export const getUserProfile = async (userId) => {
  const userDoc = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

// Update user profile data
export const updateUserProfile = async (userId, data) => {
  const userDoc = doc(db, "users", userId);
  await setDoc(userDoc, data, { merge: true });
};