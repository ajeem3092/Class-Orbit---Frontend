import React, { useState, useEffect } from 'react';
import FacultyNavBar from './FacultyNavBar';
import UserInfo from '../Components1/UserInfo';
import DynamicJumbotron from '../Components1/DynamicJumbotron';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditTimeTable() {
  const navigate = useNavigate();
  const param = useParams();
  const timeId = param.id;
  const updateurl = `http://localhost:8080/faculty/edittimetable/${param.id}`;
  const editURL = `http://localhost:8080/faculty/edittimetable/${param.id}`;

  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [platform, setPlatform] = useState('');
  const [link, setLink] = useState('');

  // Handle input changes
  const handleModuleName = (e) => setModuleName(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleStartTime = (e) => setStartTime(e.target.value);
  const handleEndTime = (e) => setEndTime(e.target.value);
  const handlePlatform = (e) => setPlatform(e.target.value);
  const handleLink = (e) => setLink(e.target.value);

  // Fetch timetable details for editing
  useEffect(() => {
    axios.get(editURL).then((response) => {
      const timeTableData = response.data;
      setDate(timeTableData.data.date);
      setStartTime(timeTableData.data.startTime);
      setEndTime(timeTableData.data.endTime);
      setModuleName(timeTableData.data.moduleName);
      setPlatform(timeTableData.data.platform);
      setLink(timeTableData.data.link);
    }).catch(error => {
      alert("Error occurred while getting Timetable detail: " + error);
    });
  }, []);

  // Handle form submission
  function submit(e) {
    e.preventDefault();
    axios.put(updateurl, {
      date,
      startTime,
      endTime,
      moduleName,
      platform,
      link
    }).then(res => {
      console.log(res.data);
    }).catch(error => {
      alert("Error occurred while updating timetable: " + error);
    });

    alert(`TimeTable with ID ${timeId} updated successfully!`);
    navigate("/faculty");
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

        {/* Edit TimeTable Form */}
        <div className="edit-timetable-container">
          <h3 className="text-center mb-4">Edit TimeTable</h3>
          <form onSubmit={submit} className="form-container">
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" onChange={handleDate} value={date} required />
            </div>

            <div className="mb-3 d-flex justify-content-between gap-3">
              <div className="flex-fill">
                <label className="form-label">Start Time</label>
                <input type="time" className="form-control" onChange={handleStartTime} value={startTime} required />
              </div>
              <div className="flex-fill">
                <label className="form-label">End Time</label>
                <input type="time" className="form-control" onChange={handleEndTime} value={endTime} required />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Module Name</label>
              <input type="text" className="form-control" onChange={handleModuleName} value={moduleName} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Platform</label>
              <input type="text" className="form-control" onChange={handlePlatform} value={platform} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Link</label>
              <input type="text" className="form-control" onChange={handleLink} value={link} required />
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-success w-100">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTimeTable;
