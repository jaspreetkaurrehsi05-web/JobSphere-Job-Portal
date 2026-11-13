import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import { Application } from "../Models/Application";
import { toast } from "react-toastify";

const dbPath = "applications";
class ApplicationService {
  async add(data) {
    const newApplication = new Application();

    newApplication.userId = data.userId;
    newApplication.jobId = data.jobId;
    newApplication.coverLetter = data.coverLetter;
    newApplication.resumeUrl = data.resumeUrl;
    newApplication.applicationStatus = "Pending";
    newApplication.updatedAt = Date.now();

    const docRef = await addDoc(collection(db, dbPath), {
      ...newApplication,
    });

    return newApplication;
  }
  async all() {
    const querySnapshot = await getDocs(collection(db, dbPath));
    var applications = [];
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    return applications;
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
    const applicationRef = doc(db, dbPath, id);
    return await updateDoc(applicationRef, payload);
  }

  async delete(id) {
    return await deleteDoc(doc(db, dbPath, id));
  }
}

export default new ApplicationService();
