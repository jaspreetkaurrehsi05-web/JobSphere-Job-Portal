import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import ApplicationService from "../../../Services/ApplicationService";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UserService from "../../../Services/UserService";
import JobService from "../../../Services/JobService";

export default function ViewApplications() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  let [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState("");

  // function openModal() {
  //   setIsOpen(true);
  // }

  // function closeModal() {
  //   setIsOpen(false);
  //   getAllUsers();
  //   getAllJobs();
  //   getAllApplications();
  // }

  useEffect(() => {
    getAllUsers();
    getAllJobs();
    getAllApplications();
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

  async function updateStatus(id, status) {
    try {
      setLoading(true);

      await ApplicationService.update(id, {
        applicationStatus: status,
        updatedAt: Date.now(),
      });

      toast.success("Application Status Updated");

      getAllApplications();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // async function submit(e) {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);

  //     let payload = {
  //       userId: userId,
  //       jobId: jobId,
  //       coverLetter: coverLetter,
  //     };

  //     await ApplicationService.add(payload);
  //     setLoading(false);
  //     toast.success("Application Added Successfully");
  //     setUserId("");
  //     setJobId("");
  //     setCoverLetter("");
  //     closeModal();
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //     toast.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function deleteApplication(id) {
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
          let res = await ApplicationService.delete(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          getAllApplications();
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
              <h1 className="text-white font-weight-bold">Applications</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Applications</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="row my-5 mx-0">
        <div className="col-md">
          <h3
            className="mx-4"
            className="mb-0"
            style={{
              fontWeight: "600",
              color: "#333",
            }}
          >
            Applications List
          </h3>
        </div>
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
          <div
            className="table-responsive"
            style={{
              overflowX: "auto",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <table
              className="table table-bordered table-hover align-middle mb-0"
              style={{
                minWidth: "1400px",
                whiteSpace: "nowrap",
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
                  <th style={{ width: "8%" }}>#</th>
                  <th style={{ width: "22%" }}>User</th>
                  <th style={{ width: "22%" }}>Job</th>
                  <th style={{ width: "33%" }}>Cover Letter</th>
                  <th style={{ width: "33%" }}>Resume</th>
                  <th style={{ width: "15%" }}>Status</th>
                  <th style={{ width: "15%" }}>Applied Date</th>
                  <th style={{ width: "15%" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((application, index) => (
                  <tr key={application.id}>
                    <td>{index + 1}</td>

                    <td>
                      {users.find((c) => c.id === application.userId)?.name ||
                        "-"}
                    </td>

                    <td>
                      {jobs.find((c) => c.id === application.jobId)?.title ||
                        "-"}
                    </td>

                    <td
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {application.coverLetter}
                    </td>

                    <td>
                      {application.resumeUrl ? (
                        <a
                          href={application.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-success btn-sm"
                        >
                          View Resume
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      <select
                        className="form-select"
                        value={application.applicationStatus}
                        onChange={(e) =>
                          updateStatus(application.id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>

                        <option value="Shortlisted">Shortlisted</option>

                        <option value="Rejected">Rejected</option>

                        <option value="Selected">Selected</option>
                      </select>
                    </td>

                    <td>
                      {application.appliedAt
                        ? new Date(application.appliedAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td style={{ whiteSpace: "nowrap" }}>
                      {/* <Link
                        to={`/admin/viewapplications/edit/${application.id}`}
                      >
                        <button
                          className="btn btn-sm btn-primary"
                          style={{ marginRight: "8px" }}
                        >
                          Edit
                        </button>
                      </Link> */}

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteApplication(application.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
