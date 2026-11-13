import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { Resume } from "../Models/Resume";
import { toast } from "react-toastify";

const dbPath = "resume";

class ResumeService{

     async add(data) {
    const newResume = new Resume();

    newResume.userId = data.userId;
    newResume.objective = data.objective;
    newResume.education = data.education;
    newResume.experience = data.experience;
    newResume.skills = data.skills;
    newResume.projects = data.projects;
    newResume.certifications = data.certifications;
    newResume.achievements = data.achievements;
    newResume.languages = data.languages;
    newResume.resumeUrl = data.resumeUrl;

    const docRef = await addDoc(collection(db, dbPath), {
      ...newResume,
    });

    return newResume;
  }

    async all() {
      const querySnapshot = await getDocs(collection(db, dbPath));
      var resume = [];
      querySnapshot.forEach((doc) => {
        resume.push({ id: doc.id, ...doc.data() });
      });
      return resume;
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
        const resumeRef = doc(db, dbPath, id);
        return await updateDoc(resumeRef, payload);
      }

        async delete(id) {
          return await deleteDoc(doc(db, dbPath, id));
        }
}

export default new ResumeService();