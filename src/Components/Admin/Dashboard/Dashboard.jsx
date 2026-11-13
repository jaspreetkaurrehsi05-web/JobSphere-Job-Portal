import { useEffect, useState } from "react";
import UserService from "../../../Services/UserService";
import JobService from "../../../Services/JobService";
import CategoryService from "../../../Services/CategoryService";
import ApplicationService from "../../../Services/ApplicationService";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);

  const [pending, setPending] = useState(0);
  const [shortlisted, setShortlisted] = useState(0);
  const [selected, setSelected] = useState(0);
  const [rejected, setRejected] = useState(0);

  const [recentApplications, setRecentApplications] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);

  const [categoryStats, setCategoryStats] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const users = await UserService.all();
    const jobs = await JobService.all();
    const categories = await CategoryService.all();
    const applications = await ApplicationService.all();

    const stats = categories.map((category) => {
      const count = jobs.filter((job) => job.categoryId === category.id).length;

      const percent = jobs.length > 0 ? (count / jobs.length) * 100 : 0;

      return {
        name: category.name,
        count,
        percent,
      };
    });

    const recentApplicationData = applications
      .sort((a, b) => b.appliedAt - a.appliedAt)
      .slice(0, 5)
      .map((application) => {
        const user = users.find((u) => u.uid === application.userId);

        const job = jobs.find((j) => j.id === application.jobId);

        return {
          ...application,
          userName: user ? user.name : "Unknown User",
          jobTitle: job ? job.title : "Unknown Job",
        };
      });

    setRecentApplications(recentApplicationData);

    setCategoryStats(stats);

    setTotalUsers(users.length);
    setTotalJobs(jobs.length);
    setTotalCategories(categories.length);
    setTotalApplications(applications.length);

    const pendingApplications = applications.filter(
      (item) => item.applicationStatus === "Pending",
    );

    const shortlistedApplications = applications.filter(
      (item) => item.applicationStatus === "Shortlisted",
    );

    const selectedApplications = applications.filter(
      (item) => item.applicationStatus === "Selected",
    );

    const rejectedApplications = applications.filter(
      (item) => item.applicationStatus === "Rejected",
    );

    setPending(pendingApplications.length);
    setShortlisted(shortlistedApplications.length);
    setSelected(selectedApplications.length);
    setRejected(rejectedApplications.length);

    const sortedApplications = [...applications].sort(
      (a, b) => b.appliedAt - a.appliedAt,
    );

    setRecentApplications(sortedApplications.slice(0, 5));

    const sortedJobs = [...jobs].sort((a, b) => b.createdAt - a.createdAt);

    setRecentJobs(sortedJobs.slice(0, 5));
  };

  const pendingPercent =
    totalApplications > 0 ? Math.round((pending / totalApplications) * 100) : 0;

  const shortlistedPercent =
    totalApplications > 0
      ? Math.round((shortlisted / totalApplications) * 100)
      : 0;

  const selectedPercent =
    totalApplications > 0
      ? Math.round((selected / totalApplications) * 100)
      : 0;

  const rejectedPercent =
    totalApplications > 0
      ? Math.round((rejected / totalApplications) * 100)
      : 0;

  const StatusBar = ({ title, count, percent, color }) => (
    <div style={{ marginBottom: "22px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            fontWeight: "600",
            color: "#555",
          }}
        >
          {title}
        </span>

        <span
          style={{
            fontWeight: "700",
            color,
          }}
        >
          {count}
        </span>
      </div>

      <div
        style={{
          height: "9px",
          background: "#eceff3",
          borderRadius: "50px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            background: color,
            height: "100%",
            borderRadius: "50px",
            transition: ".5s",
          }}
        />
      </div>
    </div>
  );

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
              <h1 className="text-white font-weight-bold">
                {" "}
                Welcome to Admin Dashboard
              </h1>
              <div className="custom-breadcrumbs">
                <a href="">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Dashboard</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid px-3 px-md-4">
        <h2
          style={{
            fontWeight: "700",
            color: "#2c3e50",
            marginBottom: "30px",
            marginTop: "30px",
          }}
        >
          Dashboard
        </h2>
      </div>

      <div className="row mx-0">
        <div className="col-12 col-sm-6 col-lg-3 mb-4">
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "30px",
              boxShadow:
                "0 8px 25px rgba(0,0,0,.08), -3px 0 15px rgba(0,211,99,.15)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",

              // Green left accent
              borderLeft: "6px solid #00d363",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "18px",
                right: "20px",
                fontSize: "38px",
                opacity: "0.15",
              }}
            >
              👤
            </div>

            <h1
              style={{
                color: "#00d363",
                fontWeight: "700",
                fontSize: "42px",
                marginBottom: "8px",
              }}
            >
              {totalUsers}
            </h1>

            <p
              style={{
                color: "#666",
                fontWeight: "600",
                marginBottom: 0,
                fontSize: "15px",
              }}
            >
              Total Users
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3 mb-4">
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "30px",
              boxShadow:
                "0 8px 25px rgba(0,0,0,.08), -3px 0 15px rgba(0,211,99,.15)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",

              // Green left accent
              borderLeft: "6px solid #00d363",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "18px",
                right: "20px",
                fontSize: "38px",
                opacity: "0.12",
              }}
            >
              💼
            </div>

            <h1
              style={{
                color: "#00d363",
                fontWeight: "700",
                fontSize: "42px",
                marginBottom: "8px",
              }}
            >
              {totalJobs}
            </h1>

            <p
              style={{
                color: "#666",
                fontWeight: "600",
                marginBottom: 0,
                fontSize: "15px",
              }}
            >
              Total Jobs
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3 mb-4">
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "30px",
              boxShadow:
                "0 8px 25px rgba(0,0,0,.08), -3px 0 15px rgba(0,211,99,.15)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",

              // Green left accent
              borderLeft: "6px solid #00d363",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "18px",
                right: "20px",
                fontSize: "38px",
                opacity: "0.15",
              }}
            >
              📂
            </div>

            <h1
              style={{
                color: "#00d363",
                fontWeight: "700",
                fontSize: "42px",
                marginBottom: "8px",
              }}
            >
              {totalCategories}
            </h1>

            <p
              style={{
                color: "#666",
                fontWeight: "600",
                marginBottom: 0,
                fontSize: "15px",
              }}
            >
              Total Categories
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3 mb-4">
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "30px",
              boxShadow:
                "0 8px 25px rgba(0,0,0,.08), -3px 0 15px rgba(0,211,99,.15)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",

              // Green left accent
              borderLeft: "6px solid #00d363",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "18px",
                right: "20px",
                fontSize: "38px",
                opacity: "0.15",
              }}
            >
              📄
            </div>

            <h1
              style={{
                color: "#00d363",
                fontWeight: "700",
                fontSize: "42px",
                marginBottom: "8px",
              }}
            >
              {totalApplications}
            </h1>

            <p
              style={{
                color: "#666",
                fontWeight: "600",
                marginBottom: 0,
                fontSize: "15px",
              }}
            >
              Total Applications
            </p>
          </div>
        </div>
      </div>
      {/* ================= APPLICATION STATUS ================= */}
      {/* ================= APPLICATION STATUS ================= */}
      <div className="row mt-4 mx-0">
        <div className="col-12">
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "28px 32px",
              boxShadow: "0 5px 18px rgba(0,0,0,.08)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "25px",
              }}
            >
              <span style={{ fontSize: "26px" }}>📊</span>

              <h4
                style={{
                  fontWeight: "700",
                  margin: 0,
                  color: "#2c3e50",
                }}
              >
                Application Status
              </h4>
            </div>

            {/* Status Cards */}
            <div className="row g-3">
              {/* Pending */}
              <div className="col-12 col-sm-6 col-lg-3 mb-3">
                <div
                  style={{
                    background: "#fffaf0",
                    border: "1px solid #ffe8ad",
                    borderRadius: "14px",
                    padding: "18px 20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#2c3e50",
                      }}
                    >
                      Pending
                    </span>

                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#ffc107",
                      }}
                    >
                      {pending}
                    </span>
                  </div>

                  <div
                    style={{
                      height: "6px",
                      background: "#f1f1f1",
                      borderRadius: "10px",
                      marginTop: "14px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${pendingPercent}%`,
                        height: "100%",
                        background: "#ffc107",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Shortlisted */}
              <div className="col-12 col-sm-6 col-lg-3 mb-3">
                <div
                  style={{
                    background: "#f0fbff",
                    border: "1px solid #bdeffc",
                    borderRadius: "14px",
                    padding: "18px 20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#2c3e50",
                      }}
                    >
                      Shortlisted
                    </span>

                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#0dcaf0",
                      }}
                    >
                      {shortlisted}
                    </span>
                  </div>

                  <div
                    style={{
                      height: "6px",
                      background: "#f1f1f1",
                      borderRadius: "10px",
                      marginTop: "14px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${shortlistedPercent}%`,
                        height: "100%",
                        background: "#0dcaf0",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Selected */}
              <div className="col-12 col-sm-6 col-lg-3 mb-3">
                <div
                  style={{
                    background: "#f0fff7",
                    border: "1px solid #b9f2d2",
                    borderRadius: "14px",
                    padding: "18px 20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#2c3e50",
                      }}
                    >
                      Selected
                    </span>

                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#00d363",
                      }}
                    >
                      {selected}
                    </span>
                  </div>

                  <div
                    style={{
                      height: "6px",
                      background: "#f1f1f1",
                      borderRadius: "10px",
                      marginTop: "14px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${selectedPercent}%`,
                        height: "100%",
                        background: "#00d363",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Rejected */}
              <div className="col-12 col-sm-6 col-lg-3 mb-3">
                <div
                  style={{
                    background: "#fff5f5",
                    border: "1px solid #ffcaca",
                    borderRadius: "14px",
                    padding: "18px 20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#2c3e50",
                      }}
                    >
                      Rejected
                    </span>

                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#dc3545",
                      }}
                    >
                      {rejected}
                    </span>
                  </div>

                  <div
                    style={{
                      height: "6px",
                      background: "#f1f1f1",
                      borderRadius: "10px",
                      marginTop: "14px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${rejectedPercent}%`,
                        height: "100%",
                        background: "#dc3545",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= JOBS BY CATEGORY ================= */}
      <div className="row mt-4 mx-0">
        <div className="col-12">
          <div
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "24px",
              boxShadow: "0 8px 25px rgba(0,0,0,.08)",
            }}
          >
            <h4
              style={{
                fontWeight: "700",
                marginBottom: "25px",
                color: "#2c3e50",
              }}
            >
              📂 Jobs by Category
            </h4>

            <div className="row">
              {categoryStats.map((item) => (
                <div
                  key={item.name}
                  className="col-lg-6"
                  style={{ marginBottom: "24px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                      fontWeight: "600",
                      color: "#2c3e50",
                      fontSize: "18px",
                    }}
                  >
                    <span>{item.name}</span>

                    <span
                      style={{
                        color: "#00d363",
                        fontWeight: "700",
                      }}
                    >
                      {item.count}
                    </span>
                  </div>

                  <div
                    style={{
                      height: "10px",
                      background: "#edf0f2",
                      borderRadius: "30px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${item.percent}%`,
                        height: "100%",
                        background: "#00d363",
                        borderRadius: "30px",
                        transition: ".5s",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4 mx-0 align-items-stretch">
        {/* Portal Overview */}
        <div className="col-12 col-lg-6 mb-4">
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "25px",
              boxShadow: "0 5px 20px rgba(0,0,0,.08)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4
              style={{
                fontWeight: "700",
                marginBottom: "20px",
                color: "#2c3e50",
              }}
            >
              📊 Portal Overview
            </h4>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
                flex: 1,
              }}
            >
              {/* Active Jobs */}
              <div
                style={{
                  background: "#f8f9fa",
                  borderRadius: "14px",
                  padding: "20px 14px",
                  textAlign: "center",
                  boxShadow: "0 3px 10px rgba(0,0,0,.05)",
                  border: "1px solid #e9ecef",
                  minHeight: "145px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,.12)";
                  e.currentTarget.style.background = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 3px 10px rgba(0,0,0,.05)";
                  e.currentTarget.style.background = "#f8f9fa";
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "8px" }}>💼</div>

                <h2
                  style={{
                    color: "#00d363",
                    fontWeight: "700",
                    margin: "0 0 4px",
                    fontSize: "28px",
                  }}
                >
                  {totalJobs}
                </h2>

                <p
                  style={{
                    color: "#666",
                    fontWeight: "600",
                    margin: 0,
                    fontSize: "14px",
                  }}
                >
                  Active Jobs
                </p>
              </div>

              {/* Pending */}
              <div
                style={{
                  background: "#f8f9fa",
                  borderRadius: "14px",
                  padding: "20px 14px",
                  textAlign: "center",
                  boxShadow: "0 3px 10px rgba(0,0,0,.05)",
                  border: "1px solid #e9ecef",
                  minHeight: "145px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,.12)";
                  e.currentTarget.style.background = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 3px 10px rgba(0,0,0,.05)";
                  e.currentTarget.style.background = "#f8f9fa";
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "8px" }}>📄</div>

                <h2
                  style={{
                    color: "#ffc107",
                    fontWeight: "700",
                    margin: "0 0 4px",
                    fontSize: "28px",
                  }}
                >
                  {pending}
                </h2>

                <p
                  style={{
                    color: "#666",
                    fontWeight: "600",
                    margin: 0,
                    fontSize: "14px",
                  }}
                >
                  Pending Applications
                </p>
              </div>

              {/* Categories */}
              <div
                style={{
                  background: "#f8f9fa",
                  borderRadius: "14px",
                  padding: "20px 14px",
                  textAlign: "center",
                  boxShadow: "0 3px 10px rgba(0,0,0,.05)",
                  border: "1px solid #e9ecef",
                  minHeight: "145px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,.12)";
                  e.currentTarget.style.background = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 3px 10px rgba(0,0,0,.05)";
                  e.currentTarget.style.background = "#f8f9fa";
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "8px" }}>📂</div>

                <h2
                  style={{
                    color: "#00d363",
                    fontWeight: "700",
                    margin: "0 0 4px",
                    fontSize: "28px",
                  }}
                >
                  {totalCategories}
                </h2>

                <p
                  style={{
                    color: "#666",
                    fontWeight: "600",
                    margin: 0,
                    fontSize: "14px",
                  }}
                >
                  Categories
                </p>
              </div>

              {/* Users */}
              <div
                style={{
                  background: "#f8f9fa",
                  borderRadius: "14px",
                  padding: "20px 14px",
                  textAlign: "center",
                  boxShadow: "0 3px 10px rgba(0,0,0,.05)",
                  border: "1px solid #e9ecef",
                  minHeight: "145px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,.12)";
                  e.currentTarget.style.background = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 3px 10px rgba(0,0,0,.05)";
                  e.currentTarget.style.background = "#f8f9fa";
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "8px" }}>👤</div>

                <h2
                  style={{
                    color: "#00d363",
                    fontWeight: "700",
                    margin: "0 0 4px",
                    fontSize: "28px",
                  }}
                >
                  {totalUsers}
                </h2>

                <p
                  style={{
                    color: "#666",
                    fontWeight: "600",
                    margin: 0,
                    fontSize: "14px",
                  }}
                >
                  Registered Users
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-12 col-lg-6 mb-4">
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "25px",
              boxShadow: "0 5px 20px rgba(0,0,0,.08)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4
              style={{
                fontWeight: "700",
                marginBottom: "20px",
                color: "#2c3e50",
              }}
            >
              ⚡ Quick Actions
            </h4>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
                flex: 1,
              }}
            >
              {/* Manage Jobs */}
              <Link to="/admin/managejobs" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "14px",
                    padding: "20px 14px",
                    textAlign: "center",
                    border: "1px solid #e9ecef",
                    minHeight: "145px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.3s",
                    cursor: "pointer",
                    boxShadow: "0 3px 10px rgba(0,0,0,.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0,0,0,.12)";
                    e.currentTarget.style.background = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 3px 10px rgba(0,0,0,.05)";
                    e.currentTarget.style.background = "#f8f9fa";
                  }}
                >
                  <div style={{ fontSize: "38px", marginBottom: "8px" }}>
                    💼
                  </div>

                  <h6
                    style={{
                      color: "#2c3e50",
                      fontWeight: "600",
                      marginBottom: "4px",
                      fontSize: "16px",
                    }}
                  >
                    Manage Jobs
                  </h6>

                  <small style={{ color: "#888" }}>Add & Edit Jobs</small>
                </div>
              </Link>

              {/* Manage Categories */}
              <Link
                to="/admin/managecategories"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "14px",
                    padding: "20px 14px",
                    textAlign: "center",
                    border: "1px solid #e9ecef",
                    minHeight: "145px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.3s",
                    cursor: "pointer",
                    boxShadow: "0 3px 10px rgba(0,0,0,.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0,0,0,.12)";
                    e.currentTarget.style.background = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 3px 10px rgba(0,0,0,.05)";
                    e.currentTarget.style.background = "#f8f9fa";
                  }}
                >
                  <div style={{ fontSize: "38px", marginBottom: "8px" }}>
                    📂
                  </div>

                  <h6
                    style={{
                      color: "#2c3e50",
                      fontWeight: "600",
                      marginBottom: "4px",
                      fontSize: "16px",
                    }}
                  >
                    Manage Categories
                  </h6>

                  <small style={{ color: "#888" }}>
                    Add & Edit Categories
                  </small>
                </div>
              </Link>

              {/* View Applications */}
              <Link
                to="/admin/viewapplications"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "14px",
                    padding: "20px 14px",
                    textAlign: "center",
                    border: "1px solid #e9ecef",
                    minHeight: "145px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.3s",
                    cursor: "pointer",
                    boxShadow: "0 3px 10px rgba(0,0,0,.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0,0,0,.12)";
                    e.currentTarget.style.background = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 3px 10px rgba(0,0,0,.05)";
                    e.currentTarget.style.background = "#f8f9fa";
                  }}
                >
                  <div style={{ fontSize: "38px", marginBottom: "8px" }}>
                    📄
                  </div>

                  <h6
                    style={{
                      color: "#2c3e50",
                      fontWeight: "600",
                      marginBottom: "4px",
                      fontSize: "16px",
                    }}
                  >
                    View Applications
                  </h6>

                  <small style={{ color: "#888" }}>Check Applications</small>
                </div>
              </Link>

              {/* Manage Users */}
              <Link
                to="/admin/managejobseeker"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "14px",
                    padding: "20px 14px",
                    textAlign: "center",
                    border: "1px solid #e9ecef",
                    minHeight: "145px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.3s",
                    cursor: "pointer",
                    boxShadow: "0 3px 10px rgba(0,0,0,.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0,0,0,.12)";
                    e.currentTarget.style.background = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 3px 10px rgba(0,0,0,.05)";
                    e.currentTarget.style.background = "#f8f9fa";
                  }}
                >
                  <div style={{ fontSize: "38px", marginBottom: "8px" }}>
                    👤
                  </div>

                  <h6
                    style={{
                      color: "#2c3e50",
                      fontWeight: "600",
                      marginBottom: "4px",
                      fontSize: "16px",
                    }}
                  >
                    Manage Users
                  </h6>

                  <small style={{ color: "#888" }}>View & Update Users</small>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
