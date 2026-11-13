import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../Services/UserService";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  async function submit(e) {
    try {
      e.preventDefault();
      setLoading(true);

      let payload = {
        email,
        password,
      };

      let res = await UserService.login(payload);

      toast.success("Login Successful");

      if (res.userType === "admin") {
        nav("/admin");
      } else {
        nav("/");
      }
    } catch (error) {
      toast.error(error.message);
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section
        className="section-hero overlay inner-page bg-image"
        style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
        id="home-section"
      ></section>

      <section
        className="site-section d-flex align-items-center auth-hero-section"
        style={{
          minHeight: "calc(100vh - 120px)",
          background: "#f8fafc",
          padding: "40px 0",
        }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            {/* Left Side: Form */}
            <div className="col-12 col-md-10 col-lg-6 mb-4 mb-lg-0">
              <div
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  margin: "0 auto",
                }}
              >
                <h1
                  style={{
                    fontWeight: "800",
                    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                    marginBottom: "12px",
                    lineHeight: 1.25,
                  }}
                >
                  Welcome Back to <span style={{ color: "#8bc400" }}>JobSphere</span>
                </h1>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "clamp(15px, 2vw, 17px)",
                    marginBottom: "28px",
                  }}
                >
                  Login to continue your job search journey and explore new opportunities.
                </p>

                <form
                  onSubmit={submit}
                  className="auth-form-card"
                  style={{
                    background: "#ffffff",
                    padding: "clamp(20px, 4vw, 35px)",
                    borderRadius: "20px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                    border: "1px solid #edf2f7",
                  }}
                >
                  <div className="form-group mb-4">
                    <label
                      style={{
                        fontWeight: "600",
                        marginBottom: "8px",
                        fontSize: "14px",
                        color: "#334155",
                      }}
                    >
                      Email Address
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        height: "50px",
                        borderRadius: "10px",
                        fontSize: "15px",
                      }}
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label
                      style={{
                        fontWeight: "600",
                        marginBottom: "8px",
                        fontSize: "14px",
                        color: "#334155",
                      }}
                    >
                      Password
                    </label>

                    <div style={{ position: "relative" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          height: "50px",
                          borderRadius: "10px",
                          fontSize: "15px",
                          paddingRight: "46px",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          padding: "6px",
                          color: "#64748b",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                    style={{
                      height: "50px",
                      borderRadius: "10px",
                      fontSize: "16px",
                      fontWeight: "600",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>

                  <div
                    style={{
                      marginTop: "20px",
                      textAlign: "center",
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    Don't have an account?
                    <span
                      onClick={() => nav("/register")}
                      style={{
                        color: "#8bc400",
                        cursor: "pointer",
                        fontWeight: "700",
                        marginLeft: "6px",
                      }}
                    >
                      Register here
                    </span>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side: Responsive Illustration */}
            <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
              <img
                src="/images/login.png"
                alt="Login Illustration"
                style={{
                  maxWidth: "480px",
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
