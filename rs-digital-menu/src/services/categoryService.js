import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebaseConfig";

// CRUD for Categories

// Create Category
export const createCategory = async (name, imageFile, isVisible, position) => {
  try {
    // Add category to Firestore first to get the auto-generated ID
    const categoryRef = await addDoc(collection(db, "categories"), {
      name,
      isVisible,
      position
    });

    const categoryId = categoryRef.id; // Get the auto-generated ID

    // Upload image to Cloud Storage
    const imageRef = ref(storage, `category_images/${categoryId}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Update the category with the image URL
    await updateDoc(categoryRef, { imageUrl });

  } catch (error) {
    console.error("Error creating category: ", error);
    throw error; // Re-throw the error to handle it in the calling function if needed
  }
};

// Read Categories
export const getCategories = async () => {
  try {
    const categories = [];
    const querySnapshot = await getDocs(collection(db, "categories"));
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    throw error; // Re-throw the error to handle it in the calling function if needed
  }
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
    throw error; // Re-throw the error to handle it in the calling function if needed
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
    throw error; // Re-throw the error to handle it in the calling function if needed
  }
};
