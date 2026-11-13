import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import JobService from "../../../Services/JobService";
import CategoryService from "../../../Services/CategoryService";
import ApplicationService from "../../../Services/ApplicationService";
import UserService from "../../../Services/UserService";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);

  const [users, setUsers] = useState([]);
  const [companyCount, setCompanyCount] = useState(0);
  const [userCounter, setUserCounter] = useState(0);
  const [jobCounter, setJobCounter] = useState(0);
  const [categoryCounter, setCategoryCounter] = useState(0);
  const [companyCounter, setCompanyCounter] = useState(0);

  const [activeCompany, setActiveCompany] = useState(0);
  const [animateCompany, setAnimateCompany] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const jobRes = await JobService.all();
      const categoryRes = await CategoryService.all();
      const userRes = await UserService.all();

      setJobs(jobRes);
      setCategories(categoryRes);
      setUsers(userRes);

      // Count unique companies
      const companies = new Set(
        jobRes.map((job) => job.companyName.trim().toLowerCase()),
      );

      setCompanyCount(companies.size);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    animateCounter(users.length, setUserCounter);
    animateCounter(jobs.length, setJobCounter);
    animateCounter(categories.length, setCategoryCounter);
    animateCounter(companyCount, setCompanyCounter);
  }, [users, jobs, categories, companyCount]);

  function animateCounter(target, setter) {
    let current = 0;

    const increment = Math.max(1, Math.ceil(target / 30));

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      setter(current);
    }, 50);
  }

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(
      `/browsejobs?keyword=${keyword}&location=${location}&jobType=${jobType}`,
    );
  };

  const companies = [
    ...new Map(
      jobs.map((job) => [
        job.companyName,
        {
          name: job.companyName,
          logo: job.imageUrl,
        },
      ]),
    ).values(),
  ];

  useEffect(() => {
    if (companies.length === 0) return;

    const interval = setInterval(() => {
      setAnimateCompany(false);

      setTimeout(() => {
        setActiveCompany((prev) => (prev + 1) % companies.length);

        setAnimateCompany(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [companies.length]);

  return (
    <>
      {/* HOME */}
      <section
        className="home-section section-hero overlay bg-image"
        style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <div className="mb-5 text-center">
                <h1 className="text-white font-weight-bold home-hero-title">
                  Build Your Career With The Right Opportunity
                </h1>
                <p>
                  Discover jobs that match your skills and experience. Apply
                  easily and move closer to your career goals.
                </p>
              </div>
              <form onSubmit={handleSearch}>
                <div className="row mb-5">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Job title, Skills, Company..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                    <select
                      className="form-control form-control-lg border-0"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="">Select Location</option>

                      <option value="Remote">Remote</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Jalandhar">Jalandhar</option>
                      <option value="Pune">Pune</option>
                      <option value="Hoshiarpur">Hoshiarpur</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Amritsar">Amritsar</option>
                      <option value="Gurugram">Gurugram</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Mohali">Mohali</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Kolkata">Kolkata</option>
                    </select>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                    <select
                      className="form-control form-control-lg border-0"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                    >
                      <option value="">Select Job Type</option>

                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Internship">Internship</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-block text-white btn-search"
                    >
                      <span className="icon-search icon mr-2" />
                      Search Job
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 popular-keywords">
                    <h3>Trending Keywords:</h3>

                    <ul className="keywords list-unstyled m-0 p-0">
                      <li>
                        <Link to="/browsejobs?keyword=Web Developer">
                          Web Developer
                        </Link>
                      </li>

                      <li>
                        <Link to="/browsejobs?keyword=Finance">
                          Finance
                        </Link>
                      </li>

                      <li>
                        <Link to="/browsejobs?keyword=UI UX">
                          UI/UX Designer
                        </Link>
                      </li>

                      <li>
                        <Link to="/browsejobs?keyword=Graphic Designer">
                          Graphic Designer
                        </Link>
                      </li>

                      <li>
                        <Link to="/browsejobs?keyword=Video Editor">
                          Video Editor
                        </Link>
                      </li>
                    </ul>

                    <div
                      style={{
                        marginTop: "50px",
                        textAlign: "center",
                        overflow: "hidden",
                      }}
                    >
                      <h3
                        style={{
                          color: "#fff",
                          fontSize: "28px",
                          fontWeight: "600",
                          marginBottom: "30px",
                        }}
                      >
                        Top Companies Hiring
                      </h3>

                      {companies.length > 0 && (
                        <div
                          style={{
                            opacity: animateCompany ? 1 : 0,

                            transform: animateCompany
                              ? "scale(1) translateY(0px)"
                              : "scale(0.5) translateY(50px)",

                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          {/* Company Circle */}
                          <div
                            style={{
                              height: "150px",
                              width: "150px",
                              background: "#fff",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "auto",
                              boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
                            }}
                          >
                            <img
                              src={companies[activeCompany].logo}
                              alt={companies[activeCompany].name}
                              style={{
                                width: "90px",
                                height: "90px",
                                objectFit: "contain",
                              }}
                            />
                          </div>

                          {/* Company Name */}

                          <h3
                            style={{
                              color: "#fff",
                              marginTop: "25px",
                              fontWeight: "700",
                              fontSize: "24px",
                            }}
                          >
                            {companies[activeCompany].name}
                          </h3>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <a href="#next" className="scroll-button smoothscroll">
          <span className=" icon-keyboard_arrow_down" />
        </a>
      </section>

      <section
        className="py-5 bg-image overlay-primary fixed overlay"
        id="next"
        style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
      >
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2 text-white">
                JobSphere Statistics
              </h2>
              <p className="lead text-white">
                Explore the latest opportunities, connect with trusted
                employers, and discover how JobSphere is helping job seekers
                build successful careers.
              </p>
            </div>
          </div>
          <div className="row pb-0 block__19738 section-counter">
            <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number">{userCounter}</strong>
              </div>
              <span className="caption">Registered Users</span>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number">{jobCounter}</strong>
              </div>
              <span className="caption">Jobs Posted</span>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number">{categoryCounter}</strong>
              </div>
              <span className="caption">Job Categories</span>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <strong className="number">{companyCounter}</strong>
              </div>
              <span className="caption">Hiring Companies</span>
            </div>
          </div>
        </div>
      </section>
      <section
        className="site-section"
        style={{ paddingTop: "30px", paddingBottom: "30px" }}
      >
        <div className="container">
          {/* Job Count */}
          <div className="row mb-3 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">
                {jobs.length} Job{jobs.length !== 1 ? "s" : ""} Listed
              </h2>
            </div>
          </div>

          {/* Job Listings */}
          <ul className="job-listings mb-3">
            {jobs.slice(0, 10).map((job) => (
              <li
                key={job.id}
                className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center"
              >
                <Link to="/jobdescription" state={{ job }} />

                <div className="job-listing-logo mb-2 mb-sm-0">
                  <img
                    src={job.imageUrl}
                    alt={job.title || "Job Logo"}
                    style={{
                      height: "80px",
                      maxWidth: "140px",
                      width: "100%",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      objectFit: "contain",
                      padding: "6px",
                      backgroundColor: "#fff",
                    }}
                  />
                </div>

                <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-0 mx-sm-4">
                  <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                    <h2>{job.title || "-"}</h2>

                    <strong>
                      {categories.find((c) => c.id === job.categoryId)?.name ||
                        "-"}
                    </strong>
                  </div>

                  <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                    <span className="icon-room" /> {job.location || "-"}
                  </div>

                  <div className="job-listing-meta">
                    <span className="badge badge-danger">
                      {job.jobType || "-"}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Total Jobs */}
          <div className="col-md-12 text-end text-md-right">
            <span>Total Jobs Available: {jobs.length}</span>
          </div>
        </div>
      </section>
      {!localStorage.getItem("uid") && (
        <section
          className="py-5 bg-image overlay-primary fixed overlay"
          style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h2 className="text-white">Looking For A Job?</h2>

                <p className="mb-0 text-white lead">
                  Sign up now to access the latest job openings, save your
                  favorite jobs, and apply with just a few clicks.
                </p>
              </div>

              <div className="col-md-3 ml-auto">
                <Link to="/login" className="btn btn-warning btn-block btn-lg">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="site-section py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 text-center mt-4 mb-5">
              <div className="row justify-content-center">
                <div className="col-md-7">
                  <h2 className="section-title mb-2">Popular Job Categories</h2>

                  <p className="lead">
                    Explore opportunities across different industries and find
                    the career path that matches your skills and interests.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              {categories.map((category) => {
                const jobCount = jobs.filter(
                  (job) => job.categoryId === category.id,
                ).length;

                return (
                  <div
                    key={category.id}
                    className="col-6 col-lg-3 col-md-6 text-center mb-4"
                  >
                    <Link
                      to={`/browsejobs?categoryId=${category.id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <div
                        style={{
                          background: "#fff",
                          padding: "30px 20px",
                          borderRadius: "15px",
                          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                          height: "220px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-12px)";
                          e.currentTarget.style.boxShadow =
                            "0 15px 35px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 25px rgba(0,0,0,0.08)";
                        }}
                      >
                        <img
                          src={category.imageUrl}
                          alt={category.name}
                          style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginBottom: "20px",
                          }}
                        />

                        <h5
                          style={{
                            fontSize: "19px",
                            fontWeight: "600",
                            color: "#222",
                            textAlign: "center",
                            minHeight: "45px",
                            marginBottom: "10px",
                          }}
                        >
                          {category.name}
                        </h5>

                        <p
                          style={{
                            color: "#888",
                            fontSize: "15px",
                            margin: "0",
                          }}
                        >
                          {jobCount} Job{jobCount !== 1 ? "s" : ""} Available
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
