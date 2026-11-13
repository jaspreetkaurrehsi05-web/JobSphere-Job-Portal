import { useEffect, useState } from "react";
import CategoryService from "../../../Services/CategoryService";
import { Link } from "react-router-dom";

export default function Categories() {
  let [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

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
      <section
        className="site-section services-section bg-light block__62849"
        id="next-section"
      >
        <div className="container">
          <div className="row">
            {categories.map((category) => (
              <div key={category.id} className="col-12 col-sm-6 col-lg-4 mb-4 mb-lg-5">
                <Link
                  to={`/browsejobs?categoryId=${category.id}`}
                  className="block__16443 text-center d-block"
                >
                  <img
                    src={category.imageUrl}
                    style={{
                      height: "80px",
                      width: "80px",
                      borderRadius: "50%",
                    }}
                  />

                  <h3 className="mt-2">{category.name}</h3>
                  <p
                    style={{
                      color: "#7a7a7a",
                      lineHeight: "1.8",
                      maxWidth: "360px",
                      margin: "25px auto 0",
                      textAlign: "left",
                    }}
                  >
                    {category.description}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
