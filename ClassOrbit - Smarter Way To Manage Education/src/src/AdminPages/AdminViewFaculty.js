import React, { useEffect, useState } from 'react';
import AdminNavBar from './AdminNavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserInfo from '../Components1/UserInfo';
import DynamicJumbotron from '../Components1/DynamicJumbotron';

function AdminViewFaculty() {
  const [data, setData] = useState({ faculties: [], isFetching: false });
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  // Function to fetch faculties
  const fetchFaculties = async () => {
    try {
      setData((prevData) => ({ ...prevData, isFetching: true }));
      const response = await axios.get('http://localhost:8080/admin/viewfaculty');
      setData({ faculties: response.data, isFetching: false });
      console.log(response);
    } catch (e) {
      console.log(e);
      setData((prevData) => ({ ...prevData, isFetching: false }));
    }
  };

  useEffect(() => {
    fetchFaculties(); // Fetch faculties on component mount
  }, []);

  // Function to remove a faculty
  const removeFaculty = (id) => {
    axios
      .delete(`http://localhost:8080/admin/viewfaculty/delete/${id}`)
      .then(() => {
        alert(`Faculty record with ID ${id} deleted!`);
        fetchFaculties(); // Re-fetch the data after deletion
      })
      .catch((error) => {
        alert('Error occurred while removing faculty: ' + error);
      });
  };

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

        <div className="view-faculty-container">
          <h2 className="text-center mb-4">View Faculty Details</h2>

          {/* Search Bar */}
          <div className="d-flex justify-content-end mb-3">
            <div className="input-group w-50">
              <input
                type="text"
                className="form-control border rounded-start"
                placeholder="Enter name or email"
                onChange={handleSearchText}
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
                  <th>Faculty Name</th>
                  <th>Date of Birth</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.faculties
                  .filter((val) => {
                    if (searchText === '') return val;
                    else if (
                      val.name.toLowerCase().includes(searchText.toLowerCase()) ||
                      val.email.toLowerCase().includes(searchText.toLowerCase())
                    )
                      return val;
                  })
                  .map(({ id, name, dob, mobNo, email, address }, index) => (
                    <tr key={id} className="border-bottom">
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{dob}</td>
                      <td>{mobNo}</td>
                      <td>{email}</td>
                      <td>{address}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-success me-2"
                          onClick={() => navigate(`/admin/editfaculty/${id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFaculty(id)}
                        >
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
  );
}

export default AdminViewFaculty;
