import React, { useEffect, useState } from 'react';
import StudentNavBar from './StudentNavBar';
import axios from 'axios';
import UserInfo from '../Components1/UserInfo'; // If you want to display user info
import DynamicJumbotron from '../Components1/DynamicJumbotron'; // If you want to display a dynamic jumbotron

function Assignment() {
  const [searchText, setSearchText] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [assignId, setAssignId] = useState('');
  const [data, setData] = useState({ assignments: [], isFetching: false }); 

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  const handleFile = (e, id) => {
    let file = e.target.files[0];
    setAssignId(id);
    setSelectedFile(file);
  };

  const handleDownload = (file) => {
    axios({
      url: `http://localhost:8080/student/downloadFile/${file}`,
      method: 'GET',
      responseType: 'blob', // Important: Ensures binary data is correctly handled
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data])); // Create a downloadable URL
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file); // Set the filename for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Cleanup
        URL.revokeObjectURL(url); // Free up memory
      })
      .catch((error) => {
        console.error('Download error: ', error);
        alert('Error downloading file. Please try again.');
      });
  };

  const submitForm = (e) => {
    const formData = new FormData();
    e.disabled = true;
    formData.append('file', selectedFile);
    formData.append('assignId', assignId);
    formData.append('studentId', sessionStorage.getItem('userId'));

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios
      .post(`http://localhost:8080/student/uploadAssignment/${assignId}`, formData, config)
      .then((res) => {
        alert('File Upload success');
      })
      .catch((err) => alert('File Upload Error'));
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setData((data) => ({ assignments: data.assignments, isFetching: true }));
        const response = await axios.get('http://localhost:8080/student/assignment');
        setData({ assignments: response.data, isFetching: false });
        console.log(response);
      } catch (e) {
        console.log(e);
        setData((data) => ({ assignments: data.assignments, isFetching: false }));
      }
    };
    fetchAssignments();
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

        <h3>View Assignment</h3>

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
          <div className="text-center">Loading...</div>
        ) : (
          <div className="table-responsive">
            <table className="table ">
              <thead className="thead-dark">
                <tr>
                  <th>Sr. No</th>
                  <th>Faculty Name</th>
                  <th>Module Name</th>
                  <th>Description</th>
                  <th>Download</th>
                  <th>Upload</th>
                </tr>
              </thead>
              <tbody>
                {data.assignments
                  .filter((val) => {
                    if (searchText === '') return val;
                    return (
                      val.moduleName.toLowerCase().includes(searchText.toLowerCase()) ||
                      val.facultyName.toLowerCase().includes(searchText.toLowerCase())
                    );
                  })
                  .map(({ id, facultyName, moduleName, description, fileName }, index) => (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{facultyName}</td>
                      <td>{moduleName}</td>
                      <td>{description}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleDownload(fileName)}>
                          Download
                        </button>
                      </td>
                      <td>
                        <input
                          type="file"
                          name="file"
                          onChange={(e) => handleFile(e, id)}
                        />
                        <button className="btn btn-sm btn-outline-success me-2" onClick={(e) => submitForm(e)}>
                          Upload
                        </button>
                      </td>
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

export default Assignment;
