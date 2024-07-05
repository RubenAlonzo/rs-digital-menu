import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebaseConfig";

// CRUD for Categories

// Create Category
export const createCategory = async (categoryId, name, imageFile, isVisible, position) => {
  try {
    // Upload image to Cloud Storage
    const imageRef = ref(storage, `category_images/${categoryId}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Add category to Firestore
    await setDoc(doc(db, "categories", categoryId), {
      name,
      imageUrl,
      isVisible,
      position
    });
  } catch (error) {
    console.error("Error creating category: ", error);
  }
};

// Read Categories
export const getCategories = async () => {
  const categories = [];
  const querySnapshot = await getDocs(collection(db, "categories"));
  querySnapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() });
  });
  return categories;
};

// Update Category
export const updateCategory = async (categoryId, updatedData) => {
  try {
    if (updatedData.imageFile) {
      // Upload new image to Cloud Storage
      const imageRef = ref(storage, `category_images/${categoryId}`);
      await uploadBytes(imageRef, updatedData.imageFile);
      updatedData.imageUrl = await getDownloadURL(imageRef);
      delete updatedData.imageFile;
    }

    // Update category in Firestore
    await updateDoc(doc(db, "categories", categoryId), updatedData);
  } catch (error) {
    console.error("Error updating category: ", error);
  }
};

// Delete Category
export const deleteCategory = async (categoryId) => {
  try {
    // Delete image from Cloud Storage
    const imageRef = ref(storage, `category_images/${categoryId}`);
    await deleteObject(imageRef);

    // Delete category from Firestore
    await deleteDoc(doc(db, "categories", categoryId));
  } catch (error) {
    console.error("Error deleting category: ", error);
  }
};
