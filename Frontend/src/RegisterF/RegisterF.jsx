import React, { useState } from "react";
import "./RegisterF.css"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 

const RegisterF = () => {
 const [name,setName]= useState();
   const [email,setEmail]= useState();
   const [password,setPassword]= useState();
   const [linkid,setlinkid]= useState();
   
   const navigate= useNavigate()
 
   const handleSubmit= (e) =>{
     e.preventDefault()
 
     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
     
 
     if (!name || !email || !password ) {
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
 
     axios.post('http://localhost:3001/auth/signupf',{linkid,name,email,password})
     .then(Response=>{
       console.log(Response)
 
       if(Response.data.status)
       {
         const i=3500;
         toast.success("You've successfully signed up",{
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
           navigate('/login');
         }, i);
       }
 
       if(Response.data.message=="user already existed")
       {
         const i=4500;
         toast.error('Oops! It looks like this email is already in use', {
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
    <div className="faculty-dark-background">
      <div className="faculty-register-container">
        
        <h2 className="f">Register (faculty)</h2>
        
        <form onSubmit={handleSubmit}>
        <div className="faculty-form-group">
            <label className="faculty-form-label">Link Id</label>
            <input type='text' class="input" autoComplete='off' name="name" placeholder='Link id' onChange={(e)=>setlinkid(e.target.value)} className="faculty-input-field"/>
            
          </div>
          
          <div className="faculty-form-group">
            <label className="faculty-form-label">Username</label>
            <input type='text' class="input" autoComplete='off' name="name" placeholder='Name' onChange={(e)=>setName(e.target.value)} className="faculty-input-field"/>
            
          </div>
          
          <div className="faculty-form-group">
            <label className="faculty-form-label">Email</label>
            <input  type='email' class="input" autoComplete='off' name="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} className="faculty-input-field"/>
          </div>
          
          <div className="faculty-form-group">
            <label className="faculty-form-label">Password</label>
            <input type='password' class="input" name="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} className="faculty-input-field"/>
          </div>

          <button type="submit" className="faculty-submit-btn">Register</button>
        </form>
      </div>
      
    </div>
    </>
  );
};

export default RegisterF;
