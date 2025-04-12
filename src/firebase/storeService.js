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

    const docRef = await addDoc(collection(db, "products"), newProduct);
    
    const productWithId = { ...newProduct, id: docRef.id };
    
    console.log("Product added successfully with ID:", docRef.id);
    
    return productWithId;
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
    await updateDoc(doc(db, "products", id), updatedData);
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

    if (snapshot.empty) {
      console.log("No products found or empty collection.");
      return { products: [] };
    }

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Top 10 Expensive Products:", products); 
    return { products };
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
