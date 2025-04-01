import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import gsap from "gsap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FacultyDashboard.css";
import Headerh from "../Header/Headerh.jsx";
import Footer from '../Footer/Footer.jsx'
import { useDarkMode } from "../Header/DarkModeContext.jsx";

const FacultyDashboardh = () => {
  const { isDark } = useDarkMode();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [time, setTime] = useState("");

  const tableRef = useRef(null);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/hod/fetchByLinkId", {
          method: "GET",
          credentials: "include",
        });

        const result = await response.json();

        if (!result.status) {
          setError(result.message);
          setData([]);
        } else {
          setData(result.data);
          setFilteredData(result.data);
        }
      } catch (err) {
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current.querySelectorAll("tbody tr"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    }
  }, [filteredData]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    filterData(query, month, week, time);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    filterData(search, e.target.value, week, time);
  };

  const handleWeekChange = (e) => {
    setWeek(e.target.value);
    filterData(search, month, e.target.value, time);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    filterData(search, month, week, e.target.value);
  };

  const filterData = (searchQuery, monthFilter, weekFilter, timeFilter) => {
    let filtered = data.filter((item) =>
      item.Subject.toLowerCase().includes(searchQuery) ||
      item.UID.toString().includes(searchQuery) ||
      item.Name.toLowerCase().includes(searchQuery) ||
      item.Course.toLowerCase().includes(searchQuery) ||
      item.Year.toString().includes(searchQuery) ||
      item.Division.toLowerCase().includes(searchQuery) ||
      item.RollNo.toString().includes(searchQuery)
    );

    if (monthFilter) {
      filtered = filtered.filter((item) => new Date(item.Timestamp).getMonth() + 1 === parseInt(monthFilter));
    }

    if (weekFilter) {
      filtered = filtered.filter((item) => {
        const weekNumber = Math.ceil(new Date(item.Timestamp).getDate() / 7);
        return weekNumber === parseInt(weekFilter);
      });
    }

    if (timeFilter) {
      filtered = filtered.filter((item) => new Date(item.Timestamp).getHours() === parseInt(timeFilter));
    }

    setFilteredData(filtered);
  };

  return (
    <>
    <Headerh/>
    <div className="faculty-container" data-theme={isDark ? "dark" : "light"}>
      <h2 className="faculty-header">Faculty Dashboard</h2>

      <div className="search-bar-container mb-4">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search... Subject" value={search} onChange={handleSearch} className="search-input" />
        </div>
        <select onChange={handleMonthChange} value={month} className="filter-select">
          <option value="">Select Month</option>
          {[...Array(12).keys()].map((m) => (
            <option key={m + 1} value={m + 1}>{`Month ${m + 1}`}</option>
          ))}
        </select>
        <select onChange={handleWeekChange} value={week} className="filter-select">
          <option value="">Select Week</option>
          {[...Array(4).keys()].map((w) => (
            <option key={w + 1} value={w + 1}>{`Week ${w + 1}`}</option>
          ))}
        </select>
        <select onChange={handleTimeChange} value={time} className="filter-select">
          <option value="">Select Time</option>
          {[...Array(24).keys()].map((t) => (
            <option key={t} value={t}>{`${t}:00`}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : filteredData.length > 0 ? (
        <table ref={tableRef} className="table-custom">
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
            {filteredData.map((item) => (
              <tr key={item._id}>
                <td>{item.UID}</td>
                <td>{item.Name}</td>
                <td>{item.Course}</td>
                <td>{item.Year}</td>
                <td>{item.Division}</td>
                <td>{item.RollNo}</td>
                <td>{item.Subject}</td>
                <td>{item.Timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-2">No data available</p>
      )}
    </div>
    <Footer/>
    </>
  );
};



export default FacultyDashboardh;