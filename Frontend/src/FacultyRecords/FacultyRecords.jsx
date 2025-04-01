import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaUserTie } from "react-icons/fa";
import gsap from "gsap";
import "./FacultyRecords.css";
import Headerh from "../Header/Headerh";
import { useDarkMode } from "../Header/DarkModeContext.jsx";

const FacultyRecords = () => {
  const { isDark } = useDarkMode();
  const [facultyData, setFacultyData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [weekFilter, setWeekFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/faculty/fetchAll");
        setFacultyData(response.data.data);
        setFilteredData(response.data.data);
      } catch (err) {
        setError("Error fetching faculty data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        
        y: 30,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      });
    }
  }, [filteredData]);

  useEffect(() => {
    let filtered = { ...facultyData };
    
    if (searchTerm) {
      Object.keys(filtered).forEach((key) => {
        filtered[key] = filtered[key].filter((record) =>
          record.Subject.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    if (monthFilter) {
      Object.keys(filtered).forEach((key) => {
        filtered[key] = filtered[key].filter((record) =>
          new Date(record.Timestamp).getMonth() + 1 === parseInt(monthFilter)
        );
      });
    }

    if (weekFilter) {
      const currentDate = new Date();
      const currentWeek = Math.ceil(currentDate.getDate() / 7);
      Object.keys(filtered).forEach((key) => {
        filtered[key] = filtered[key].filter((record) => {
          const recordDate = new Date(record.Timestamp);
          return Math.ceil(recordDate.getDate() / 7) === parseInt(weekFilter);
        });
      });
    }

    if (timeFilter) {
      Object.keys(filtered).forEach((key) => {
        filtered[key] = filtered[key].filter((record) => {
          const recordTime = new Date(record.Timestamp).getHours();
          return parseInt(timeFilter) === recordTime;
        });
      });
    }

    setFilteredData(filtered);
  }, [searchTerm, monthFilter, weekFilter, timeFilter, facultyData]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <>
    <Headerh/>
    <div className="pr" data-theme={isDark ? "dark" : "light"}>
    <div ref={containerRef} className="faculty-container" >
      <h2 className="faculty-title">Faculty Records</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setMonthFilter(e.target.value)}>
          <option value="">Filter by Month</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{`Month ${i + 1}`}</option>
          ))}
        </select>
        <select onChange={(e) => setWeekFilter(e.target.value)}>
          <option value="">Filter by Week</option>
          {[...Array(5)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{`Week ${i + 1}`}</option>
          ))}
        </select>
        <select onChange={(e) => setTimeFilter(e.target.value)}>
          <option value="">Filter by Time</option>
          {[...Array(24)].map((_, i) => (
            <option key={i} value={i}>{`${i}:00`}</option>
          ))}
        </select>
      </div>
      {Object.keys(filteredData).length === 0 ? (
        <p className="no-data">No faculty data available</p>
      ) : (
        Object.keys(filteredData).map((linkid) => (
          <div key={linkid} className="faculty-card">
            <h3 className="faculty-id">
              <FaUserTie className="faculty-icon" /> Faculty ID: {linkid}
            </h3>
            {Array.isArray(filteredData[linkid]) && filteredData[linkid].length > 0 ? (
              <table className="faculty-table">
                <thead>
                  <tr>
                    <th>UID</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Year</th>
                    <th>Division</th>
                    <th>RollNo</th>
                    <th>Subject</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData[linkid].map((record, index) => (
                    <tr key={index}>
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
            ) : (
              <p className="no-records">No records found</p>
            )}
          </div>
        ))
      )}
    
    </div>
    </div>
    </>
  );
};

export default FacultyRecords;
