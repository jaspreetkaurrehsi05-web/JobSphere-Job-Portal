import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../../Services/UserService";

// About page component
function EditJobSeeker() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let [loading, setLoading] = useState(false);
  const params = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    getUserDetails();
  }, []);

  async function getUserDetails() {
    try {
      setLoading(true);
      let res = await UserService.single(params.id);
      setName(res.name);
      setEmail(res.email);
      setContact(res.contact);
      setAddress(res.address);
      setSkills(res.skills);
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
        name: name,
        email: email,
        contact: contact,
        address: address,
        skills: skills,
        resumeUrl: resumeUrl,
      };
      await UserService.update(params.id, payload);
      setLoading(false);
      toast.success("User Updated Successfully");
      nav("/admin/managejobseeker");
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
              <h1 className="text-white font-weight-bold">Update Users</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Users</strong>
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
                        User Name
                      </label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                     <div className="mb-4">
                      <label className="form-label fw-semibold">
                       Email
                      </label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                     <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Contact
                      </label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="Enter contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>

                     <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Address
                      </label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                     <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Category Name
                      </label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="Enter skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Resume URL
                      </label>

                      <textarea
                        className="form-control rounded-3"
                        rows={5}
                        placeholder="Enter resumeUrl"
                        value={resumeUrl}
                        onChange={(e) => setResumeUrl(e.target.value)}
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
export default EditJobSeeker;
