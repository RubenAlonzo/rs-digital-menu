import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebaseConfig";

// CRUD for Products

// Create Product
export const createProduct = async (productId, name, price, description, imageFile, isVisible, position, categoryId) => {
  try {
    // Upload image to Cloud Storage
    const imageRef = ref(storage, `product_images/${productId}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Add product to Firestore
    await setDoc(doc(db, "products", productId), {
      name,
      price,
      description,
      imageUrl,
      isVisible,
      position,
      categoryId
    });
  } catch (error) {
    console.error("Error creating product: ", error);
  }
};

// Read Products
export const getProducts = async () => {
  const products = [];
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

// Read Products by Category
export const getProductsByCategory = async (categoryId) => {
  const products = [];
  const q = query(collection(db, "products"), where("categoryId", "==", categoryId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

// Update Product
export const updateProduct = async (productId, updatedData) => {
  try {
    if (updatedData.imageFile) {
      // Upload new image to Cloud Storage
      const imageRef = ref(storage, `product_images/${productId}`);
      await uploadBytes(imageRef, updatedData.imageFile);
      updatedData.imageUrl = await getDownloadURL(imageRef);
      delete updatedData.imageFile;
    }

    // Update product in Firestore
    await updateDoc(doc(db, "products", productId), updatedData);
  } catch (error) {
    console.error("Error updating product: ", error);
  }
};

// Delete Product
export const deleteProduct = async (productId) => {
  try {
    // Delete image from Cloud Storage
    const imageRef = ref(storage, `product_images/${productId}`);
    await deleteObject(imageRef);

    // Delete product from Firestore
    await deleteDoc(doc(db, "products", productId));
  } catch (error) {
    console.error("Error deleting product: ", error);
  }
};
