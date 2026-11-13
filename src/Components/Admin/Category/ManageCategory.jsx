import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import CategoryService from "../../../Services/CategoryService";
import Modal from "react-modal";
import { toast } from "react-toastify";
import CloudinaryService from "../../../Services/CloudinaryService";
import Swal from "sweetalert2";

export default function ManageCategories() {
  const modalStyling = {
    overlay: {
      backgroundColor: "rgba(0,0,0,.6)",
      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "16px",
    },
    content: {
      position: "relative",
      inset: "unset",
      width: "100%",
      maxWidth: "600px",
      maxHeight: "85vh",
      overflowY: "auto",
      padding: "25px",
      borderRadius: "0",
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0",
      borderBottomLeftRadius: "0",
      borderBottomRightRadius: "0",
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
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    getAllCategories();
  }

  useEffect(() => {
    getAllCategories();
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

  async function submit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      if (image) {
        var imageUrl = await CloudinaryService.upload(image);
      }
      let payload = {
        name: name,
        description: description,
        imageUrl: imageUrl,
      };

      await CategoryService.add(payload);
      setLoading(false);
      toast.success("Category Added Successfully");
      setName("");
      setDescription("");
      closeModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(id) {
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
          let res = await CategoryService.delete(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          getAllCategories();
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
              <h1 className="text-white font-weight-bold">Categories</h1>
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
            Categories List
          </h3>

          <p
            className="mb-0 mt-2"
            style={{
              color: "#777",
              fontSize: "14px",
            }}
          >
            Manage all job categories from here
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
            + Add Category
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
            className="table-responsive"
            style={{
              overflowX: "auto",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <table
              className="table table-bordered table-hover align-middle mb-0"
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
                  <th style={{ width: "60px" }}>#</th>
                  <th style={{ width: "180px" }}>Name</th>
                  <th style={{ width: "120px" }}>Image</th>
                  <th>Description</th>
                  <th style={{ width: "180px" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>

                    <td>{category.name}</td>

                    <td className="text-center">
                      {category.imageUrl ? (
                        <img
                          src={category.imageUrl}
                          alt={category.name}
                          style={{
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                            objectFit: "contain",
                            border: "1px solid #ddd",
                            padding: "3px",
                          }}
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td
                      style={{
                        minWidth: "350px",
                        whiteSpace: "normal",
                        lineHeight: "1.6",
                      }}
                    >
                      {category.description || "-"}
                    </td>

                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          justifyContent: "center",
                        }}
                      >
                        <Link
                          to={`/admin/managecategories/edit/${category.id}`}
                        >
                          <button className="btn btn-sm btn-primary">
                            Edit
                          </button>
                        </Link>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteCategory(category.id)}
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
        <section className="p-3">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="m-0">Add New Category</h2>

              <button
                className="btn btn-success rounded-circle"
                onClick={closeModal}
                style={{
                  width: "45px",
                  height: "45px",
                }}
              >
                ✕
              </button>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <form onSubmit={submit} className="p-5 border">
                  <h3 className="text-black mb-5 border-bottom pb-2">
                    Category Details
                  </h3>

                  {/* Category Name */}

                  <div className="form-group">
                    <label>Category Name</label>

                    <input
                      type="text"
                      className="w-100 form-control py-3 mb-4"
                      placeholder="Enter Category Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>

                  {/* Description */}

                  <div className="form-group">
                    <label>Category Description</label>

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
                  {/* Category Image */}

                  <div className="form-group">
                    <label>Category Image</label>
                    <input
                      type="file"
                      className="w-100 form-control px-2 border-1 mb-4"
                      placeholder="Add file"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
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
        </section>
      </Modal>
    </>
  );
}
