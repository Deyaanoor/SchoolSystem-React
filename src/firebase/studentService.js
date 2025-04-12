import { db } from "./firebaseConfig";
import { 
  collection,setDoc, getDocs, doc, updateDoc, deleteDoc, 
  query, orderBy, limit, startAfter, getDoc 
} from "firebase/firestore";

const addStudent = async (student) => {
  try {
    const studentRef = doc(db, "students", student.id); 
    await setDoc(studentRef, student);
    console.log("Student added successfully:", student.id);
    return student.id;
  } catch (error) {
    console.error("Error adding student:", error.message);
    return null;
  }
};

const getStudents = async (lastDoc = null, limitCount = 10) => {
  try {
    let studentsRef = query(
      collection(db, "students"),
      orderBy("name"),
      limit(limitCount)
    );

    if (lastDoc) {
      studentsRef = query(studentsRef, startAfter(lastDoc));
    }

    const snapshot = await getDocs(studentsRef);
    if (snapshot.empty) return { students: [], lastDoc: null };

    return {
      students: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      lastDoc: snapshot.docs[snapshot.docs.length - 1]
    };
  } catch (error) {
    console.error("Error fetching students:", error.message);
    return null;
  }
};

const deleteStudent = async (id) => {
  try {
    await deleteDoc(doc(db, "students", id));
    console.log(`Student with ID ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error(`Error deleting student (ID: ${id}):`, error.message);
    return false;
  }
};

const updateStudent = async (id, updatedData) => {
  try {
    await updateDoc(doc(db, "students", id), updatedData);
    console.log(`Student with ID ${id} updated successfully`);
    return true;
  } catch (error) {
    console.error(`Error updating student (ID: ${id}):`, error.message);
    return false;
  }
};

const getStudentById = async (id) => {
  try {
    const studentRef = doc(db, "students", id);
    const docSnap = await getDoc(studentRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.warn(`No student found with ID: ${id}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching student (ID: ${id}):`, error.message);
    return null;
  }
};

export { addStudent, getStudents, deleteStudent, updateStudent, getStudentById };
