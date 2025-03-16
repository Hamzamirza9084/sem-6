import axios from 'axios';
import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Start.css';
import AppFooter from '../Footer/Footer';
import Headerh from '../Header/Headerh';


function Starth() {
    const [subject, setSubject] = useState('');
    const [raspberryPiIp, setRaspberryPiIp] = useState('192.168.92.8');  
    const [loading, setLoading] = useState(false);

    

    const runScript = async () => {
        if (!subject || !raspberryPiIp) {
            toast.error("Subject name and Raspberry Pi IP are required!", {
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

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/auth/start', { subject, raspberryPiIp });

            toast.success(`Attendance Started`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to start Attendance", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        setLoading(false);
    };

    return (
        <>
        <Headerh/>
        <div className="containerr">
            <h1 id="h1s">Click Button to Start Attendance</h1>
            <input
                type="text"
                placeholder="Enter Subject Name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="input-box"
            />
            
            <button onClick={runScript} className="start-button" disabled={loading}>
                {loading ? "Starting..." : <>Start Script <FaPlay /></>}
            </button>
            <ToastContainer />
        </div>
        <AppFooter/>
        </>
    );
}

export default Starth;
