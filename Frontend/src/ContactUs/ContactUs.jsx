import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactUs.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { useDarkMode } from "../Header/DarkModeContext.jsx";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { isDark } = useDarkMode();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill out all fields.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    axios.post("http://localhost:3001/auth/contactus", { name, email, message })
      .then((response) => {
        if (response.data.status) {
          toast.success("Message Sent Successfully", {
            position: "top-center",
            autoClose: 3500,
          });
          setTimeout(() => navigate("/contactus"), 3500);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="contact-bg" data-theme={isDark ? "dark" : "light"}>
        <div className="contact-container">
          <h1>Contact Us</h1>
          <p className="contact-text">
            We'd love to hear from you! Reach out to us for any queries, feedback, or support.
          </p>
          <div className="contact-details">
            <p><strong>Email:</strong> support@intellclass.com</p>
            <p><strong>Phone:</strong> +91 9898215573</p>
            <p><strong>Address:</strong> Navsari, Gujarat</p>
          </div>
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <input type="text" placeholder="Your Name" required onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Your Email" required onChange={(e) => setEmail(e.target.value)} />
            <textarea placeholder="Your Message" rows="5" required onChange={(e) => setMessage(e.target.value)}></textarea>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
