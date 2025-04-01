import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../Images/intellclasslogo.png";
import "./Header.css";
import { IoLogOutSharp } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { PiSecurityCamera } from "react-icons/pi";
import { useDarkMode } from "../Header/DarkModeContext.jsx";
import { Btn } from "../Btn/Btn";

function Headerh() {
    const { isDark, setIsDark } = useDarkMode();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const logout = () => {
        axios.get('http://localhost:3001/auth/logout')
            .then(res => {
                if (res.data.status) {
                    navigate('/login');
                }
            }).catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios.get("http://localhost:3001/auth/hod/verify")
            .then(res => {
                if (res.data.status) {
                    setUser(res.data.email);
                } else {
                    navigate('/login');  
                }
            })
            .catch(err => {
                console.error("Error verifying user:", err);
                navigate('/');  
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    return (
        <header id="head" data-theme={isDark ? "dark" : "light"}>
            <div id="landh5">
                <img id="logo" src={logo} alt="IntellClass Logo" />
                <h2>IntellClass</h2>
            </div>

            <nav>
                <ul>
                    <li><Link to="/homeh"><IoHome /> Home</Link></li>
                    <li><Link to="/hodf"><FaChalkboardTeacher /> Faculty</Link></li>
                    
                    <li><Link to="/s"><PiStudentFill />Student</Link></li>
                    <li><Link to="/starth"><PiSecurityCamera /> Start</Link></li>

                    <div className="dropdown">
                        <FaUser size="30px" className="user-icon" />
                        <div className="dropdown-content">
                        <button id="logout" onClick={logout}><IoLogOutSharp /> Logout</button>
                        </div>
                    </div>
                </ul>
            </nav>

            <div className="auth-status">
                {loading ? <p>Loading...</p> : user ? <h4>Welcome, {user}</h4> : <p>Not authenticated</p>}
            </div>
            <Btn isChecked={isDark} onClick={()=> setIsDark(!isDark)}/>
        </header>
    );
}

export default Headerh;
