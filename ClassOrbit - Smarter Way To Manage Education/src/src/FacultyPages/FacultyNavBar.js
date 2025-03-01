import './Faculty.css'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FacultyNavBar() {
  const navigate = useNavigate();

  const handleLogout = function () {
    sessionStorage.clear();
    navigate('/signin');
    toast.info('Sign Out Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className="left-panel">
      <div className="logo-container">
        <img className="img" src="/image/images_low.png" alt="Logo" />
      </div>
      <div className="panel dashboard">
        <ul>
          <li><NavLink to="/faculty" style={{ textDecoration: 'none' }}><span>Home</span></NavLink></li>
          <li><NavLink to="/faculty/addtimetable" style={{ textDecoration: 'none' }}><span>Add TimeTable</span></NavLink></li>
          <li><NavLink to="/faculty" style={{ textDecoration: 'none' }}><span>View TimeTable</span></NavLink></li>
          <li><NavLink to="/faculty/addnoticeboard" style={{ textDecoration: 'none' }}><span>Add Notices</span></NavLink></li>
          <li><NavLink to="/faculty/viewnoticeboard" style={{ textDecoration: 'none' }}><span>View Notices</span></NavLink></li>
          <li><NavLink to="/faculty/viewstudent" style={{ textDecoration: 'none' }}><span>View Students</span></NavLink></li>
          <li><NavLink to="/faculty/addassignment" style={{ textDecoration: 'none' }}><span>Upload Assignments</span></NavLink></li>
          <li><NavLink to="/faculty/viewassignment" style={{ textDecoration: 'none' }}><span>View Assignments</span></NavLink></li>
          <li><NavLink to="/faculty/viewassignmentanswer" style={{ textDecoration: 'none' }}><span>View Assignment Answers</span></NavLink></li>
        </ul>
        <a href="#" onClick={handleLogout} style={{ textDecoration: 'none' }}><span>Logout</span></a>
      </div>
    </div>
  );
}

export default FacultyNavBar;
