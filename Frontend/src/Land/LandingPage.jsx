import React from "react";
import Header from "../Header/Header";
import Land from "./Land";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BiUser, BiPhone, BiShield, BiBell, BiCodeBlock, BiChip, BiRocket } from "react-icons/bi"; 
import { useDarkMode } from "../Header/DarkModeContext.jsx";

function LandingPage() {
  const navigate = useNavigate();
  const { isDark } = useDarkMode();

  return (
    <>
      <Header />

 
      <div className="land-container" data-theme={isDark ? "dark" : "light"}>
        <Land />
      </div>

      <div className="content-wrapper" data-theme={isDark ? "dark" : "light"}>
        <Container className="hero-content text-center text-light">
          <h1 className="fw-bold">Welcome to IntellClass System</h1>
          <p className="fs-4">Smart, Secure, and Efficient Classroom Management</p>
          <Button variant="success" size="lg" onClick={() => navigate("/about")}>
            <BiUser className="me-2" /> Learn More
          </Button>
        </Container>

        <Container className="features-container text-center my-5">
          <h2 className="fw-bold">Why Choose IntellClass?</h2>
          <Row className="mt-4">
            <Col md={6} lg={3} className="p-3">
              <BiUser className="fs-1 text-success" />
              <p className="mt-2">AI-Powered Face Recognition</p>
            </Col>
            <Col md={6} lg={3} className="p-3">
              <BiPhone className="fs-1 text-primary" />
              <p className="mt-2">Remote Access via Web & Mobile</p>
            </Col>
            <Col md={6} lg={3} className="p-3">
              <BiShield className="fs-1 text-danger" />
              <p className="mt-2">Motion Sensors & Phone Detection</p>
            </Col>
            <Col md={6} lg={3} className="p-3">
              <BiBell className="fs-1 text-warning" />
              <p className="mt-2">Real-Time Alerts for Safety</p>
            </Col>
          </Row>
        </Container>

        <Container className="tech-container text-center my-5">
          <h2 className="fw-bold">Technology Stack</h2>
          <p><strong>Hardware:</strong> <BiChip /> Raspberry Pi, Webcam, Fire & Noise Sensors.</p>
          <p><strong>Software:</strong> <BiCodeBlock /> Python, React, Node, Express , MongoDb, Flutter (Mobile App).</p>
        </Container>

        <Container className="cta-container text-center my-5">
          <h2 className="fw-bold">Join the Future of Smart Classrooms!</h2>
          <Button variant="primary" size="lg" onClick={() => navigate("/contact")}>
            <BiRocket className="me-2" /> Get Started
          </Button>
        </Container>
      </div>
    </>
  );
}

export default LandingPage;
