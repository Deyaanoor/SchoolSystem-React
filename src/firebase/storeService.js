import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  getDoc,
} from "firebase/firestore";

const addProduct = async (productData) => {
  try {
    const newProduct = {
      name: productData.name,
      price: parseFloat(productData.price),
      imageUrl: productData.imageUrl,
    };

    await addDoc(collection(db, "products"), newProduct);
    console.log("Product added successfully!");
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
};

const getProducts = async (lastDoc, limitCount) => {
  let productRef = query(
    collection(db, "products"),
    orderBy("name"),
    limit(limitCount)
  );

  if (lastDoc) {
    productRef = query(productRef, startAfter(lastDoc));
  }

  try {
    const snapshot = await getDocs(productRef);
    if (snapshot.empty) return { products: [], lastDoc: null };

    return {
      products: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
    };
  } catch (error) {
    console.error("Error getting products:", error);
    return { products: [], lastDoc: null };
  }
};

const updateProduct = async (id, updatedData) => {
  try {
    await updateDoc(doc(db, "product", id), updatedData);
    console.log("product updated successfully");
  } catch (error) {
    console.error("Error updating product:", error);
  }
};
const getProductById = async (id) => {
  try {
    const productRef = doc(db, "products", id);
    const docSnap = await getDoc(productRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No product found");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

const getTop10Products = async () => {
  const productRef = query(
    collection(db, "products"),
    orderBy("price", "desc"),
    limit(10)
  );

  try {
    const snapshot = await getDocs(productRef);
    if (snapshot.empty) return { products: [] };

    return {
      products: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    };
  } catch (error) {
    console.error("Error getting top expensive products:", error);
    return { products: [] };
  }
};

export {
  addProduct,
  getProducts,
  updateProduct,
  getProductById,
  getTop10Products,
};
