import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactUs.css";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Header from '../Header/Header.jsx'
import Footer from "../Footer/Footer.jsx";



const ContactUs = () => {

  const [name,setName]= useState();
const [email,setEmail]= useState();
const [message,setPassword]= useState();
const navigate= useNavigate()

const handleSubmit= (e) =>{
  e.preventDefault()

  if (!name || !email || !message) {
    toast.error("Please fill out all fields.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return;
  }
  

  axios.post('http://localhost:3001/auth/contactus',{name,email,message})
  .then(Response=>{
    console.log(Response)

    if(Response.data.status)
    {
      const i=3500;
      toast.success("Message Sended successfully",{
        position: "top-center",
        theme: "dark",
        autoClose: i,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigate('/contactus');
      }, i);
    }
  })
  .catch(err=>console.log(err))
}

  return (
    <>
     <ToastContainer />
     <Header/>
      <div className="contact-bg">
        <div className="contact-container">
          <h1>Contact Us</h1>
          <p className="contact-text">
            We’d love to hear from you! Reach out to us for any queries, feedback, or support.
            Our team is ready to assist you.
          </p>

          <div className="contact-details">
            <p><span className="fw-semibold">Email:</span> support@intellclass.com</p>
            <p><span className="fw-semibold">Phone:</span> +91 9898215573</p>
            <p><span className="fw-semibold">Address:</span> Navsari, Gujarat</p>
          </div>

          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <input type="text" placeholder="Your Name" required onChange={(e)=>setName(e.target.value)} />
            <input type="email" placeholder="Your Email" required onChange={(e)=>setEmail(e.target.value)}/>
            <textarea placeholder="Your Message" rows="5" required onChange={(e)=>setPassword(e.target.value)}></textarea>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ContactUs;