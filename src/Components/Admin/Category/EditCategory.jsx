import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import CategoryService from "../../../Services/CategoryService";
import CloudinaryService from "../../../Services/CloudinaryService";

// About page component
function EditCategory() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let [loading, setLoading] = useState(false);
  const params = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [description, setDescription] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    getCategoryDetails();
  }, []);

  async function getCategoryDetails() {
    try {
      setLoading(true);
      let res = await CategoryService.single(params.id);
      setName(res.name);
      setDescription(res.description);
      setImage(res.imageUrl);
      setPreview(res.imageUrl);
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

      let imageUrl = preview;

      // Upload only if a new file is selected
      if (image instanceof File) {
        imageUrl = await CloudinaryService.upload(image);
      }

      let payload = {
        name,
        image: imageUrl,
        description,
      };

      await CategoryService.update(params.id, payload);

      toast.success("Category Updated Successfully");

      nav("/admin/managecategories");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Category Name
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
                        Category Image
                      </label>

                      <input
                        type="file"
                        className="form-control py-2"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];

                          if (file) {
                            setImage(file);
                            setPreview(URL.createObjectURL(file));
                          }
                        }}
                      />

                      {preview && (
                        <>
                          <label
                            className="form-label fw-semibold mt-4"
                            style={{ marginBottom: "12px" }}
                          >
                            Current Image
                          </label>

                          <div
                            style={{
                              width: "150px",
                              height: "150px",
                              border: "1px solid #dee2e6",
                              borderRadius: "10px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              overflow: "hidden",
                              background: "#fff",
                            }}
                          >
                            <img
                              src={preview}
                              alt="Category"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mb-4">
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
export default EditCategory;
