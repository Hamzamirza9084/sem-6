import React, { useState, useRef } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { gsap } from "gsap";
import "./AttendanceFilter.css";
import  Headerf from '../Header/Headerf.jsx'
import Footer from '../Footer/Footer.jsx'
import { useDarkMode } from "../Header/DarkModeContext.jsx";

const AttendanceFilter = () => {
  const { isDark } = useDarkMode();
  const [UID, setUID] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [records, setRecords] = useState([]);

  const tableRef = useRef(null);

  const fetchAttendance = async () => {
    try {
      console.log("Fetching with:", { UID, date, startTime, endTime });

      const formattedStartTime = startTime ? `${startTime}:00` : "";
      const formattedEndTime = endTime ? `${endTime}:00` : "";

      const response = await axios.get("http://localhost:3001/auth/attendance", {
        params: { UID, date, startTime: formattedStartTime, endTime: formattedEndTime },
      });

      console.log("Received Data:", response.data);
      setRecords(response.data);

      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    } catch (error) {
      console.error("Error fetching attendance", error);
    }
  };

  return (
    <>
    <Headerf/>
    <div id="smain" data-theme={isDark ? "dark" : "light"}>
    <div className="attendance-container">
      <div className="search-bar">
        <input
          type="number"
          placeholder="UID"
          value={UID}
          onChange={(e) => setUID(e.target.value)}
        />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        {/* <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} /> */}
        <button className="search-btn" onClick={fetchAttendance}>
          <FaSearch /> Search
        </button>
      </div>

      {records.length > 0 && (
        <div className="table-container" ref={tableRef}>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>UID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Year</th>
                <th>Division</th>
                <th>Roll No</th>
                <th>Subject</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id}>
                  <td>{record.UID}</td>
                  <td>{record.Name}</td>
                  <td>{record.Course}</td>
                  <td>{record.Year}</td>
                  <td>{record.Division}</td>
                  <td>{record.RollNo}</td>
                  <td>{record.Subject}</td>
                  <td>{record.Timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      )}
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default AttendanceFilter;
