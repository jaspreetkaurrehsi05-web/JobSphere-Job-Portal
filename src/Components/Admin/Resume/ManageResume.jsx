import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import Modal from "react-modal";
import { toast } from "react-toastify";
import CloudinaryService from "../../../Services/CloudinaryService";
import ResumeService from "../../../Services/ResumeService";
import Swal from "sweetalert2";
import UserService from "../../../Services/UserService";

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
  const [userId, setUserId] = useState("");
  const [objective, setObjective] = useState("");
  const [education, setEducation] = useState([]);
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
    getAllUsers();
    getAllResume();
  }

  useEffect(() => {
    getAllUsers();
    getAllResume();
  }, []);

  async function getAllUsers() {
    try {
      setLoading(true);
      let res = await UserService.all();
      setUsers(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getAllResume() {
    try {
      setLoading(true);
      let res = await ResumeService.all();
      setResume(res);
      setLoading(false);
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

      if (resumeUrl) {
        var resumeURL = await CloudinaryService.upload(resumeUrl);
      }

      let payload = {
        userId: userId,
        objective: objective,
        education: education,
        experience: experience,
        skills: skills,
        projects: projects,
        certifications: certifications,
        achievements: achievements,
        languages: languages,
        resumeUrl: resumeURL,
      };

      await ResumeService.add(payload);
      setLoading(false);
      toast.success("Resume Added Successfully");
      setUserId("");
      setObjective("");
      setEducation("");
      setExperience("");
      setSkills("");
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

  async function deleteResume(id) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          let res = await ResumeService.delete(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          getAllResume();
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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
      <div className="row my-5">
        <div className="col-md">
          <h3 className="mx-4" style={{ fontSize: "30px" }}>
            {" "}
            Resume List
          </h3>
        </div>
        {/* <div className="col-md-2 text-end">
          <button
            className="btn btn-sm btn-primary text-light"
            onClick={openModal}
          >
            +Add Resume
          </button>
        </div> */}
      </div>
      <div className="p-5 bg-light rounded">
        {loading ? (
          <div>
            <PuffLoader
              color="#89C407"
              loading={loading}
              cssOverride={override}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <table
            className="table table-bordered table-hover align-middle"
            style={{
              width: "100%",
              tableLayout: "fixed",
            }}
          >
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Objective</th>
                <th>Education</th>
                <th>Experience</th>
                <th>Skills</th>
                <th>Projects</th>
                <th>Certifications</th>
                <th>Achievements</th>
                <th>Languages</th>
                <th>Resume</th>
                <th style={{ width: "180px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {resume.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {users.find((c) => c.id === item.userId)?.name || "-"}
                  </td>

                  <td
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {item.objective || "-"}
                  </td>

                  <td
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {item.education || "-"}
                  </td>

                  <td
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {item.experience || "-"}
                  </td>

                  <td
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {item.skills || "-"}
                  </td>

                  <td
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {item.projects || "-"}
                  </td>

                  <td
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {item.certifications || "-"}
                  </td>

                  <td
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {item.achievements || "-"}
                  </td>

                  <td
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {item.languages || "-"}
                  </td>

                  <td>
                    {item.resumeUrl ? (
                      <img
                        src={item.resumeUrl}
                        alt={item.name}
                        style={{
                          width: "90px",
                          height: "90px",
                          borderRadius: "0",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "-"
                    )}
                  </td>

                  <td
                    style={{
                      width: "180px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Link to={`/admin/manageresume/edit/${item.id}`}>
                      <button
                        className="btn btn-sm btn-primary"
                        style={{ marginRight: "8px" }}
                      >
                        Edit
                      </button>
                    </Link>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteResume(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyling}
      >
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">Add New Resume</h2>

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

                {/* Category Name */}

                <select
                  className="form-control mb-3"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                >
                  <option value="" selected disabled>
                    Choose User
                  </option>

                  {users.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <div className="mb-3">
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

                  <input
                    type="text"
                    className="w-100 form-control py-3 mb-4"
                    placeholder="Enter Education"
                    value={education}
                    onChange={(e) => {
                      setEducation(e.target.value);
                    }}
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

                  <input
                    type="text"
                    className="w-100 form-control py-3 mb-4"
                    placeholder="Enter Skills"
                    value={skills}
                    onChange={(e) => {
                      setSkills(e.target.value);
                    }}
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
                {/* <div className="form-group">
                  <label>Resume URL</label>

                  <input
                    type="text"
                    className="w-100 form-control py-3 mb-4"
                    placeholder="Enter URL"
                    value={resumeUrl}
                    onChange={(e) => {
                      setResumeUrl(e.target.value);
                    }}
                  />
                </div> */}

                <div className="form-group">
                  <label>Resume URL</label>
                  <input
                    type="file"
                    className="w-100 form-control px-2 border-1 mb-4"
                    placeholder="Add file"
                    onChange={(e) => {
                      setResumeUrl(e.target.files[0]);
                    }}
                  />
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
