import React, { useState } from 'react'
import axios from 'axios';
import AdminNavBar from './AdminNavBar';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../Components1/UserInfo';
import DynamicJumbotron from '../Components1/DynamicJumbotron';

function AddFaculty1() {
  const url = "http://localhost:8080/admin/addfaculty"
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    dob: "",
    mobNo: "",
    email: "",
    address: "",
    password: ""
  });

  function submit(e) {
    e.preventDefault();
    axios.post(url, {
      name: data.name,
      dob: data.dob,
      mobNo: data.mobNo,
      email: data.email,
      address: data.address,
      password: data.password
    }).then(res =>
      console.log(res.data)
    );
    alert("Faculty Added Successfully!!")
    navigate('/admin')
  }

  function handle(e) {
    const newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)
  }

  return (
    <div className="faculty-container">
        {/* Left Panel: Sidebar Navbar */}
        <div className="left-panel">
          <AdminNavBar/>
        </div>
        <div className="right-panel">

          <div className="top-section">
            <UserInfo/>
          </div>

          {/* Jumbotron */}
          <DynamicJumbotron/>
        <div className="add-faculty-container">
          <h3 className="text-center mb-4">Add Faculty</h3>
          <form onSubmit={submit} className="form-container">
            <div className="mb-3">
              <label className="form-label">Faculty Name</label>
              <input type="text" className="form-control" id="name" value={data.name} onChange={handle} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Date Of Birth</label>
              <input type="date" className="form-control" id="dob" value={data.dob} onChange={handle} required />
            </div>

            <div className="mb-3 d-flex justify-content-between gap-3">
              <div className="flex-fill">
                <label className="form-label">Mobile</label>
                <input type="text" className="form-control w-100" id="mobNo" value={data.mobNo} onChange={handle} required />
              </div>
              <div className="flex-fill">
                <label className="form-label">Email</label>
                <input type="email" className="form-control w-100" id="email" value={data.email} onChange={handle} required />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea className="form-control" id="address" value={data.address} onChange={handle} required></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" id="password" value={data.password} onChange={handle} required />
            </div>

            <button type="submit" className="btn btn-success w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddFaculty1;
