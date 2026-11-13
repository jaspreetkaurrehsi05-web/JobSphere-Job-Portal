import { useEffect, useState } from "react";
import UserService from "../../../Services/UserService";
import AuthService from "../../../Services/AuthService";
import { toast } from "react-toastify";
import CloudinaryService from "../../../Services/CloudinaryService";

export default function MyProfile() {
  const [user, setUser] = useState({
    uid: "",
    name: "",
    email: "",
    contact: "",
    address: "",
    skills: "",
    resumeUrl: "",
    profileImage: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const uid = AuthService.getId();
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      let res = await UserService.single(uid);
      console.log("UID:", uid);
      console.log("USER:", res);
      setUser(res);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProfile() {
    try {
      let imageUrl = user.profileImage;

      if (image) {
        imageUrl = await CloudinaryService.upload(image);
      }

      await UserService.update(uid, {
        address: user.address,

        skills: user.skills,

        profileImage: imageUrl,

        updatedAt: Date.now(),
      });

      toast.success("Profile Updated");
    } catch (error) {
      console.log(error);
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
              <h1 className="text-white font-weight-bold">My Profile</h1>
              <div className="custom-breadcrumbs">
                <a href="index.html">Home</a>{" "}
                <span className="mx-2 slash">/</span>
                <a href="portfolio.html">Profile</a>{" "}
                <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>My Profile</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div
                className="card shadow p-4"
                style={{
                  borderRadius: "15px",
                }}
              >
                <div className="text-center mb-4">
                  <img
                    src={
                      preview
                        ? preview
                        : user.profileImage
                          ? user.profileImage
                          : "images/default-user.png"
                    }
                    style={{
                      height: "120px",
                      width: "120px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                  <h3 className="mt-3">{user.name}</h3>

                  <p className="text-muted">Job Seeker</p>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Name</label>

                    <input
                      className="form-control"
                      value={user.name}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Email</label>

                    <input
                      className="form-control"
                      value={user.email}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Contact</label>

                    <input
                      className="form-control"
                      value={user.contact}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Address</label>

                    <input
                      className="form-control"
                      value={user.address}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <label>Skills</label>

                    <textarea
                      className="form-control"
                      rows="4"
                      value={user.skills}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          skills: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Profile Photo */}
                  <div className="col-md-12 mb-3">
                    <label>Profile Photo</label>

                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];

                        setImage(file);

                        if (file) {
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button
                    className="btn btn-success px-5"
                    onClick={updateProfile}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
