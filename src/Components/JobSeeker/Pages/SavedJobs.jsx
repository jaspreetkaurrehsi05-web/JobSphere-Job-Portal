import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../Firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSavedJobs();
  }, []);

  async function getSavedJobs() {
    let uid = localStorage.getItem("uid");

    let q = query(collection(db, "savedJobs"), where("userId", "==", uid));

    let snapshot = await getDocs(q);

    let data = [];

    for (let item of snapshot.docs) {
      let savedData = item.data();

      let job = await getJobDetails(savedData.jobId);

      if (job) {
        data.push({
          savedId: item.id,
          ...job,
        });
      }
    }
   
    setSavedJobs(data);
  }

  async function getJobDetails(jobId) {
    let jobRef = doc(db, "jobs", jobId);

    let jobSnap = await getDoc(jobRef);

    if (jobSnap.exists()) {
      return {
        id: jobSnap.id,
        ...jobSnap.data(),
      };
    }

    return null;
  }

  async function removeSavedJob(savedId) {
    try {
      await deleteDoc(doc(db, "savedJobs", savedId));

      setSavedJobs((prevJobs) =>
        prevJobs.filter((job) => job.savedId !== savedId),
      );

      toast.success("Job Removed Successfully");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  }
  return (
    <>
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Saved Jobs</h1>
              <div className="custom-breadcrumbs">
                <a href="">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Saved Jobs</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mt-5">
        {savedJobs.map((job) => (
          <div className="card p-4 mb-3" key={job.id}>
            <h3>{job.title}</h3>

            <p>Company: {job.companyName}</p>

            <p>Location: {job.location}</p>

            <p>Salary: ₹ {job.salary}</p>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/jobdescription", {
                  state: { job: job },
                })
              }
            >
              View Job
            </button>

            <button
              className="btn btn-danger mt-3"
              onClick={() => removeSavedJob(job.savedId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
