export default function AddJobs(){
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
          <h1 className="text-white font-weight-bold">Add Job</h1>

          <div className="custom-breadcrumbs">
            <a href="#">Dashboard</a>
            <span className="mx-2 slash">/</span>
            <a href="#">Jobs</a>
            <span className="mx-2 slash">/</span>
            <span className="text-white">
              <strong>Add Job</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* FORM */}

  <section className="site-section">
    <div className="container">

      <div className="row align-items-center mb-5">
        <div className="col-lg-8">
          <h2>Add New Job</h2>
        </div>

        <div className="col-lg-4">
          <div className="row">
            <div className="col-6">
              <button className="btn btn-light btn-block">
                Reset
              </button>
            </div>

            <div className="col-6">
              <button className="btn btn-primary btn-block">
                Save Job
              </button>
            </div>
          </div>
        </div>
      </div>

      <form className="p-5 border rounded">

        <h3 className="border-bottom pb-2 mb-5">
          Job Details
        </h3>

        {/* Company Logo */}

        <div className="form-group">
          <label>Company Logo</label>
          <br />

          <label className="btn btn-primary btn-file">
            Browse File
            <input type="file" hidden />
          </label>
        </div>

        {/* Job Title */}

        <div className="form-group">
          <label>Job Title</label>

          <input
            type="text"
            className="form-control"
            placeholder="React Developer"
          />
        </div>

        {/* Company */}

        <div className="form-group">
          <label>Company Name</label>

          <input
            type="text"
            className="form-control"
            placeholder="ABC Technologies"
          />
        </div>

        {/* Category */}

        <div className="form-group">
          <label>Category</label>

          <select className="form-control">
            <option>Select Category</option>
            <option>Information Technology</option>
            <option>Marketing</option>
            <option>Finance</option>
            <option>Healthcare</option>
            <option>Education</option>
          </select>
        </div>

        {/* Job Type */}

        <div className="form-group">
          <label>Job Type</label>

          <select className="form-control">
            <option>Select Job Type</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>
        </div>

        {/* Location */}

        <div className="form-group">
          <label>Location</label>

          <input
            type="text"
            className="form-control"
            placeholder="Amritsar, Punjab"
          />
        </div>

        {/* Salary */}

        <div className="form-group">
          <label>Salary</label>

          <input
            type="text"
            className="form-control"
            placeholder="₹6,00,000 per annum"
          />
        </div>

        {/* Experience */}

        <div className="form-group">
          <label>Experience Required</label>

          <input
            type="text"
            className="form-control"
            placeholder="1 - 3 Years"
          />
        </div>

        {/* Qualification */}

        <div className="form-group">
          <label>Qualification</label>

          <input
            type="text"
            className="form-control"
            placeholder="Bachelor's Degree"
          />
        </div>

        {/* Skills */}

        <div className="form-group">
          <label>Required Skills</label>

          <input
            type="text"
            className="form-control"
            placeholder="React, JavaScript, Firebase"
          />
        </div>

        {/* Vacancies */}

        <div className="form-group">
          <label>Number of Vacancies</label>

          <input
            type="number"
            className="form-control"
            placeholder="5"
          />
        </div>

        {/* Last Date */}

        <div className="form-group">
          <label>Application Deadline</label>

          <input
            type="date"
            className="form-control"
          />
        </div>

        {/* Description */}

        <div className="form-group">
          <label>Job Description</label>

          <textarea
            className="form-control"
            rows="5"
            placeholder="Enter complete job description..."
          ></textarea>
        </div>

        {/* Responsibilities */}

        <div className="form-group">
          <label>Responsibilities</label>

          <textarea
            className="form-control"
            rows="4"
            placeholder="Enter job responsibilities..."
          ></textarea>
        </div>

        {/* Benefits */}

        <div className="form-group">
          <label>Benefits</label>

          <textarea
            className="form-control"
            rows="3"
            placeholder="Health Insurance, Flexible Hours..."
          ></textarea>
        </div>

        <div className="text-right mt-5">

          <button
            type="reset"
            className="btn btn-light mr-3"
          >
            Reset
          </button>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Save Job
          </button>

        </div>

      </form>

    </div>
  </section>
</>
    )
}