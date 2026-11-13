import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import Modal from "react-modal";
import { toast } from "react-toastify";
import CloudinaryService from "../../../Services/CloudinaryService";
import ResumeService from "../../../Services/ResumeService";
import Swal from "sweetalert2";
import UserService from "../../../Services/UserService";
import Select from "react-select";

export default function ManageResume() {
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
      maxWidth: "680px",
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
  let [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [resume, setResume] = useState([]);
  const [userResume, setUserResume] = useState(null);
  const [userId, setUserId] = useState("");
  const [objective, setObjective] = useState("");
  const [education, setEducation] = useState(null);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [resumeUrl, setResumeUrl] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    // getAllUsers()
    getAllResume();
  }

  useEffect(() => {
    // getAllUsers()
    getAllResume();
  }, []);

  async function getAllResume() {
    try {
      setLoading(true);

      let res = await ResumeService.all();

      setResume(res);

      let uid = localStorage.getItem("uid");

      let myResume = res.find((item) => item.userId === uid);

      if (myResume) {
        setUserResume(myResume);

        setObjective(myResume.objective || "");
        setEducation(myResume.education || "");
        setExperience(myResume.experience || "");
        setSkills(myResume.skills || "");
        setProjects(myResume.projects || "");
        setCertifications(myResume.certifications || "");
        setAchievements(myResume.achievements || "");
        setLanguages(myResume.languages || "");
        setResumeUrl(myResume.resumeUrl || "");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function submit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      console.log("Logged in UID:", localStorage.getItem("uid"));

      let resumeURL = userResume?.resumeUrl || "";

      if (resumeUrl instanceof File) {
        resumeURL = await CloudinaryService.upload(resumeUrl);
      }

      let payload = {
        userId: localStorage.getItem("uid"),
        objective: objective,
        education: education?.value || "",
        experience: experience,
        skills: skills.map((skill) => skill.value).join(", "),
        projects: projects,
        certifications: certifications,
        achievements: achievements,
        languages: languages,
        resumeUrl: resumeURL,
      };

      if (userResume) {
        await ResumeService.update(userResume.id, payload);
        toast.success("Resume Updated Successfully");
      } else {
        await ResumeService.add(payload);
        toast.success("Resume Added Successfully");
      }
      setLoading(false);
      setUserId("");
      setObjective("");
      setEducation(null);
      setExperience("");
      setSkills([]);
      setProjects("");
      setCertifications("");
      setAchievements("");
      setLanguages("");
      setResumeUrl("");
      closeModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  const educationOptions = [
    {
      value: "B.Tech in Computer Science",
      label: "B.Tech in Computer Science",
    },
    {
      value: "B.Tech in Computer Science and Engineering",
      label: "B.Tech in Computer Science and Engineering",
    },
    {
      value: "B.Tech in Information Technology",
      label: "B.Tech in Information Technology",
    },
    {
      value: "M.Tech in Computer Science",
      label: "M.Tech in Computer Science",
    },
    {
      value: "M.Tech in Information Technology",
      label: "M.Tech in Information Technology",
    },
    {
      value: "BCA",
      label: "BCA (Bachelor of Computer Applications)",
    },
    {
      value: "MCA",
      label: "MCA (Master of Computer Applications)",
    },
  ];

  const skillOptions = [
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Bootstrap", label: "Bootstrap" },
    { value: "Firebase", label: "Firebase" },
    { value: "Node JS", label: "Node JS" },
    { value: "Java", label: "Java" },
    { value: "Python", label: "Python" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Photoshop", label: "Photoshop" },
    { value: "Video Editing", label: "Video Editing" },
  ];

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
              <h1 className="text-white font-weight-bold">Resume</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Resume</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container my-5">
        <div
          className="border rounded p-4"
          style={{
            background: "#fff",
            minHeight: "250px",
          }}
        >
          <div className="row align-items-center">
            <div className="col-md-8">
              <h4 className="mb-3">Resume Overview</h4>

              <p className="mb-2">
                <strong>User :</strong> {localStorage.getItem("name")}
              </p>

              <p className="mb-2">
                <strong>Status :</strong>{" "}
                {userResume ? "Resume Created" : "Resume not created yet"}
              </p>

              <p className="mb-0 text-muted">
                Fill in your education, experience, skills, projects,
                certifications and upload your resume to apply for jobs.
              </p>
            </div>

            <div className="col-md-4 text-center mt-4 mt-md-0">
              <button
                className="btn btn-primary text-light"
                onClick={openModal}
              >
                {userResume ? "Update Resume" : "Create Resume"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyling}
      >
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">
              {userResume ? "Update Resume" : "Add New Resume"}
            </h2>

            <button
              type="button"
              onClick={closeModal}
              className="btn btn-success rounded-circle"
              style={{
                width: "42px",
                height: "42px",
                padding: "0",
                fontSize: "18px",
                lineHeight: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <form onSubmit={submit} className="p-4 border">
                <h3 className="text-black mb-3 border-bottom pb-2">
                  Resume Details
                </h3>

                <div className="form-group mb-4">
                  <label className="text-black fw-bold">User</label>

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

                <div className=" form-group mb-3">
                  <label>Resume Objective</label>

                  <textarea
                    className="w-100 form-control mb-4"
                    rows={5}
                    cols={10}
                    placeholder="Objective"
                    value={objective}
                    onChange={(e) => {
                      setObjective(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Resume Education</label>

                  <Select
                    options={educationOptions}
                    value={education}
                    onChange={(selected) => setEducation(selected)}
                    placeholder="Select your qualification"
                    className="mb-4"
                  />
                </div>

                <div className="form-group">
                  <label>Resume Experience</label>

                  <input
                    type="text"
                    className="w-100 form-control py-3 mb-4"
                    placeholder="Enter Experience"
                    value={experience}
                    onChange={(e) => {
                      setExperience(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Resume Skills</label>

                  <Select
                    options={skillOptions}
                    value={skills}
                    onChange={(selected) => setSkills(selected)}
                    isMulti
                    placeholder="Select your skills"
                    className="mb-4"
                  />
                </div>

                <div className="form-group">
                  <label>Resume Projects</label>

                  <input
                    type="text"
                    className="w-100 form-control py-3 mb-4"
                    placeholder="Enter Projects"
                    value={projects}
                    onChange={(e) => {
                      setProjects(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Resume Certifications</label>

                  <input
                    type="text"
                    className="w-100 form-control py-3 mb-4"
                    placeholder="Enter certifications"
                    value={certifications}
                    onChange={(e) => {
                      setCertifications(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Resume Achievements</label>

                  <input
                    type="text"
                    className="w-100 form-control py-3 mb-4"
                    placeholder="Enter Achievements"
                    value={achievements}
                    onChange={(e) => {
                      setAchievements(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Resume Languages</label>

                  <input
                    type="text"
                    className="w-100 form-control py-3 mb-4"
                    placeholder="Enter Languages"
                    value={languages}
                    onChange={(e) => {
                      setLanguages(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Resume URL</label>

                  <input
                    type="file"
                    className="w-100 form-control px-2 border-1 mb-4"
                    onChange={(e) => {
                      setResumeUrl(e.target.files[0]);
                    }}
                  />

                  {userResume?.resumeUrl && (
                    <p className="mt-2">
                      Existing Resume:
                      <a
                        href={userResume.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="ms-2"
                      >
                        View Resume
                      </a>
                    </p>
                  )}
                </div>

                {/* Buttons */}

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
      </Modal>
    </>
  );
}
