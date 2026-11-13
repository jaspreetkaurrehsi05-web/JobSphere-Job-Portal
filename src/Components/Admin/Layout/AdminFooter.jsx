export default function AdminFooter() {
  return (
    <footer
      style={{
        backgroundColor: "#7F7F7F", // Same grey as template
        color: "#fff",
        padding: "30px 0",
        marginTop: "50px",
        borderTop: "3px solid rgba(255,255,255,0.15)",
      }}
    >
      <div className="container text-center">
        <h4
          style={{
            fontWeight: "700",
            marginBottom: "12px",
            color: "#fff",
          }}
        >
          JobSphere Admin Panel
        </h4>

        <p
          style={{
            marginBottom: "10px",
            fontSize: "16px",
            color: "#d6d6d6",
          }}
        >
          Manage Users • Manage Jobs • Manage Categories • Applications
        </p>

        <small
          style={{
            fontSize: "14px",
            color: "#bdbdbd",
          }}
        >
          © 2026 JobSphere | Version 1.0
        </small>
      </div>
    </footer>
  );
}