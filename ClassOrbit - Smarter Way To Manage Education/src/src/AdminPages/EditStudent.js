import React, { useEffect, useState } from 'react';
import AdminNavBar from './AdminNavBar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserInfo from '../Components1/UserInfo';
import DynamicJumbotron from '../Components1/DynamicJumbotron';

function EditStudent() {
  const navigate = useNavigate();
  const param = useParams();
  const studentId = param.id;
  const updateurl = `http://localhost:8080/admin/editstudent/${param.id}`;

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [mobNo, setMobNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleName = (e) => setName(e.target.value);
  const handleDob = (e) => setDob(e.target.value);
  const handleMobNo = (e) => setMobNo(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);

  useEffect(() => {
    axios
      .get(updateurl)
      .then((response) => {
        const studentData = response.data.data;
        setName(studentData.name);
        setDob(studentData.dob);
        setMobNo(studentData.mobNo);
        setEmail(studentData.email);
        setAddress(studentData.address);
      })
      .catch((error) => {
        alert('Error occurred getting student details: ' + error);
      });
  }, [updateurl]);

  function submit(e) {
    e.preventDefault();
    axios
      .put(updateurl, {
        name: name,
        dob: dob,
        mobNo: mobNo,
        email: email,
        address: address,
      })
      .then(() => {
        alert('Student with ID ' + studentId + ' updated successfully');
        navigate('/admin/viewstudent');
      })
      .catch((error) => {
        alert('Error occurred while updating student: ' + error);
      });
  }

  return (
    <div className="faculty-container">
      {/* Left Panel: Sidebar Navbar */}
      <div className="left-panel">
        <AdminNavBar />
      </div>

      {/* Right Panel: Main Content */}
      <div className="right-panel">
        {/* User Info Section */}
        <div className="top-section">
          <UserInfo />
        </div>

        {/* Jumbotron */}
        <DynamicJumbotron />

        <div className="edit-student-container">
          <h2 className="text-center mb-4">Edit Student Details</h2>

          {/* Edit Form */}
          <form onSubmit={submit}>
            <div className="form-group mb-3">
              <label htmlFor="name">Student Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Student Name"
                onChange={handleName}
                value={name}
                name="name"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                onChange={handleDob}
                value={dob}
                name="dob"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="mobNo">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                onChange={handleMobNo}
                value={mobNo}
                name="mobNo"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={handleEmail}
                value={email}
                name="email"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="address">Address</label>
              <textarea
                className="form-control"
                onChange={handleAddress}
                value={address}
                name="address"
                required
              />
            </div>

            <button type="submit" className="btn btn-success form-control">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditStudent;
