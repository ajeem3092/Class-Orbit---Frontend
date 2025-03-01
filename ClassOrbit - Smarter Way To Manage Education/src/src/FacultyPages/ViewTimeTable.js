import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewTimeTable() {
  const [data, setData] = useState({ timetables: [], isFetching: false });
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  // Function to fetch timetables
  const fetchtimetables = async () => {
    try {
      setData((prevData) => ({ ...prevData, isFetching: true }));
      const response = await axios.get(`http://localhost:8080/faculty/viewtimetable/${sessionStorage.getItem("userId")}`);
      setData({ timetables: response.data, isFetching: false });
    } catch (e) {
      console.error("Error fetching timetable:", e);
      setData((prevData) => ({ ...prevData, isFetching: false }));
    }
  };

  // Fetch timetables on component mount
  useEffect(() => {
    fetchtimetables();
  }, []);

  const removeTimeTable = (id) => {
    axios.delete(`http://localhost:8080/faculty/viewtimetable/delete/${id}`)
      .then(() => {
        alert(`TimeTable record with ID ${id} deleted!`);
        // Force reload by calling fetchtimetables to fetch the updated list
        fetchtimetables();
      })
      .catch(error => {
        alert("Error occurred while removing TimeTable: " + error);
      });
  };

  return (
    <div className="container-fluid mt-3">
      <h3>Time Table</h3>
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
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Module Name</th>
              <th>Platform</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.timetables
              .filter((val) => searchText === "" || val.moduleName.toLowerCase().includes(searchText.toLowerCase()))
              .map(({ id, date, startTime, endTime, moduleName, platform, link }, index) => (
                <tr key={id} className="border-bottom">
                  <td>{index + 1}</td>
                  <td>{date}</td>
                  <td>{startTime}</td>
                  <td>{endTime}</td>
                  <td>{moduleName}</td>
                  <td>{platform}</td>
                  <td>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-primary">
                      Open Link
                    </a>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-success me-2" onClick={() => navigate(`/faculty/edittimetable/${id}`)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeTimeTable(id)}>
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
  );
}

export default ViewTimeTable;
