import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentNavBar from "./StudentNavBar";

function TimeTable() {
  const [data, setData] = useState({ timetables: [], isFetching: false });
  const [searchText, setSearchText] = useState('');

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchtimetables = async () => {
      try {
        setData((prevData) => ({ ...prevData, isFetching: true }));
        const response = await axios.get('http://localhost:8080/student/timetable');
        setData({ timetables: response.data, isFetching: false });
        console.log(response);
      } catch (e) {
        console.log(e);
        setData((prevData) => ({ ...prevData, isFetching: false }));
      }
    };
    fetchtimetables();
  }, []);

  return (
    <div className="container-fluid mt-3">
      <h3>Time Table</h3>
      
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

      {/* Table */}
      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="text-white" style={{ backgroundColor: "#00546e" }}>
            <tr>
              <th>Sr. No</th>
              <th>Faculty Name</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Module Name</th>
              <th>Platform</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {data.timetables
              .filter((val) => {
                if (searchText === "") return val;
                return (
                  val.moduleName.toLowerCase().includes(searchText.toLowerCase()) ||
                  val.facultyName.toLowerCase().includes(searchText.toLowerCase())
                );
              })
              .map(({ id, facultyName, date, startTime, endTime, moduleName, platform, link }, index) => (
                <tr key={id} className="border-bottom">
                  <td>{index + 1}</td>
                  <td>{facultyName}</td>
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TimeTable;
