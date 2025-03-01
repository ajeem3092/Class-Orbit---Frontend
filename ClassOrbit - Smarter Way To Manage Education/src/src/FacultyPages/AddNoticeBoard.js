import React from 'react';
import FacultyNavBar from './FacultyNavBar';
import './Faculty.css'; 
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserInfo from "../Components1/UserInfo";
import DynamicJumbotron from "../Components1/DynamicJumbotron";

function AddNoticeBoard() {
  const id = sessionStorage.getItem("userId");
  const url = `http://localhost:8080/faculty/addnoticeboard/${id}`;
  const navigate = useNavigate();

  const [data, setData] = useState({
      facultyName: "",
      date: "",
      description: "",
      moduleName: ""
  });

  function submit(e) {
      e.preventDefault();
      axios.post(url, {
          facultyName: sessionStorage.getItem("userName"),
          date: data.date,
          description: data.description,
          moduleName: data.moduleName
      }).then(res => console.log(res.data));

      alert("Notice Added Successfully!!");
      navigate('/faculty/viewnoticeboard');
  }

  function handle(e) {
      const newData = { ...data };
      newData[e.target.id] = e.target.value;
      setData(newData);
  }

  return (
    <div className="faculty-container">
      {/* Left Panel: Sidebar Navbar */}
      <div className="left-panel">
        <FacultyNavBar />
      </div>

      {/* Right Panel: User Info + Jumbotron + Content */}
      <div className="right-panel">
        <div className="top-section">
          <UserInfo />
        </div>

        <DynamicJumbotron />

        {/* Add Notice Board Form Below Jumbotron */}
        <div className="noticeboard-container">
          <div className="noticeboard-form">
            <h3 className="text-center mb-4">Add Notice</h3>
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">Module Name</label>
                <input type="text" className="form-control" placeholder="Enter Module Name" 
                  onChange={handle} id="moduleName" value={data.moduleName} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" 
                  onChange={handle} id="date" value={data.date} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" placeholder="Enter Notice Details" rows="4"
                  onChange={handle} id="description" value={data.description} required></textarea>
              </div>

              <button type="submit" className="btn btn-success w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNoticeBoard;
