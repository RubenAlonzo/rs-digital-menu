import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebaseConfig";

// CRUD for Products

// Create Product
export const createProduct = async (name, price, description, imageFile, isVisible, position, categoryId) => {
  try {
    // Convert categoryId to a DocumentReference
    const categoryRef = doc(db, "categories", categoryId);

    // Add product to Firestore first to get the auto-generated ID
    const productRef = await addDoc(collection(db, "products"), {
      name,
      price,
      description,
      isVisible,
      position,
      categoryId: categoryRef // Use DocumentReference here
    });

    const productId = productRef.id; // Get the auto-generated ID

    // Upload image to Cloud Storage
    const imageRef = ref(storage, `product_images/${productId}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Update the product with the image URL
    await updateDoc(productRef, { imageUrl });

  } catch (error) {
    console.error("Error creating product: ", error);
    throw error;
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
  // Convert categoryId to a DocumentReference
  const categoryRef = doc(db, "categories", categoryId);
  const q = query(collection(db, "products"), where("categoryId", "==", categoryRef));
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

    // Convert categoryId to a DocumentReference if it's being updated
    if (updatedData.categoryId) {
      updatedData.categoryId = doc(db, "categories", updatedData.categoryId);
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
