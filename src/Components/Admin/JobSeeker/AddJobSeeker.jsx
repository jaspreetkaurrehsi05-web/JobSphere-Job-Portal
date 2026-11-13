import { useState } from "react";
import CloudinaryService from "../../../Services/CloudinaryService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";
import UserService from "../../../Services/UserService";

function AddJobSeeker() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      if (profileImage) {
        var imageUrl  = await CloudinaryService.upload(profileImage);
      }
      let payload = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        skills: skills,
        resumeUrl: resumeUrl,
        profileImage: imageUrl,
      };

      await UserService.add(payload);
      setLoading(false);
      toast.success("User Added Successfully");
      nav("/admin/managejobseeker");
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setSkills("");
      setResumeUrl("");
      setProfileImage("");
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
              <h1 className="text-white font-weight-bold">Add User</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Dashboard</a>
                <span className="mx-2 slash">/</span>
                <a href="#">Users</a>
                <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Add User</strong>
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
                <h2>Add New User</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <form  onSubmit={submit} className="p-5 border rounded">
                  <h3 className="text-black mb-5 border-bottom pb-2">
                    User Details
                  </h3>


                  {/* Category Name */}

                  <div className="form-group">
                    <label>User Name</label>

                    <input
                      type="text"
                      className="w-100 form-control py-3 mb-4"
                      placeholder="Enter User Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>User Email</label>

                    <input
                      type="email"
                      className="w-100 form-control py-3 mb-4"
                      placeholder="Enter User Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>User Phone no</label>

                    <input
                      type="number"
                      className="w-100 form-control py-3 mb-4"
                      placeholder="Enter User Phone no"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>User Address</label>

                    <input
                      type="text"
                      className="w-100 form-control py-3 mb-4"
                      placeholder="Enter User Address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>User Skills</label>

                    <input
                      type="text"
                      className="w-100 form-control py-3 mb-4"
                      placeholder="Enter User Skills"
                      value={skills}
                      onChange={(e) => {
                        setSkills(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>User Resume Url</label>

                    <input
                      type="text"
                      className="w-100 form-control py-3 mb-4"
                      placeholder="Enter User Resume url"
                      value={resumeUrl}
                      onChange={(e) => {
                        setResumeUrl(e.target.value);
                      }}
                    />
                  </div>
                
                  {/* Category Image */}

                  <div className="form-group">
                    <label>Profile Image</label>
                    <input
                      type="file"
                      className="w-100 form-control px-2 border-1 mb-4"
                      placeholder="Add file"
                      onChange={(e) => {
                        setProfileImage(e.target.files[0]);
                      }}
                    />
                  </div>

                  {/* Buttons */}

                  <div className="text-right mt-5">
                    <button type="submit" className="btn btn-primary">
                      Save User
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

export default AddJobSeeker;
