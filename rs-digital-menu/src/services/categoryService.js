import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebaseConfig";

// CRUD for Categories

// Create Category
export const createCategory = async ({ name, imageFile, isVisible, position }) => {
  try {
      // Primero, agrega la categoría a Firestore para obtener el ID auto-generado
      const categoryRef = await addDoc(collection(db, "categories"), {
          name,
          isVisible,
          position,
          imageUrl: null // Inicializa imageUrl como null
      });

      const categoryId = categoryRef.id; // Obtiene el ID auto-generado

      // Sube la imagen a Cloud Storage
      const imageRef = ref(storage, `category_images/${categoryId}`);
      const metadata = {
          contentType: imageFile.type // Establece el tipo MIME correcto
      };
      await uploadBytes(imageRef, imageFile, metadata);
      const imageUrl = await getDownloadURL(imageRef);

      // Actualiza la categoría con la URL de la imagen
      await updateDoc(categoryRef, { imageUrl });

  } catch (error) {
      console.error("Error creating category: ", error);
      throw error;
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
