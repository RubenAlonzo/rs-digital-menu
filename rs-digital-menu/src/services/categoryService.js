import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import { deleteProduct, getProductsByCategory } from './productService';

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
      // Obtener una referencia al documento de la categoría
      const categoryRef = doc(db, 'categories', categoryId);

      // Obtener la instantánea del documento de categoría existente en Firestore
      const categorySnapshot = await getDoc(categoryRef);

      if (!categorySnapshot.exists()) {
          console.error('Categoría no encontrada');
          return;
      }

      // Actualizar los datos de la categoría
      const updatedFields = { ...updatedData };

      // Si se proporciona un nuevo archivo de imagen
      if (updatedData.imageFile instanceof File) {
          // Eliminar la imagen antigua de Cloud Storage
          const oldImageUrl = categorySnapshot.data().imageUrl;
          if (oldImageUrl) {
              const oldImageRef = ref(storage, oldImageUrl);
              await deleteObject(oldImageRef);
          }

          // Subir la nueva imagen a Cloud Storage
          const imageRef = ref(storage, `category_images/${categoryId}`);
          await uploadBytes(imageRef, updatedData.imageFile);
          updatedFields.imageUrl = await getDownloadURL(imageRef);
          delete updatedFields.imageFile;
      }

      // Actualizar la categoría en Firestore
      await updateDoc(categoryRef, updatedFields);
  } catch (error) {
      console.error('Error al actualizar la categoría:', error);
      throw error;
  }
};

// Delete Category
export const deleteCategory = async (categoryId) => {
  try {
    // Step 1: Fetch all products associated with the category
    const products = await getProductsByCategory(categoryId, true);

    // Step 2: Delete each product using the deleteProduct method from productService
    for (const product of products) {
      await deleteProduct(product.id);
    }

    // Step 3: Reference to the category image in Cloud Storage
    const categoryImageRef = ref(storage, `category_images/${categoryId}`);

    // Attempt to delete the category image from Cloud Storage
    try {
      await deleteObject(categoryImageRef);
      console.log("Category image deleted at path:", categoryImageRef.fullPath);
    } catch (error) {
      if (error.code === 'storage/object-not-found') {
        console.log("Category image does not exist, skipping deletion.");
      } else {
        console.error("Error deleting category image: ", error);
        throw error;
      }
    }

    // Step 4: Delete category document from Firestore
    await deleteDoc(doc(db, "categories", categoryId));
    console.log(`Category with ID ${categoryId} has been deleted.`);
  } catch (error) {
    console.error("Error deleting category: ", error);
    throw error; // Re-throw the error to handle it in the calling function if needed
  }
};