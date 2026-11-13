import { useEffect, useState } from "react";

export default function About() {
 

  return (
    <>
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        id="home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-white font-weight-bold">About Us</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>About Us</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section pb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div
                style={{
                  width: "100%",
                  minHeight: "260px",
                  maxHeight: "420px",
                  height: "auto",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#fff",
                  borderRadius: "20px",
                }}
              >
                <img
                  src="/images/about/jobsphereHome.png"
                  alt="About JobSphere"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-5 ml-auto d-flex align-items-center">
              <div>
                <h2 className="section-title mb-3">About JobSphere</h2>

                <p className="lead">
                  JobSphere is a modern job portal that connects job seekers
                  with companies by providing a simple and efficient platform to
                  discover opportunities.
                </p>

                <p>
                  Users can search jobs, explore categories, view job details,
                  apply for positions, and track their applications. Companies
                  can publish job opportunities and find suitable candidates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="site-section pt-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0 order-md-2">
              <div
                style={{
                  width: "100%",
                  minHeight: "260px",
                  maxHeight: "420px",
                  height: "auto",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#fff",
                  borderRadius: "20px",
                }}
              >
                <img
                  src="/images/work/jobsphereApply.png"
                  alt="About JobSphere"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-5 mr-auto order-md-1  mb-5 mb-lg-0">
              <h2
                className="section-title"
                style={{
                  marginTop: "60px",
                  marginBottom: "25px",
                }}
              >
                How JobSphere Works
              </h2>

              <p className="lead mb-4">
                Find the right opportunities with JobSphere.
              </p>

              <div className="mb-3">
                <h5>1. Search Jobs</h5>
                <p>Find jobs based on skills, location, and preferences.</p>
              </div>

              <div className="mb-3">
                <h5>2. View Details</h5>
                <p>Check job descriptions and company requirements.</p>
              </div>

              <div className="mb-3">
                <h5>3. Apply Easily</h5>
                <p>Submit applications with your profile and resume.</p>
              </div>

              <div>
                <h5>4. Track Status</h5>
                <p>Monitor your application progress anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-light">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="section-title">Why Choose JobSphere</h2>

              <p className="lead">
                Everything you need to find the right career opportunity.
              </p>
            </div>
          </div>

          <div className="row">
            {/* Card 1 */}
            <div className="col-12 col-sm-6 col-md-3 mb-4">
              <div
                style={{
                  background: "#fff",
                  padding: "35px 20px",
                  borderRadius: "15px",
                  textAlign: "center",
                  height: "100%",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 35px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.08)";
                }}
              >
                <div
                  style={{
                    fontSize: "45px",
                    marginBottom: "20px",
                  }}
                >
                  ✔
                </div>

                <h4>Verified Jobs</h4>

                <p>
                  Find genuine job opportunities posted by trusted companies.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-12 col-sm-6 col-md-3 mb-4">
              <div
                style={{
                  background: "#fff",
                  padding: "35px 20px",
                  borderRadius: "15px",
                  textAlign: "center",
                  height: "100%",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 35px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.08)";
                }}
              >
                <div
                  style={{
                    fontSize: "45px",
                    marginBottom: "20px",
                  }}
                >
                  📝
                </div>

                <h4>Easy Applications</h4>

                <p>Apply for jobs quickly using your profile and resume.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-12 col-sm-6 col-md-3 mb-4">
              <div
                style={{
                  background: "#fff",
                  padding: "35px 20px",
                  borderRadius: "15px",
                  textAlign: "center",
                  height: "100%",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 35px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.08)";
                }}
              >
                <div
                  style={{
                    fontSize: "45px",
                    marginBottom: "20px",
                  }}
                >
                  📄
                </div>

                <h4>Resume Builder</h4>

                <p>Create and manage a professional resume easily.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-12 col-sm-6 col-md-3 mb-4">
              <div
                style={{
                  background: "#fff",
                  padding: "35px 20px",
                  borderRadius: "15px",
                  textAlign: "center",
                  height: "100%",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 35px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.08)";
                }}
              >
                <div
                  style={{
                    fontSize: "45px",
                    marginBottom: "20px",
                  }}
                >
                  📊
                </div>

                <h4>Application Tracking</h4>

                <p>
                  Track your application status anytime from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
