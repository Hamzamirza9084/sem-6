import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Aboutus.css";
import Headerr from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { useDarkMode } from "../Header/DarkModeContext.jsx";

const Aboutus = () => {
  const { isDark } = useDarkMode();
  return (
    <>
    <Headerr/>
    <div className="aboutus-bg" data-theme={isDark ? "dark" : "light"}>
      <div className="aboutus-container">
        <h1>About us</h1>
        <p className="aboutus-text">
          An innovative AI-powered attendance management system designed to enhance efficiency,
          security, and accuracy in educational institutions. Our platform integrates
          <span className="fw-semibold"> facial recognition, motion sensors, and real-time data processing </span>
           to revolutionize attendance tracking.
        </p>
        <p className="aboutus-text">
          <span className="fw-semibold">IntellClass</span> automates attendance marking for students and faculty,
          detects entry and exit times, and ensures accurate record-keeping. With real-time monitoring,
          institutions can effectively manage discipline, detect unauthorized activities, and streamline
          administrative processes.
        </p>
        <h2>Key Features</h2>
        <ul className="features-list">
          <li>• <span className="fw-semibold"> Face Recognition: </span> Automatically records attendance upon entry and exit.</li>
          <li>•<span className="fw-semibold">Remote Access: </span> Available via web and mobile apps for easy monitoring.</li>
          <li>•<span className="fw-semibold">Lecture-Wise Attendance: </span> Marks students absent if they leave mid-lecture.</li>
          <li>•<span className="fw-semibold">Motion Sensor: </span> Tracks student activities to maintain discipline.</li>
          <li>•<span className="fw-semibold">Phone Usage Detection: </span> Identifies unauthorized phone use and alerts the principal.</li>
          <li>•<span className="fw-semibold">Classroom Property Damage Detection: </span> Detects damage and logs responsible students.</li>
          <li>•<span className="fw-semibold">Long Absence Alerts: </span> Notifies professors and principals if a student is absent for 3-4 days.</li>
          <li>•<span className="fw-semibold">Attendance Reminder: </span> Announces the number of students present, differentiating boys and girls.</li>
          <li>•<span className="fw-semibold">Noise Detection Alerts: </span> Identifies excessive noise and broadcasts alerts via speakers.</li>
        </ul>
        <p className="aboutus-text">
          At <span className="fw-semibold">IntellClass</span>, we are committed to using technology to simplify classroom management
          and improve the educational experience. Join us in revolutionizing smart education with intelligent automation.
        </p>
        <button className="btn btn-primary mt-3">Learn More</button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Aboutus;
