import { db } from "./firebaseConfig"; 
import { collection, setDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, limit, startAfter ,getDoc } from "firebase/firestore";


const addTeacher = async (teacher) => {
  try {
    const teacherId = Date.now().toString(); 
    const docRef = doc(db, "teachers", teacherId);
    await setDoc(docRef, { ...teacher, id: teacherId });
    return teacherId;
  } catch (error) {
    console.error("Error adding teacher:", error.message);
    return null;
  }
};

const getTeachers = async (lastDoc, limitCount) => {
  let teachersRef = query(
    collection(db, "teachers"),
    orderBy("name"),
    limit(limitCount)
  );

  if (lastDoc) {
    teachersRef = query(teachersRef, startAfter(lastDoc)); 
  }

  try {
    const snapshot = await getDocs(teachersRef);
    if (snapshot.empty) return { teachers: [], lastDoc: null };

    return {
      teachers: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      lastDoc: snapshot.docs[snapshot.docs.length - 1]
    };
  } catch (error) {
    console.error("Error getting teachers:", error);
    return { teachers: [], lastDoc: null };
  }
};

const deleteTeacher = async (id) => {
  try {
    await deleteDoc(doc(db, "teachers", id));
    console.log("teacher deleted successfully");
  } catch (error) {
    console.error("Error deleting teacher:", error);
  }
};

const updateTeacher = async (id, updatedData) => {
  try {
    await updateDoc(doc(db, "teachers", id), updatedData);
    console.log("teacher updated successfully");
  } catch (error) {
    console.error("Error updating teacher:", error);
  }
};
const getTeacherById = async (id) => {
  try {
    const teacherRef = doc(db, "teachers", id); 
    const docSnap = await getDoc(teacherRef); 
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('No teacher found');
    }
  } catch (error) {
    console.error("Error fetching teacher:", error);
    throw error; 
  }
};

export { addTeacher, getTeachers, deleteTeacher, updateTeacher , getTeacherById};
