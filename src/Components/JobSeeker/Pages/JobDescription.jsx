import { useEffect, useState } from "react";
import CategoryService from "../../../Services/CategoryService";
import JobService from "../../../Services/JobService";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UserService from "../../../Services/UserService";
import ApplicationService from "../../../Services/ApplicationService";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Firebase";
import { query, where, getDocs } from "firebase/firestore";
import ResumeService from "../../../Services/ResumeService";

export default function JobDescription() {
  const modalStyling = {
    overlay: {
      zIndex: 99999,
      backgroundColor: "rgba(0, 0, 0, 0.65)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
    },
    content: {
      position: "relative",
      top: "auto",
      left: "auto",
      right: "auto",
      bottom: "auto",
      width: "100%",
      maxWidth: "600px",
      maxHeight: "90vh",
      overflowY: "auto",
      margin: "0",
      transform: "none",
      borderRadius: "0",
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0",
      borderBottomLeftRadius: "0",
      borderBottomRightRadius: "0",
      padding: "24px",
      border: "none",
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    },
  };
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  // let [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [userId, setUserId] = useState("");
  const [jobId, setJobId] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  async function saveJob() {
    try {
      let uid = localStorage.getItem("uid");

      // check already saved
      let q = query(
        collection(db, "savedJobs"),
        where("userId", "==", uid),
        where("jobId", "==", job.id),
      );

      let snapshot = await getDocs(q);

      if (!snapshot.empty) {
        toast.info("Job already saved");
        setIsSaved(true);
        return;
      }

      let data = {
        userId: uid,
        jobId: job.id,
        savedAt: Date.now(),
      };

      await addDoc(collection(db, "savedJobs"), data);

      setIsSaved(true);

      toast.success("Job Saved Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    getAllJobs();
    getAllApplications();
  }

  useEffect(() => {
    getAllJobs();
    getAllApplications();
    getResume();
  }, []);

  async function getAllJobs() {
    try {
      setLoading(true);
      let res = await JobService.all();
      setJobs(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getAllApplications() {
    try {
      setLoading(true);
      let res = await ApplicationService.all();
      setApplications(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getResume() {
    let uid = localStorage.getItem("uid");

    let resumes = await ResumeService.all();

    let userResume = resumes.find((item) => item.userId === uid);

    if (userResume) {
      setResumeUrl(userResume.resumeUrl);
    }
  }

  async function checkAppliedJob() {
    if (!job) return;

    let uid = localStorage.getItem("uid");

    let q = query(
      collection(db, "applications"),
      where("userId", "==", uid),
      where("jobId", "==", job.id),
    );

    let snapshot = await getDocs(q);

    if (!snapshot.empty) {
      setAlreadyApplied(true);
    } else {
      setAlreadyApplied(false);
    }
  }

  async function submit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      let payload = {
        userId: localStorage.getItem("uid"),
        jobId: job.id,
        coverLetter: coverLetter,
        resumeUrl: resumeUrl,
      };

      await ApplicationService.add(payload);
      setLoading(false);
      toast.success("Application Added Successfully");
      setAlreadyApplied(true);
      setUserId("");
      setJobId("");
      setCoverLetter("");
      closeModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  let [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [jobs, setJobs] = useState([]);
  const { state } = useLocation();
  const job = state?.job;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      let categoryRes = await CategoryService.all();
      // let jobRes = await JobService.all();
      setCategories(categoryRes);
      // setJobs(jobRes);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function checkSavedJob() {
    let uid = localStorage.getItem("uid");

    let q = query(
      collection(db, "savedJobs"),
      where("userId", "==", uid),
      where("jobId", "==", job.id),
    );

    let snapshot = await getDocs(q);

    if (!snapshot.empty) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }
  useEffect(() => {
    if (job) {
      checkSavedJob();

      checkAppliedJob();
    }
  }, [job]);

  return (
    <>
      {/* HOME */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">{job.title}</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <a href="#">Job</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>{job.title}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <div className="d-flex align-items-center">
                <div className="border p-2 d-inline-block mr-3 rounded">
                  <img
                    src={job.imageUrl}
                    alt={job.companyName}
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "contain",
                      border: "1px solid #ddd",
                      padding: "10px",
                    }}
                  />
                </div>
                <div>
                  <h2>{job.title}</h2>
                  <div>
                    <span className="ml-0 mr-2 mb-2">
                      <span className="icon-briefcase mr-2" />
                      {job.companyName}
                    </span>
                    <span className="m-2">
                      <span className="icon-room mr-2" />
                      {job.location}
                    </span>
                    <span className="m-2">
                      <span className="icon-clock-o mr-2" />
                      <span className="text-primary">
                        <p>{job.jobType}</p>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-block btn-light btn-md"
                    onClick={saveJob}
                  >
                    <span
                      className={isSaved ? "icon-heart" : "icon-heart-o"}
                      style={{
                        marginRight: "10px",
                        color: isSaved ? "red" : "#ff0000",
                        fontSize: "20px",
                      }}
                    ></span>

                    {isSaved ? "Saved" : "Save Job"}
                  </button>
                </div>
                <div className="col-6">
                  {alreadyApplied ? (
                    <button
                      className="btn btn-block btn-secondary btn-md"
                      disabled
                    >
                      Already Applied
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setJobId(job.id);
                        openModal();
                      }}
                      className="btn btn-block btn-primary btn-md"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="mb-5">
                <figure className="mb-5">
                  <img
                    src="images/job_single_img_1.jpg"
                    alt="Image"
                    className="img-fluid rounded"
                  />
                </figure>
                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                  <span className="icon-align-left mr-3" />
                  Job Description
                </h3>
                {job.description}
              </div>
              <div className="mb-5">
                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                  <span className="icon-rocket mr-3" />
                  Responsibilities
                </h3>
                <ul className="list-unstyled m-0 p-0">
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    Complete assigned tasks on time.{" "}
                  </li>
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    Work professionally with the team.
                  </li>
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    Maintain high-quality work standards.
                  </li>
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    Follow company policies.
                  </li>
                </ul>
              </div>
              <div className="mb-5">
                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                  <span className="icon-book mr-3" />
                  Education + Experience
                </h3>
                <ul className="list-unstyled m-0 p-0">
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>
                      Bachelor's degree or equivalent qualification in a
                      relevant field.
                    </span>
                  </li>
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>
                      Freshers and experienced candidates are welcome to apply.
                    </span>
                  </li>
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>
                      Basic knowledge of industry-related tools and
                      technologies.
                    </span>
                  </li>
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>
                      Good communication, teamwork, and problem-solving skills.
                    </span>
                  </li>
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    <span>
                      Willingness to learn, adapt, and work in a professional
                      environment.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mb-5">
                <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                  <span className="icon-turned_in mr-3" />
                  Other Benifits
                </h3>
                <ul className="list-unstyled m-0 p-0">
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    Competitive Salary
                  </li>
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    Career Growth Opportunities
                  </li>
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    Friendly Work Environment
                  </li>
                  <li className="d-flex align-items-start mb-2">
                    <span className="icon-check_circle mr-2 text-muted" />
                    Flexible Working Hours
                  </li>
                </ul>
              </div>
              <div className="row mb-5">
                <div className="col-6">
                  <button
                    className="btn btn-block btn-light btn-md"
                    onClick={saveJob}
                  >
                    <span
                      className={isSaved ? "icon-heart" : "icon-heart-o"}
                      style={{
                        marginRight: "10px",
                        color: isSaved ? "red" : "#ff0000",
                        fontSize: "20px",
                      }}
                    ></span>

                    {isSaved ? "Saved" : "Save Job"}
                  </button>
                </div>
                <div className="col-6">
                  {alreadyApplied ? (
                    <button
                      className="btn btn-block btn-secondary btn-md"
                      disabled
                    >
                      Already Applied
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setJobId(job.id);
                        openModal();
                      }}
                      className="btn btn-block btn-primary btn-md"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="bg-light p-3 border rounded mb-4">
                <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">
                  Job Summary
                </h3>
                <ul className="list-unstyled pl-3 mb-0">
                  <li className="mb-2">
                    <strong className="text-black">Published on:</strong>{" "}
                    {new Date(job.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </li>
                  <li className="mb-2">
                    <strong className="text-black">Vacancy:</strong>{" "}
                    {job.vacancies}
                  </li>
                  <li className="mb-2">
                    <strong className="text-black">Employment Status:</strong>{" "}
                    {job.jobType}
                  </li>
                  <li className="mb-2">
                    <strong className="text-black">Experience:</strong> 2 to 3
                    year(s)
                  </li>
                  <li className="mb-2">
                    <strong className="text-black">Job Location:</strong>{" "}
                    {job.location}
                  </li>
                  <li className="mb-2">
                    <strong className="text-black">Salary:</strong> {job.salary}
                  </li>

                  <li className="mb-2">
                    <strong className="text-black">
                      Application Deadline:
                    </strong>{" "}
                    {new Date(job.lastDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </li>
                </ul>
              </div>
              <div className="bg-light p-3 border rounded">
                <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">Share</h3>
                <div className="px-3">
                  <a href="" className="pt-3 pb-3 pr-3 pl-0">
                    <span className="icon-facebook" />
                  </a>
                  <a href="" className="pt-3 pb-3 pr-3 pl-0">
                    <span className="icon-twitter" />
                  </a>
                  <a href="" className="pt-3 pb-3 pr-3 pl-0">
                    <span className="icon-linkedin" />
                  </a>
                  <a href="" className="pt-3 pb-3 pr-3 pl-0">
                    <span className="icon-pinterest" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="site-section" id="next">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">Related Jobs</h2>
            </div>
          </div>
          <ul className="job-listings mb-5">
             {jobs.slice(0, 8).map((job) => (
              <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                <Link to="/jobdescription" state={{ job }} />
                <div className="job-listing-logo">
                  <img
                    src={job.imageUrl}
                    style={{
                      height: "100px",
                      width: "180px",
                      border: "2px solid #ccc",
                      borderRadius: "0",
                      objectFit: "contain",
                      padding: "5px",
                      backgroundColor: "#fff",
                    }}
                  />
                </div>
                <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                  <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                    <h2>{job.title || "-"}</h2>
                    <strong>
                      {" "}
                      {categories.find((c) => c.id === job.categoryId)?.name ||
                        "-"}
                    </strong>
                  </div>
                  <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                    <span className="icon-room" /> {job.location || "-"}
                  </div>
                  <div className="job-listing-meta">
                    <span className="badge badge-danger">
                      {job.jobType || "-"}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
       
        </div>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyling}
      >
        <section className="p-3">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="m-0">Apply now</h2>

              <button
                className="btn btn-success rounded-circle"
                onClick={closeModal}
                style={{
                  width: "45px",
                  height: "45px",
                }}
              >
                ✕
              </button>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <form onSubmit={submit} className="p-5 border">
                  <h3 className="text-black mb-5 border-bottom pb-2">
                    Application Details
                  </h3>

                  <div className="form-group mb-4">
                    <label className="text-black fw-bold">Applying User</label>

                    <input
                      type="text"
                      className="form-control"
                      value={localStorage.getItem("name")}
                      readOnly
                      style={{
                        backgroundColor: "#f8f9fa",
                        fontWeight: "600",
                        color: "#495057",
                        cursor: "not-allowed",
                        border: "1px solid #ced4da",
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Application Job</label>

                    <input
                      type="text"
                      className="form-control mb-3"
                      value={job?.title || ""}
                      readOnly
                      style={{
                        backgroundColor: "#f8f9fa",
                        cursor: "not-allowed",
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Application Cover Letter</label>

                    <textarea
                      className="w-100 form-control mb-4"
                      rows={5}
                      cols={10}
                      placeholder="Enter Application Cover letter"
                      value={coverLetter}
                      onChange={(e) => {
                        setCoverLetter(e.target.value);
                      }}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md">
                      {loading ? (
                        <button
                          className=" btn f border-secondary py-3 bg-white text-primary "
                          type="button"
                          disabled
                        >
                          Saving ..
                        </button>
                      ) : (
                        <button
                          className=" btn f border-secondary py-3 bg-white text-primary "
                          type="submit"
                        >
                          Submit
                        </button>
                      )}

                      <button
                        className=" btn mx-2 border-danger py-3 bg-white text-primary "
                        type="button"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
}
