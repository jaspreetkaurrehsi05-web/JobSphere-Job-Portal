import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { Job } from "../Models/Job";
import { db } from "../Firebase";
import { toast } from "react-toastify";

const dbPath = "jobs";

class JobService {
  async add(data) {
    const newJob = new Job();

    newJob.categoryId = data.categoryId;
    newJob.title = data.title;
    newJob.imageUrl = data.imageUrl;
    newJob.companyName = data.companyName;
    newJob.location = data.location;
    newJob.salary = data.salary;
    newJob.vacancies = data.vacancies;
    newJob.jobType = data.jobType;
    newJob.description = data.description;
    newJob.lastDate = data.lastDate;

    const docRef = await addDoc(collection(db, dbPath), {
      ...newJob,
    });

    return newJob;
  }

    async all() {
      const querySnapshot = await getDocs(collection(db, dbPath));
      var jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push({ id: doc.id, ...doc.data() });
      });
      return jobs;
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
            const jobRef = doc(db, dbPath, id);
            return await updateDoc(jobRef, payload);
          }

            async delete(id) {
              return await deleteDoc(doc(db, dbPath, id));
            }
    
}

export default new JobService();
