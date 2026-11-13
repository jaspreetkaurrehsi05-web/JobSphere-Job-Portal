import { useState } from "react";
import CategoryService from "../../../Services/CategoryService";
import CloudinaryService from "../../../Services/CloudinaryService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";

function AddCategory() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const nav = useNavigate();

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
      nav("/admin/managecategories");
      setName("");
      setDescription("");
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
              <h1 className="text-white font-weight-bold">Add Category</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Dashboard</a>
                <span className="mx-2 slash">/</span>
                <a href="#">Categories</a>
                <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Add Category</strong>
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
                <h2>Add New Category</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <form  onSubmit={submit} className="p-5 border rounded">
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

                  <div className="text-right mt-5">
                    <button type="submit" className="btn btn-primary">
                      Save Category
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

export default AddCategory;
