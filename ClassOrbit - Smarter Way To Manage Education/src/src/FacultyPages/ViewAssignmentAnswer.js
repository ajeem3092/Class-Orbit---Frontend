import React, { useEffect, useState } from 'react';
import FacultyNavBar from './FacultyNavBar';
import UserInfo from '../Components1/UserInfo';
import DynamicJumbotron from '../Components1/DynamicJumbotron';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Faculty.css';

function ViewAssignmentAnswer() {
  const [data, setData] = useState({ answers: [], isFetching: false });
  const [searchText, setSearchText] = useState('');
  const [remark, setRemark] = useState('');
  const [grade, setGrade] = useState('');
  const navigate = useNavigate();

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleDownload = (file) => {
    axios({
      url: `http://localhost:8080/faculty/downloadFile/${file}`,
      method: 'GET',
      responseType: 'blob', // Ensures proper handling of binary data
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data])); // Create blob URL
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file); // Ensure correct filename
      document.body.appendChild(link);
      link.click(); // Trigger download
      document.body.removeChild(link); // Cleanup
      URL.revokeObjectURL(url); // Free up memory
    })
    .catch((error) => {
      console.error("Download error:", error);
      alert("Error downloading file. Please try again.");
    });
  };
  

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setData({ answers: data.answers, isFetching: true });
        const url = `http://localhost:8080/faculty/viewassignmentanswer/${sessionStorage.getItem('userId')}`;
        const response = await axios.get(url);
        setData({ answers: response.data, isFetching: false });
      } catch (e) {
        console.log(e);
        setData({ answers: data.answers, isFetching: false });
      }
    };
    fetchAnswers();
  }, []);

  const getGrade = (e) => {
    setGrade(e.target.value);
  };

  const getRemark = (e) => {
    setRemark(e.target.value);
  };

  const handleGrade = (id) => {
    const gradeUrl = `http://localhost:8080/faculty/viewassignmentanswer/grade/${id}`;
    axios.patch(gradeUrl, {
      grade: grade,
    }).then((res) => {
      console.log(res.data);
    });
    alert('Grade Added Successfully!!');
    navigate('/faculty/viewassignmentanswer');
  };

  const handleRemark = (id) => {
    const remarkUrl = `http://localhost:8080/faculty/viewassignmentanswer/remark/${id}`;
    axios.patch(remarkUrl, {
      remark: remark,
    }).then((res) => {
      console.log(res.data);
    });
    alert('Remark Added Successfully!!');
    navigate('/faculty/viewassignmentanswer');
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

        {/* View Assignment Answers Section */}
        <div className="assignment-container">
          <div className="assignment-list">
            <h3 className="text-center mb-4">View Assignment Answers</h3>
            <div className="d-flex justify-content-end mb-3">
              <div className="input-group w-50">
                <input
                  type="text"
                  className="form-control border rounded-start"
                  placeholder="Enter module name"
                  onChange={handleSearchText}
                  value={searchText}
                />
                <button className="btn btn-outline-primary rounded-end">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="text-white" style={{ backgroundColor: '#00546e' }}>
                  <tr>
                    <th>Sr No.</th>
                    <th>Module Name</th>
                    <th>Student Name</th>
                    <th>Download</th>
                    <th>Grade</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {data.answers
                    .filter((val) => {
                      if (searchText === '') {
                        return val;
                      } else if (
                        val.moduleName.toLowerCase().includes(searchText.toLowerCase()) ||
                        val.studentName.toLowerCase().includes(searchText.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map(({ id, moduleName, studentName, fileName }, index) => (
                      <tr key={id} className="border-bottom">
                        <td>{index + 1}</td>
                        <td>{moduleName}</td>
                        <td>{studentName}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary" onClick={() => handleDownload(fileName)}>
                            Download
                          </button>
                        </td>
                        <td className="d-flex">
                          <input
                            type="text"
                            placeholder="Enter grade"
                            onChange={getGrade}
                            className="form-control mb-2 me-2"
                          />
                          <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleGrade(id)}>
                            Grade
                          </button>
                        </td>
                        <td className="d-flex">
                          <input
                            type="text"
                            placeholder="Enter remark"
                            onChange={getRemark}
                            className="form-control mb-2 me-2"
                          />
                          <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleRemark(id)}>
                            Remark
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

export default ViewAssignmentAnswer;
