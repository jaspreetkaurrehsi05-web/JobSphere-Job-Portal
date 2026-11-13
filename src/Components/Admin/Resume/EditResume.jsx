import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ResumeService from "../../../Services/ResumeService";
import UserService from "../../../Services/UserService";

// About page component
function EditResume() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let [loading, setLoading] = useState(false);
  const params = useParams();
  const [users, setUsers] = useState([]);
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
  const nav = useNavigate();

  useEffect(() => {
    getAllUsers();
    getResumeDetails();
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

  async function getResumeDetails() {
    try {
      setLoading(true);
      let res = await ResumeService.single(params.id);
      setUserId(res.userId);
      setObjective(res.objective);
      setEducation(res.education);
      setExperience(res.experience);
      setSkills(res.skills);
      setProjects(res.projects);
      setProjects(res.projects);
      setCertifications(res.certifications);
      setAchievements(res.achievements);
      setLanguages(res.languages);
      setResumeUrl(res.resumeUrl);
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
        resumeUrl: resumeUrl,
      };
      await ResumeService.update(params.id, payload);
      setLoading(false);
      toast.success("Resume Updated Successfully");
      nav("/admin/manageresume");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    // Fragment wrapper
    <>
      {/* Single Page Header start */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Update Resume</h1>
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
      {/* Single Page Header End */}
      {/* Contact Start */}

      <div className="container-fluid py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-10 col-sm-12">
              <div
                className="bg-white shadow rounded-4 p-4 p-md-5"
                style={{ border: "1px solid #f1f1f1" }}
              >
                {loading ? (
                  <div className="d-flex justify-content-center py-5">
                    <PuffLoader
                      color="#89C407"
                      loading={loading}
                      cssOverride={override}
                      size={45}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                ) : (
                  <form onSubmit={submit}>
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

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Objective
                      </label>

                      <textarea
                        className="form-control rounded-3"
                        rows={5}
                        placeholder="objective"
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Eductaion
                      </label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="education"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Experience
                      </label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">Skills</label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">Projects</label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="projects"
                        value={projects}
                        onChange={(e) => setUserId(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Certifications
                      </label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="certifications"
                        value={certifications}
                        onChange={(e) => setCertifications(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Achievements
                      </label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="achievements"
                        value={achievements}
                        onChange={(e) => setAchievements(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Languages
                      </label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="languages"
                        value={languages}
                        onChange={(e) => setLanguages(e.target.value)}
                      />
                    </div>

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

                    <button
                      type="submit"
                      className="btn w-100 py-3 fw-semibold rounded-3"
                      style={{
                        backgroundColor: "#89C407",
                        color: "#fff",
                        border: "none",
                        fontSize: "16px",
                        letterSpacing: "0.5px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#76aa06";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow =
                          "0 8px 20px rgba(137, 196, 7, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#89C407";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
    </>
  );
}

// Export for use in other files
export default EditResume;
