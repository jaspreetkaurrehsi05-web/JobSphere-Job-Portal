import { useEffect, useState } from "react";
import ContactService from "../../../Services/ContactService";
import Swal from "sweetalert2";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  async function getMessages() {
    try {
      let res = await ContactService.all();

      setMessages(res);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMessage(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "Message will be deleted",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await ContactService.delete(id);

        Swal.fire("Deleted!", "Message removed", "success");

        getMessages();
      }
    });
  }

  async function markRead(id) {
    await ContactService.update(id, {
      status: "Read",
    });

    getMessages();
  }

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
              <h1 className="text-white font-weight-bold">Contact Messages</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Messages</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5">
        <div
          className="table-responsive"
          style={{
            overflowX: "auto",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            backgroundColor: "#fff",
          }}
        >
          <table
            className="table table-hover align-middle mb-0"
            style={{
              minWidth: "1100px",
            }}
          >
            <thead
              style={{
                backgroundColor: "#f8f9fa",
              }}
            >
              <tr>
                <th style={{ padding: "15px" }}>#</th>
                <th style={{ padding: "15px" }}>Name</th>
                <th style={{ padding: "15px" }}>Email</th>
                <th style={{ padding: "15px" }}>Subject</th>
                <th style={{ padding: "15px" }}>Message</th>
                <th style={{ padding: "15px" }}>Status</th>
                <th style={{ padding: "15px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ padding: "15px" }}>{index + 1}</td>

                  <td style={{ padding: "15px", fontWeight: "600" }}>
                    {item.name}
                  </td>

                  <td style={{ padding: "15px" }}>{item.email}</td>

                  <td
                    style={{
                      padding: "15px",
                      minWidth: "180px",
                    }}
                  >
                    {item.subject}
                  </td>

                  <td
                    style={{
                      padding: "15px",
                      minWidth: "300px",
                      maxWidth: "350px",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.message}
                  </td>

                  <td style={{ padding: "15px" }}>
                    <span
                      style={{
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        backgroundColor:
                          item.status === "Unread" ? "#ffe5e5" : "#e5f8e9",
                        color: item.status === "Unread" ? "#dc3545" : "#198754",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td
                    style={{
                      padding: "15px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.status === "Unread" && (
                      <button
                        className="btn btn-sm btn-success mx-2"
                        onClick={() => markRead(item.id)}
                      >
                        Mark Read
                      </button>
                    )}

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteMessage(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
