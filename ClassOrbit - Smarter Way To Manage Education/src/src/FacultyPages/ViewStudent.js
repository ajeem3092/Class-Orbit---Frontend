import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FacultyNavBar from './FacultyNavBar';
import UserInfo from '../Components1/UserInfo';
import DynamicJumbotron from '../Components1/DynamicJumbotron';

function ViewStudent() {
  const [students, setStudents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get('http://localhost:8080/faculty/viewstudent');
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchStudents();
  }, []);

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
        <h3>Enrolled Students</h3>
        {/* Search Bar */}
        <div className="d-flex justify-content-end mb-3">
          <div className="input-group w-50">
            <input
              type="text"
              className="form-control border rounded-start"
              placeholder="Search by Name or Email..."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
            <button className="btn btn-outline-primary rounded-end">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="text-white" style={{ backgroundColor: "#00546e" }}>
              <tr>
                <th>Sr No.</th>
                <th>Full Name</th>
                <th>DOB</th>
                <th>Mobile No.</th>
                <th>Email</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {students
                .filter((val) =>
                  searchText === "" ||
                  val.name.toLowerCase().includes(searchText.toLowerCase()) ||
                  val.email.toLowerCase().includes(searchText.toLowerCase())
                )
                .map(({ id, name, dob, mobNo, email, address }, index) => (
                  <tr key={id} className="border-bottom">
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{dob}</td>
                    <td>{mobNo}</td>
                    <td>{email}</td>
                    <td>{address}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewStudent;
