import React, { useState, useEffect } from 'react';
import FacultyNavBar from './FacultyNavBar';
import UserInfo from '../Components1/UserInfo';
import DynamicJumbotron from '../Components1/DynamicJumbotron';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditNoticeBoard() {
  const navigate = useNavigate();
  const param = useParams();
  const noticeId = param.id;
  const updateurl = `http://localhost:8080/faculty/editnoticeboard/${param.id}`;
  const editURL = `http://localhost:8080/faculty/editnoticeboard/${param.id}`;

  const [moduleName, setModuleName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  // Handle input changes
  const handleModuleName = (e) => setModuleName(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  // Fetch noticeboard details for editing
  useEffect(() => {
    axios.get(editURL).then((response) => {
      const noticeboardData = response.data;
      setModuleName(noticeboardData.data.moduleName);
      setDate(noticeboardData.data.date);
      setDescription(noticeboardData.data.description);
    }).catch(error => {
      alert("Error occurred while getting NoticeBoard detail: " + error);
    });
  }, []);

  // Handle form submission
  function submit(e) {
    e.preventDefault();
    axios.put(updateurl, {
      moduleName,
      date,
      description,
    }).then(res => {
      console.log(res.data);
    }).catch(error => {
      alert("Error occurred while updating noticeboard: " + error);
    });

    toast.success('Noticeboard edited successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    navigate("/faculty/viewnoticeboard");
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

        {/* Edit NoticeBoard Form */}
        <div className="edit-noticeboard-container">
          <h3 className="text-center mb-4">Edit NoticeBoard</h3>
          <form onSubmit={submit} className="form-container">
            <div className="mb-3">
              <label className="form-label">Module Name</label>
              <input type="text" className="form-control" placeholder="Enter Module Name" onChange={handleModuleName} value={moduleName} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" onChange={handleDate} value={date} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" placeholder="Enter Description" onChange={handleDescription} value={description} required />
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-success w-100">Submit</button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default EditNoticeBoard;
