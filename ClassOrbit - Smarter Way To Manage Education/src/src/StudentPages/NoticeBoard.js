import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentNavBar from './StudentNavBar';
import UserInfo from '../Components1/UserInfo';
import DynamicJumbotron from '../Components1/DynamicJumbotron'; // Assuming DynamicJumbotron is imported

function NoticeBoard() {
  const [data, setData] = useState({ noticeboards: [], isFetching: false });
  const [searchText, setSearchText] = useState('');

  // Handle search input
  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  // Fetch data from the server
  useEffect(() => {
    const fetchnoticeboards = async () => {
      try {
        setData((prevData) => ({ ...prevData, isFetching: true }));
        const response = await axios.get('http://localhost:8080/student/noticeboard');
        setData({ noticeboards: response.data, isFetching: false });
        console.log(response);
      } catch (e) {
        console.error(e);
        setData((prevData) => ({ ...prevData, isFetching: false }));
      }
    };
    fetchnoticeboards();
  }, []);

  // Filter data based on search text
  const filteredNoticeboards = data.noticeboards.filter((val) => {
    if (searchText === '') return true;
    return (
      val.moduleName.toLowerCase().includes(searchText.toLowerCase()) ||
      val.facultyName.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div className="faculty-container">
      {/* Left Panel: Sidebar Navbar */}
      <div className="left-panel">
        <StudentNavBar/>
      </div>

      {/* Right Panel: Main Content */}
      <div className="right-panel">
        {/* User Info Section */}
        <div className="top-section">
          <UserInfo />
        </div>

        {/* Jumbotron */}
        <DynamicJumbotron />
        <h3>Notices</h3>
    <div className="container-fluid mt-3">

      {/* Search Bar */}
      <div className="d-flex justify-content-end mb-3">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control border rounded-start" 
            placeholder="Search by Faculty Name or Module Name..."
            onChange={handleSearchText}
            value={searchText}
          />
          <button className="btn btn-outline-primary rounded-end">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>

      {/* Notice Board Content */}
      {data.isFetching ? (
        <div className="text-center">Loading...</div> // Show loading state
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th>Description</th>
                <th>Publish Date</th>
                <th>Faculty Name</th>
                <th>Module Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredNoticeboards.length > 0 ? (
                filteredNoticeboards.map(({ description, date, facultyName, moduleName }, index) => (
                  <tr key={index}>
                    <td>{description}</td>
                    <td>{date}</td>
                    <td>{facultyName}</td>
                    <td>{moduleName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No notices found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}

export default NoticeBoard;
