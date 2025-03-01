import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
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
  };

  return (
    <div className="left-panel">
      <div className="logo-container">
        <img className="img" src="/image/images_low.png" alt="Logo" />
      </div>
      <div className="panel dashboard">
        <h2 style={{ color: 'white' }}>ADMIN</h2>
        <ul>
          <li><NavLink to="/admin" style={{ textDecoration: 'none' }}><span>Home</span></NavLink></li>
          <li><NavLink to="/admin/addfaculty" style={{ textDecoration: 'none' }}><span>Add Faculty</span></NavLink></li>
          <li><NavLink to="/admin/viewfaculty" style={{ textDecoration: 'none' }}><span>View Faculty</span></NavLink></li>
          <li><NavLink to="/admin/addstudent" style={{ textDecoration: 'none' }}><span>Add Student</span></NavLink></li>
          <li><NavLink to="/admin/viewstudent" style={{ textDecoration: 'none' }}><span>View Student</span></NavLink></li>
        </ul>
        <a href="#" onClick={handleLogout} style={{ textDecoration: 'none' }}><span>Logout</span></a>
      </div>
    </div>
  );
}

export default AdminNavBar;