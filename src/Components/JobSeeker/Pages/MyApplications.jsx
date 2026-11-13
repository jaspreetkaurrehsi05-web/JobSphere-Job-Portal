import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import ApplicationService from "../../../Services/ApplicationService";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UserService from "../../../Services/UserService";
import JobService from "../../../Services/JobService";
import AuthService from "../../../Services/AuthService";

export default function MyApplications() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const currentUserId = AuthService.getId();

  useEffect(() => {
    getAllJobs();
    getAllApplications();
  }, []);

  async function getAllJobs() {
    try {
      setLoading(true);

      let res = await JobService.all();

      setJobs(res);
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

      let userApplications = res.filter(
        (item) => item.userId === currentUserId,
      );

      setApplications(userApplications);
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
                <a href="/">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Applications</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container">
          <h2 className="mb-4">My Applications</h2>

          {loading ? (
            <div className="text-center">
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
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              <table
                className="table table-bordered align-middle mb-0"
                style={{
                  backgroundColor: "#fff",
                  minWidth: "900px",
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
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Applied Date</th>
                    <th>Status</th>
                    <th>Resume</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((app) => {
                    let job = jobs.find((j) => j.id === app.jobId);

                    return (
                      <tr key={app.id}>
                        <td>{job?.title}</td>

                        <td>{job?.companyName}</td>

                        <td>{new Date(app.appliedAt).toLocaleDateString()}</td>

                        <td>
                          <span
                            style={{ color: "white" }}
                            className={
                              app.applicationStatus === "Selected"
                                ? "badge bg-success"
                                : app.applicationStatus === "Rejected"
                                  ? "badge bg-danger"
                                  : app.applicationStatus === "Shortlisted"
                                    ? "badge bg-primary"
                                    : "badge bg-warning"
                            }
                          >
                            {app.applicationStatus}
                          </span>
                        </td>
                        <td>
                          {app.resumeUrl ? (
                            <a
                              href={app.resumeUrl}
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
