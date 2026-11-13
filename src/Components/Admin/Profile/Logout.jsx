export default function Logout(){
    return(
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
          <h1 className="text-white font-weight-bold">Logout</h1>
          <div className="custom-breadcrumbs">
            <a href="#">Home</a>
            <span className="mx-2 slash">/</span>
            <span className="text-white">
              <strong>Logout</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* LOGOUT */}
  <section className="site-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">

          <div className="p-5 border rounded text-center">

            <span
              className="icon-check_circle text-success"
              style={{ fontSize: "70px" }}
            ></span>

            <h2 className="mt-4">Logout</h2>

            <p className="mb-4">
              Are you sure you want to logout from your JobSphere account?
            </p>

            <div className="d-flex justify-content-center">

              <button
                className="btn btn-secondary mr-3"
              >
                Cancel
              </button>

              <button
                className="btn btn-danger"
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  </section>
</>
    )
}