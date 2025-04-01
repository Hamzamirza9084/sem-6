import React, { useState } from "react";
import "./LoginF.css"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import { useDarkMode } from "../Header/DarkModeContext.jsx";

const LoginF = () => {
  const { isDark } = useDarkMode();
 
  const [email,setEmail]= useState();
  const [password,setPassword]= useState();
  
  const navigate= useNavigate()

  const handleSubmit= (e) =>{
    e.preventDefault()

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   
    

    if (!email || !password ) {
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
    
    if (!emailPattern.test(email)) {
      toast.error("Invalid email format!", {
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


    if (password.length < 6 ) {
      toast.error("Length Should be more than 6", {
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

    axios.post('http://localhost:3001/auth/login/faculty',{email,password})
    .then(Response=>{
      console.log(Response)

      if(Response.data.status)
        {
          const i=3500;
          toast.success("You've successfully Login",{
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
            navigate('/home');
          }, i);
        }
  
        if (Response.data.message=="Faculty is not registered") {
          toast.error("Faculty is not registered", {
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
  
        if (Response.data.message=="password is incorrect") {
          toast.error("password is incorrect", {
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
      })
    .catch(err=>console.log(err))
  }

  return (
    <><ToastContainer />
    <div className="dark-background" data-theme={isDark ? "dark" : "light"}>
      <div className="register-container">
    
        <h2 className="s">Login (Faculty)</h2>
 
        <form onSubmit={handleSubmit}>
          

          <div className="form-group">
            <label className="form-label">Email</label>
            <input  type='email' class="input" autoComplete='off' name="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} className="input-field"/>
           
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input type='password' class="input" name="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} className="input-field"/>
            
          </div>

         

          <button type="submit" className="submit-btn">Login</button>
        </form>
        <p ><Link to='/regf' id='linkbro'>Sign Up</Link></p>
      </div>
    </div>
    </>
  );
};

export default LoginF;
