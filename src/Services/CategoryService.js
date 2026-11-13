import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { Category } from "../Models/Category";
import { db } from "../Firebase";
import { toast } from "react-toastify";

const dbPath = "categories";

class CategoryService {
  async add(data) {
    const newCategory = new Category();

    newCategory.name = data.name;
    newCategory.description = data.description;
    newCategory.imageUrl = data.imageUrl;

    const docRef = await addDoc(collection(db, dbPath), {
      ...newCategory,
    });

    return newCategory;
  }
  async all() {
    const querySnapshot = await getDocs(collection(db, dbPath));
    var categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return categories;
  }
  async single(id) {
    const docRef = doc(db, dbPath, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      toast.error("No such document!");
      console.log("No such document!");
      return false;
    }
  }

  async update(id, payload) {
    const categoryRef = doc(db, dbPath, id);
    return await updateDoc(categoryRef, payload);
  }

    async delete(id) {
      return await deleteDoc(doc(db, dbPath, id));
    }
}

export default new CategoryService();
