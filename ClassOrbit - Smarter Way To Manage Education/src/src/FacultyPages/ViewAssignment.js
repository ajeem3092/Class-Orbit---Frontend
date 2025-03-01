import React, { useEffect, useState } from 'react';
import FacultyNavBar from './FacultyNavBar';
import UserInfo from '../Components1/UserInfo';
import DynamicJumbotron from '../Components1/DynamicJumbotron';
import axios from 'axios';
import './Faculty.css';

function ViewAssignment() {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState({ assignments: [], isFetching: false });

  // Function to fetch assignments
  const fetchAssignments = async () => {
    try {
      setData((prevData) => ({ ...prevData, isFetching: true }));
      const url = `http://localhost:8080/faculty/viewassignment/${sessionStorage.getItem("userId")}`;
      const response = await axios.get(url);
      setData({ assignments: response.data, isFetching: false });
    } catch (e) {
      console.log(e);
      setData((prevData) => ({ ...prevData, isFetching: false }));
    }
  };

  // Fetch assignments on component mount
  useEffect(() => {
    fetchAssignments();
  }, []);

  // Function to handle assignment deletion
  const removeAssignment = (id) => {
    axios.delete(`http://localhost:8080/faculty/viewassignment/delete/${id}`)
      .then(() => {
        alert(`Assignment record with ID ${id} deleted!`);
        // After deletion, fetch the updated list of assignments
        fetchAssignments();
      })
      .catch(error => {
        alert("Error occurred while removing assignment: " + error);
      });
  };

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

        {/* View Assignments Section */}
        <div className="assignment-container">
          <div className="assignment-list">
            <h3 className="text-center mb-4">Assignments</h3>
            <div className='d-flex justify-content-end mb-3'>
              <div className="input-group w-50">
                <input 
                  type='text' 
                  className='form-control border rounded-start' 
                  placeholder='Enter module name' 
                  onChange={(e) => setSearchText(e.target.value)} 
                  value={searchText} 
                />
                <button className="btn btn-outline-primary rounded-end">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="text-white" style={{ backgroundColor: "#00546e" }}>
                  <tr>
                    <th>Sr. No</th>
                    <th>Module Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.assignments
                    .filter((val) => {
                      return searchText === "" || val.moduleName.toLowerCase().includes(searchText.toLowerCase());
                    })
                    .map(({ id, moduleName, description }, index) => (
                      <tr key={id} className="border-bottom">
                        <td>{index + 1}</td>
                        <td>{moduleName}</td>
                        <td>{description}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-success me-2">
                            Edit
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => removeAssignment(id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAssignment;
