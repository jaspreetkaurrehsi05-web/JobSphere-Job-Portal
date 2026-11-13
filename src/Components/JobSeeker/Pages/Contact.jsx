import { useState } from "react";
import ContactService from "../../../Services/ContactService";
import { toast } from "react-toastify";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      let data = {
        name: name,
        email: email,
        subject: subject,
        message: message,
      };

      await ContactService.add(data);

      toast.success("Message Sent Successfully");

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
              <h1 className="text-white font-weight-bold">Contact Us</h1>
              <div className="custom-breadcrumbs">
                <a href="#">Home</a> <span className="mx-2 slash">/</span>
                <span className="text-white">
                  <strong>Contact Us</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="site-section" id="next-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <form onSubmit={submit}>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="text-black">Name</label>

                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="text-black" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="text-black" htmlFor="subject">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="text-black" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      rows="7"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-md text-white"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
           <div className="col-lg-4 ml-auto">
  <div className="p-4 border rounded shadow-sm bg-light">
    <h3 className="mb-4 font-weight-bold">Need Help?</h3>

    <p className="text-muted">
      Our support team is here to assist you.
    </p>

    <ul className="list-unstyled mt-4">
      <li className="mb-3">
        <i className="bi bi-person-plus-fill text-primary mr-2"></i>
        Trouble creating an account?
      </li>

      <li className="mb-3">
        <i className="bi bi-briefcase-fill text-primary mr-2"></i>
        Unable to apply for a job?
      </li>

      <li className="mb-3">
        <i className="bi bi-file-earmark-arrow-up-fill text-primary mr-2"></i>
        Resume upload issues?
      </li>

      <li className="mb-3">
        <i className="bi bi-person-lines-fill text-primary mr-2"></i>
        Problems updating your profile?
      </li>

      <li className="mb-0">
        <i className="bi bi-chat-dots-fill text-primary mr-2"></i>
        Questions about your application status?
      </li>
    </ul>

    <hr />

    <div className="mt-3">
      <h5 className="font-weight-bold mb-2">Support Hours</h5>
      <p className="mb-1">Monday – Friday</p>
      <p className="mb-0">9:00 AM – 6:00 PM</p>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>
   
    </>
  );
}
