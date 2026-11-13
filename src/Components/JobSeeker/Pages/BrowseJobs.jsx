import { useEffect, useState } from "react";
import CategoryService from "../../../Services/CategoryService";
import JobService from "../../../Services/JobService";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function BrowseJobs() {
  let [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const location = searchParams.get("location") || "";
  const jobType = searchParams.get("jobType") || "";
  const categoryId = searchParams.get("categoryId") || "";

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      let categoryRes = await CategoryService.all();
      let jobRes = await JobService.all();
      setCategories(categoryRes);
      setAllJobs(jobRes);
      setJobs(jobRes);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const searchableText = `
    ${job.title}
    ${job.companyName}
    ${job.location}
    ${job.description}
    ${job.jobType}
  `.toLowerCase();

    const keywordMatch =
      keyword === "" ||
      keyword
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .every((word) => searchableText.includes(word));

    const locationMatch =
      location === "" || job.location.toLowerCase() === location.toLowerCase();

    const jobTypeMatch =
      jobType === "" || job.jobType.toLowerCase() === jobType.toLowerCase();

    const categoryMatch = categoryId === "" || job.categoryId === categoryId;

    return keywordMatch && locationMatch && jobTypeMatch && categoryMatch;
  });

  const handleJobSearch = () => {
    if (!search.trim()) {
      setJobs(allJobs);
      return;
    }

    const matchedJobs = allJobs.filter((job) => {
      const text = `
      ${job.title}
      ${job.companyName}
      ${job.location}
    `.toLowerCase();

      return search
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .every((word) => text.includes(word));
    });

    if (matchedJobs.length === 1) {
      navigate("/jobdescription", {
        state: { job: matchedJobs[0] },
      });
    } else {
      setJobs(matchedJobs);
    }
  };

  return (
    <>
      {/* HOME */}
      <section
        className="section-hero home-section overlay inner-page bg-image"
        style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <div className="mb-5 text-center">
                <h1 className="text-white font-weight-bold">
                  Explore Jobs That Match Your Skills
                </h1>
                <p>
                  Discover the latest job opportunities from top companies and
                  find the perfect role to grow your career.
                </p>
              </div>
            </div>
          </div>
        </div>
        <a href="#next" className="scroll-button smoothscroll">
          <span className=" icon-keyboard_arrow_down" />
        </a>
      </section>

      <section className="site-section" id="next">
        <div className="container">
          <div className="row mb-4 justify-content-center">
            <div className="col-md-8">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Job Title or Company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button className="btn btn-primary" onClick={handleJobSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="row mb-5 justify-content-center">
            <div className="col-md-7 text-center">
              <h2 className="section-title mb-2">
                {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""}{" "}
                Found
              </h2>
            </div>
          </div>
          <ul className="job-listings mb-5">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
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
                        {categories.find((c) => c.id === job.categoryId)
                          ?.name || "-"}
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
              ))
            ) : (
              <li className="text-center py-5 list-unstyled w-100">
                <h3>No jobs found</h3>
                <p>We couldn't find any jobs matching your search.</p>

                <Link to="/browsejobs" className="btn btn-primary">
                  View All Jobs
                </Link>
              </li>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}
