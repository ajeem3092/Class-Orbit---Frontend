import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FacultyNavBar from './FacultyNavBar';
import UserInfo from '../Components1/UserInfo';
import DynamicJumbotron from '../Components1/DynamicJumbotron';

function ViewNoticeBoard() {
  const [data, setData] = useState({ noticeboards: [], isFetching: false });
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  // Function to fetch noticeboards
  const fetchNoticeboards = async () => {
    try {
      setData((prevData) => ({ ...prevData, isFetching: true }));
      const response = await axios.get(`http://localhost:8080/faculty/viewnoticeboard/${sessionStorage.getItem("userId")}`);
      setData({ noticeboards: response.data, isFetching: false });
    } catch (e) {
      console.error("Error fetching noticeboards:", e);
      setData((prevData) => ({ ...prevData, isFetching: false }));
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchNoticeboards();
  }, []);

  const removeNoticeBoard = (id) => {
    axios.delete(`http://localhost:8080/faculty/viewnoticeboard/delete/${id}`)
      .then(() => {
        alert(`NoticeBoard record with ID ${id} deleted!`);
        // Force reloading the data after deletion by calling fetchNoticeboards
        fetchNoticeboards();
      })
      .catch(error => {
        alert("Error occurred while removing NoticeBoard: " + error);
      });
  };

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
        <h2>Notices</h2>
        {/* Search Bar */}
        <div className="d-flex justify-content-end mb-3">
          <div className="input-group w-50">
            <input
              type="text"
              className="form-control border rounded-start"
              placeholder="Search by Module Name..."
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
                <th>Sr. No</th>
                <th>Module Name</th>
                <th>Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.noticeboards
                .filter((val) => searchText === "" || val.moduleName.toLowerCase().includes(searchText.toLowerCase()))
                .map(({ id, moduleName, date, description }, index) => (
                  <tr key={id} className="border-bottom">
                    <td>{index + 1}</td>
                    <td>{moduleName}</td>
                    <td>{date}</td>
                    <td>{description}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-success me-2" onClick={() => navigate(`/faculty/editnoticeboard/${id}`)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => removeNoticeBoard(id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewNoticeBoard;
