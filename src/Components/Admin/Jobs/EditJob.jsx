import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import JobService from "../../../Services/JobService";
import CategoryService from "../../../Services/CategoryService";
import CloudinaryService from "../../../Services/CloudinaryService";

// About page component
function EditJob() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let [loading, setLoading] = useState(false);
  const params = useParams();
  const [categories, setCategories] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [lastDate, setLastDate] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    getAllCategories();
    getJobDetails();
  }, []);

  async function getAllCategories() {
    try {
      setLoading(true);
      let res = await CategoryService.all();
      setCategories(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getJobDetails() {
    try {
      setLoading(true);
      let res = await JobService.single(params.id);
      setCategoryId(res.categoryId);
      setTitle(res.title);
      setImageUrl(res.imageUrl);
      setCompanyLogo("");
      setCompanyName(res.companyName);
      setLocation(res.location);
      setVacancies(res.vacancies);
      setSalary(res.salary);
      setJobType(res.jobType);
      setDescription(res.description);
      setLastDate(res.lastDate);
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

      let uploadedImage = imageUrl;

      if (companyLogo) {
        uploadedImage = await CloudinaryService.upload(companyLogo);
      }
      let payload = {
        categoryId: categoryId,
        title: title,
        imageUrl: uploadedImage,
        companyName: companyName,
        location: location,
        vacancies: vacancies,
        salary: salary,
        jobType: jobType,
        description: description,
        lastDate: lastDate,
        updatedAt: Date.now(),
      };
      await JobService.update(params.id, payload);
      setLoading(false);
      toast.success("Job Updated Successfully");
      nav("/admin/managejobs");
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
              <h1 className="text-white font-weight-bold">Update Categories</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Categories</strong>
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
                    <div className="form-group">
                      <label className="form-label form fw-semibold">
                        Category
                      </label>

                      <select
                        className="form-control form-group "
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                      >
                        <option value="" disabled>
                          Choose Category
                        </option>

                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4 form-group">
                      <label className="form-label fw-semibold">Title</label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Company Logo</label>

                      <input
                        type="file"
                        className="w-100 form-control px-2 border-1 mb-3"
                        onChange={(e) => {
                          setCompanyLogo(e.target.files[0]);
                        }}
                      />

                      {imageUrl && (
                        <>
                          <label className="fw-semibold">Current Logo</label>
                          <div className="mt-2 mb-3">
                            <img
                              src={imageUrl}
                              alt="Company Logo"
                              style={{
                                width: "120px",
                                height: "120px",
                                objectFit: "contain",
                                border: "1px solid #ddd",
                                padding: "5px",
                                borderRadius: "5px",
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mb-4 form-group">
                      <label className="form-label fw-semibold">
                        CompanyName
                      </label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="Enter companyname"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>

                    <div className="mb-4 form-group">
                      <label className="form-label fw-semibold">Location</label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="Enter Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Vacancies</label>

                      <input
                        type="number"
                        className="w-100 form-control py-3 mb-4"
                        value={vacancies}
                        onChange={(e) => setVacancies(e.target.value)}
                        min="1"
                      />
                    </div>

                    <div className="mb-4 form-group">
                      <label className="form-label fw-semibold">Salary</label>

                      <input
                        type="text"
                        className="form-control py-3 rounded-3"
                        placeholder="Enter salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Job Type</label>

                      <select
                        className="form-control mb-4"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Job Type
                        </option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>

                    <div className="mb-4 form-group">
                      <label className="form-label fw-semibold">
                        Description
                      </label>

                      <textarea
                        className="form-control rounded-3"
                        rows={5}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="mb-4 form-group">
                      <label className="form-label fw-semibold">
                        Application Deadline
                      </label>

                      <input
                        type="date"
                        className="form-control py-3 rounded-3"
                        value={lastDate}
                        onChange={(e) => setLastDate(e.target.value)}
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
export default EditJob;
