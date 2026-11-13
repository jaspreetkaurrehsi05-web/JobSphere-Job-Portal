import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import JobService from "../../../Services/JobService";
import Modal from "react-modal";
import { toast } from "react-toastify";
import CloudinaryService from "../../../Services/CloudinaryService";
import Swal from "sweetalert2";
import CategoryService from "../../../Services/CategoryService";

export default function ManageJobs() {
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
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [lastDate, setLastDate] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    getAllCategories();
    getAllJobs();
  }

  useEffect(() => {
    getAllCategories();
    getAllJobs();
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

  async function submit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      if (companyLogo) {
        var imageUrl = await CloudinaryService.upload(companyLogo);
      }
      console.log("Job Type:", jobType);

      let payload = {
        categoryId: categoryId,
        title: title,
        imageUrl: imageUrl,
        companyName: companyName,
        location: location,
        vacancies: vacancies,
        salary: salary,
        description: description,
        jobType: jobType,
        lastDate: lastDate,
        createdAt: Date.now(),
      };

      await JobService.add(payload);
      setLoading(false);
      toast.success("Job Added Successfully");
      setTitle("");
      setCompanyLogo("");
      setCompanyName("");
      setLocation("");
      setVacancies("");
      setSalary("");
      setJobType("");
      setDescription("");
      setLastDate("");
      closeModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteJob(id) {
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
          let res = await JobService.delete(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          getAllJobs();
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
              <h1 className="text-white font-weight-bold">Jobs</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Jobs</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="row align-items-center my-5 mx-1 p-4 shadow-sm rounded"
        style={{
          backgroundColor: "#fff",
          border: "1px solid #eee",
        }}
      >
        <div className="col-md">
          <h3
            className="mb-0"
            style={{
              fontWeight: "600",
              color: "#333",
            }}
          >
            Jobs List
          </h3>

          <p
            className="mb-0 mt-2"
            style={{
              color: "#777",
              fontSize: "14px",
            }}
          >
            Manage all jobs from here
          </p>
        </div>

        <div className="col-md-4 text-md-right mt-3 mt-md-0">
          <button
            className="btn text-light"
            onClick={openModal}
            style={{
              backgroundColor: "#8bc34a",
              border: "none",
              padding: "10px 18px",
              fontSize: "15px",
              fontWeight: "500",
              borderRadius: "5px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
            }}
          >
            + Add Job
          </button>
        </div>
      </div>

      <div className="p-3 p-md-4 bg-light rounded">
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
          <div
            style={{
              width: "100%",
              overflowX: "auto",
              overflowY: "hidden",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <table
              className="table table-bordered table-hover align-middle mb-0"
              style={{
                minWidth: "1400px",
                width: "max-content",
                backgroundColor: "#fff",
              }}
            >
              <thead
                className="table-light"
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                }}
              >
                <tr>
                  <th>#</th>
                  <th>Category</th>
                  <th>Title</th>
                  <th>Company Logo</th>
                  <th>Company Name</th>
                  <th>Location</th>
                  <th>Vacancies</th>
                  <th>Salary</th>
                  <th>Job Type</th>
                  <th>Description</th>
                  <th>Last Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job, index) => (
                  <tr key={job.id}>
                    <td>{index + 1}</td>

                    <td
                      style={{
                        width: "150px",
                        maxWidth: "150px",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {categories.find((c) => c.id === job.categoryId)?.name ||
                        "-"}
                    </td>

                    <td
                      style={{
                        width: "180px",
                        maxWidth: "180px",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {job.title || "-"}
                    </td>

                    <td
                      style={{
                        width: "150px",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      {job.imageUrl ? (
                        <img
                          src={job.imageUrl}
                          alt={job.title}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                            padding: "8px",
                            backgroundColor: "#fff",
                          }}
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>{job.companyName || "-"}</td>

                    <td>{job.location || "-"}</td>

                    <td style={{ textAlign: "center" }}>
                      {job.vacancies || "-"}
                    </td>

                    <td>{job.salary || "-"}</td>

                    <td>
                      <span className="badge bg-success text-light">
                        {job.jobType || "-"}
                      </span>
                    </td>

                    <td
                      style={{
                        width: "350px",
                        maxWidth: "350px",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {job.description || "-"}
                    </td>

                    <td>
                      {job.lastDate
                        ? new Date(job.lastDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "-"}
                    </td>

                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Link to={`/admin/managejobs/edit/${job.id}`}>
                          <button className="btn btn-sm btn-primary">
                            Edit
                          </button>
                        </Link>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteJob(job.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyling}
      >
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">Add New Job</h2>

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
              <form onSubmit={submit} className="p-5 border">
                <h3 className="text-black mb-5 border-bottom pb-2">
                  Job Details
                </h3>

                <div className="form-group">
                  <label>Job Category</label>
                  <select
                    className="form-control mb-3"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Choose Category
                    </option>

                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Job Title</label>

                  <input
                    type="text"
                    className="w-100 form-control py-3 mb-4"
                    placeholder="Enter Job Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Company Logo</label>
                  <input
                    type="file"
                    className="w-100 form-control px-2 border-1 mb-4"
                    placeholder="Add file"
                    onChange={(e) => {
                      setCompanyLogo(e.target.files[0]);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Job Company Name</label>

                  <input
                    type="text"
                    className="w-100 form-control py-3 mb-4"
                    placeholder="Enter Job Company Name"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Job Location</label>

                  <input
                    type="text"
                    className="w-100 form-control py-3 mb-4"
                    placeholder="Enter Job Location"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Vacancies</label>

                  <input
                    type="number"
                    className="w-100 form-control py-3 mb-4"
                    placeholder="Enter Number of Vacancies"
                    value={vacancies}
                    onChange={(e) => setVacancies(e.target.value)}
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label>Job salary</label>

                  <input
                    type="text"
                    className="w-100 form-control py-3 mb-4"
                    placeholder="Enter Job Salary"
                    value={salary}
                    onChange={(e) => {
                      setSalary(e.target.value);
                    }}
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

                {/* Description */}

                <div className="form-group">
                  <label>Job Description</label>

                  <textarea
                    className="w-100 form-control mb-4"
                    rows={5}
                    cols={10}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Application Deadline</label>

                  <input
                    type="date"
                    className="w-100 form-control py-3 mb-4"
                    value={lastDate}
                    onChange={(e) => {
                      setLastDate(e.target.value);
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
