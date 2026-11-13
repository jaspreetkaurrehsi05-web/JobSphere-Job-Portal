import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationService from "../../../Services/ApplicationService";
import UserService from "../../../Services/UserService";

// About page component
function EditApplications() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let [loading, setLoading] = useState(false);
  const params = useParams();

  const [applications, setApplications] = useState([]);
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [jobId, setJobId] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    getAllUsers();
    getApplicationDetails();
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

  async function getApplicationDetails() {
    try {
      setLoading(true);
      let res = await ApplicationService.single(params.id);
      setApplications(res.applications);
      setUserId(res.userId);
      setJobId(res.jobId);
      setCoverLetter(res.coverLetter);
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
        jobId: jobId,
        coverLetter: coverLetter,
      };
      await ApplicationService.update(params.id, payload);
      setLoading(false);
      toast.success("Application Updated Successfully");
      nav("/admin/viewapplications");
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
              <h1 className="text-white font-weight-bold">
                Update Applications
              </h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Application</strong>
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
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Application userID
                      </label>

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
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Application JobId
                      </label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="Enter Name"
                        value={jobId}
                        onChange={(e) => setJobId(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Cover Letter
                      </label>

                      <textarea
                        className="form-control rounded-3"
                        rows={5}
                        placeholder="Cover Letter"
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
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
export default EditApplications;
