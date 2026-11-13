import UserService from "../../../Services/UserService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import Modal from "react-modal";
import { toast } from "react-toastify";
import CloudinaryService from "../../../Services/CloudinaryService";
import Swal from "sweetalert2";

export default function ManageJobSeeker() {
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
      maxWidth: "600px",
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
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [profileImage, setProfileImage] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    getAllUsers();
  }

  useEffect(() => {
    getAllUsers();
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

  async function updateStatus(id, status) {
    try {
      setLoading(true);

      await UserService.update(id, {
        status: status,
        updatedAt: Date.now(),
      });

      toast.success("User Status Updated");

      getAllUsers();
    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    } finally {
      setLoading(false);
    }
  }

  async function submit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      if (profileImage) {
        var imageUrl = await CloudinaryService.upload(profileImage);
      }
      let payload = {
        name: name,
        email: email,
        contact: contact,
        address: address,
        skills: skills,
        resumeUrl: resumeUrl,
        profileImage: imageUrl,
        userType: "user",
        status: "active",
        createdAt: Date.now(),
      };

      await UserService.add(payload);
      setLoading(false);
      toast.success("User Added Successfully");
      setName("");
      setEmail("");
      setContact("");
      setAddress("");
      setSkills("");
      setResumeUrl("");
      setProfileImage("");
      await getAllUsers();

      setIsOpen(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteJobSeeker(id) {
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
          let res = await UserService.delete(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          getAllUsers();
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
              <h1 className="text-white font-weight-bold">Users</h1>
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

      <div className="row my-5 mx-0">
        <div className="col-md">
          <h3
            className="mx-4"
            style={{
              fontWeight: "600",
              color: "#333",
            }}
          >
            {" "}
            Users List
          </h3>
        </div>
      </div>
      <div
        className="bg-light rounded"
        style={{
          padding: "30px",
          width: "100%",
          overflow: "hidden",
        }}
      >
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
              width: "100%",
              overflowX: "auto",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <table
              className="table table-bordered table-hover align-middle mb-0"
              style={{
                width: "100%",
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
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Address</th>
                  <th>Skills</th>
                  <th>Profile Photo</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name || "-"}</td>
                    <td>{user.email || "-"}</td>
                    <td>{user.contact || "-"}</td>
                    <td>{user.address || "-"}</td>
                    <td>{user.skills || "-"}</td>
                    {/* <td>{user.resumeUrl || "-"}</td> */}

                    <td>
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      <select
                        className="form-select"
                        value={user.status || "active"}
                        onChange={(e) => updateStatus(user.id, e.target.value)}
                      >
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                      </select>
                    </td>

                    <td style={{ whiteSpace: "nowrap" }}>
                      {/* <Link to={`/admin/managejobseeker/edit/${user.id}`}>
                        <button className="btn btn-sm btn-primary">Edit</button>
                      </Link> */}
                      &nbsp;
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteJobSeeker(user.id)}
                      >
                        Remove
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
