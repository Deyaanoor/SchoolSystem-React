import { auth,db } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";


export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
export const signInUser = async (email, password) => {
  try {
    let role = null;
   

    if (email === "deyaanoor9@gmail.com" && password === "123456") {
      role = "admin";
      
    } else {
      const teachersQuery = query(collection(db, "teachers"), where("email", "==", email));
      const teacherSnapshot = await getDocs(teachersQuery);

      const studentsQuery = query(collection(db, "students"), where("email", "==", email));
      const studentSnapshot = await getDocs(studentsQuery);

      if (!teacherSnapshot.empty) {
        role = "teacher";
       
      } else if (!studentSnapshot.empty) {
        role = "student";
       
      } else {
        throw new Error("Email not found in teachers or students collection!");
      }
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return { success: true, user, role };
  } catch (error) {
    console.error("Sign-in Error:", error.message);
    return { success: false, message: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};