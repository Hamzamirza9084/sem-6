import React, { useEffect, useState } from "react";
import Land from "../Land/Land";
import { useNavigate } from "react-router-dom";
import "../Land/LandingPage.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { PiGraphLight } from "react-icons/pi";
import Headerf from "../Header/Headerf";
import axios from "axios";

function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3001/auth/faculty/verify")
        .then(res => {
            if (res.data.status) {
                setUser(res.data.email);
            } else {
                navigate('/');  
            }
        })
        .catch(err => {
            console.error("Error verifying user:", err);
            navigate('/');  
        })
        .finally(() => setLoading(false));
}, [navigate]);


  return (
    <>
      <Headerf/>

 
      <div className="land-container">
        <Land />
      </div>

      <div className="content-wrapper">
        <Container className="hero-content text-center text-light">
          <h1 className="fw-bold">Welcome Back {user} </h1>
          <p className="fs-4">To</p>
          <p className="fs-4">Smart, Secure, and Efficient Classroom Management</p>
          <Button variant="success" size="lg" onClick={() => navigate("/dashboardf")}>
            <PiGraphLight className="me-2" /> Manage Attendance
          </Button>
        </Container>

      </div>
    </>
  );
}

export default Home;
