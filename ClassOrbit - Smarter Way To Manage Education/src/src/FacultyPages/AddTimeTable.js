  import FacultyNavBar from './FacultyNavBar';
  import React, { useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import UserInfo from '../Components1/UserInfo';
  import DynamicJumbotron from '../Components1/DynamicJumbotron';

  function AddTimeTable() {
    const id = sessionStorage.getItem("userId");
    const url = `http://localhost:8080/faculty/addtimetable/${id}`;
    const navigate = useNavigate();

    const [data, setData] = useState({
      facultyName: "",
      date: "",
      startTime: "",
      endTime: "",
      moduleName: "",
      platform: "",
      link: ""
    });

    function submit(e) {
      e.preventDefault();
      axios.post(url, {
        facultyName: sessionStorage.getItem("userName"),
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        moduleName: data.moduleName,
        platform: data.platform,
        link: data.link
      }).then(res => {
        console.log(res.data);
        alert("TimeTable Added Successfully!!");
        navigate('/faculty');
      }).catch(error => {
        alert("Error adding timetable: " + error);
      });
    }

    function handle(e) {
      const newData = { ...data, [e.target.id]: e.target.value };
      setData(newData);
    }

    return (
      <div className="faculty-container">
        {/* Left Panel: Sidebar Navbar */}
        <div className="left-panel">
          <FacultyNavBar />
        </div>

        {/* Right Panel: Main Content */}
        <div className="right-panel">
          {/* User Info Section */}
          <div className="top-section">
            <UserInfo />
          </div>

          {/* Jumbotron */}
          <DynamicJumbotron />

          {/* Add TimeTable Form - Now Just Below Jumbotron */}
          <div className="add-timetable-container">
            <h3 className="text-center mb-4">Add Time Table</h3>
            <form onSubmit={submit} className="form-container">
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" id="date" value={data.date} onChange={handle} required />
              </div>

              <div className="mb-3 d-flex justify-content-between gap-3">
                <div className="flex-fill">
                  <label className="form-label">Start Time</label>
                  <input type="time" className="form-control w-100" id="startTime" value={data.startTime} onChange={handle} required />
                </div>
                <div className="flex-fill">
                  <label className="form-label">End Time</label>
                  <input type="time" className="form-control w-100" id="endTime" value={data.endTime} onChange={handle} required />
                </div>
              </div>


              <div className="mb-3">
                <label className="form-label">Module Name</label>
                <input type="text" className="form-control" id="moduleName" value={data.moduleName} onChange={handle} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Platform</label>
                <input type="text" className="form-control" id="platform" value={data.platform} onChange={handle} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Link</label>
                <input type="text" className="form-control" id="link" value={data.link} onChange={handle} required />
              </div>

              <button type="submit" className="btn btn-success w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  export default AddTimeTable;
