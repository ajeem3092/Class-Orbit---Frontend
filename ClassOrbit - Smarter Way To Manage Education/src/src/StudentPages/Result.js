import React, { useEffect, useState } from 'react';
import StudentNavBar from './StudentNavBar';
import axios from 'axios';
import UserInfo from '../Components1/UserInfo'; // You can add this if you need user info
import DynamicJumbotron from '../Components1/DynamicJumbotron'; // You can add this for the jumbotron

function Result() {
  const [data, setData] = useState({ results: [], isFetching: false });
  const [searchText, setSearchText] = useState('');
  
  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setData((data) => ({ results: data.results, isFetching: true }));
        const response = await axios.get(
          `http://localhost:8080/student/result/${sessionStorage.getItem('userId')}`
        );
        setData({ results: response.data, isFetching: false });
        console.log(response);
      } catch (e) {
        console.log(e);
        setData((data) => ({ results: data.results, isFetching: false }));
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="faculty-container">
      {/* Left Panel: Sidebar Navbar */}
      <div className="left-panel">
        <StudentNavBar />
      </div>

      {/* Right Panel: Main Content */}
      <div className="right-panel">
        {/* User Info Section */}
        <div className="top-section">
          <UserInfo />
        </div>

        {/* Jumbotron */}
        <DynamicJumbotron />

        <h3>Assignment Results</h3>

        {/* Search Bar */}
        <div className="d-flex justify-content-end mb-3">
          <div className="input-group w-50">
            <input
              type="text"
              className="form-control border rounded-start"
              placeholder="Enter faculty name or module name"
              onChange={handleSearchText}
              value={searchText}
            />
            <button className="btn btn-outline-primary rounded-end">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        {/* Simple Bootstrap Table */}
        {data.isFetching ? (
          <div className="text-center">Loading...</div> // Show loading state
        ) : (
          <div className="table-responsive">
            <table className="table ">
              <thead className="thead-dark">
                <tr>
                  <th>Sr. No</th>
                  <th>Faculty Name</th>
                  <th>Module Name</th>
                  <th>Assignment ID</th>
                  <th>Grade</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {data.results
                  .filter((val) => {
                    if (searchText === '') {
                      return val.grade !== null || val.remark !== null;
                    } else if (
                      val.moduleName.toLowerCase().includes(searchText.toLowerCase()) ||
                      val.facultyName.toLowerCase().includes(searchText.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map(({ id, facultyName, moduleName, assignmentId, grade, remark }, index) => (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{facultyName}</td>
                      <td>{moduleName}</td>
                      <td>{assignmentId.id}</td>
                      <td>{grade}</td>
                      <td>{remark}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
