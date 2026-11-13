import { useState } from "react";
import CloudinaryService from "../../../Services/CloudinaryService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";
import ApplicationService from "../../../Services/ApplicationService";

function AddApplications() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState("");
  const [jobId, setJobId] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      let payload = {
        userId: userId,
        jobId: jobId,
        coverLetter: coverLetter,
      };

      await ApplicationService.add(payload);
      setLoading(false);
      toast.success("Application Added Successfully");
      nav("/admin/viewapplications");
      setUserId("");
      setJobId("");
      setCoverLetter("");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* HERO */}
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">Add Application</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Dashboard</a>
                <span className="mx-2 slash">/</span>
                <a href="#">Applicatiion</a>
                <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Add Application</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
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
        <section className="site-section">
          <div className="container">
            <div className="row align-items-center mb-5">
              <div className="col-lg-8">
                <h2>Add New Application</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <form  onSubmit={submit} className="p-5 border rounded">
                  <h3 className="text-black mb-5 border-bottom pb-2">
                    Application Details
                  </h3>


                  {/* Category Name */}

                  <div className="form-group">
                    <label>Application User ID</label>

                    <input
                      type="text"
                      className="w-100 form-control py-3 mb-4"
                      placeholder="Enter Appliaction User Id"
                      value={userId}
                      onChange={(e) => {
                        setUserId(e.target.value);
                      }}
                    />
                  </div>

                 <div className="form-group">
                    <label>Application Job ID</label>

                    <input
                      type="text"
                      className="w-100 form-control py-3 mb-4"
                      placeholder="Enter Application Job Id"
                      value={jobId}
                      onChange={(e) => {
                        setJobId(e.target.value);
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

                  {/* Buttons */}

                  <div className="text-right mt-5">
                    <button type="submit" className="btn btn-primary">
                      Save Application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default AddApplications;
