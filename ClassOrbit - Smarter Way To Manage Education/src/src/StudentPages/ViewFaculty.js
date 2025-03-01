import StudentNavBar from './StudentNavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfo from '../Components1/UserInfo';
import DynamicJumbotron from '../Components1/DynamicJumbotron';

function Faculty() {
  const [data, setData] = useState({ faculties: [], isFetching: false });
  const [searchText, setSearchText] = useState('');

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        setData((data) => ({ faculties: data.faculties, isFetching: true }));
        const response = await axios.get('http://localhost:8080/student/faculty');
        setData({ faculties: response.data, isFetching: false });
        console.log(response);
      } catch (e) {
        console.log(e);
        setData((data) => ({ faculties: data.faculties, isFetching: false }));
      }
    };
    fetchFaculties();
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
        <h3>Faculty Details</h3>

        {/* Search Bar */}
        <div className="d-flex justify-content-end mb-3">
          <div className="input-group w-50">
            <input
              type="text"
              className="form-control border rounded-start"
              placeholder="Search by Name or Email..."
              onChange={handleSearchText}
              value={searchText}
            />
            <button className="btn btn-outline-primary rounded-end">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        {/* Faculty Table */}
        {data.isFetching ? (
          <div className="text-center">Loading...</div> // Show loading state
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Name</th>
                  <th>Mob No</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.faculties
                  .filter((val) => {
                    if (searchText === '') return val;
                    return (
                      val.name.toLowerCase().includes(searchText.toLowerCase()) ||
                      val.email.toLowerCase().includes(searchText.toLowerCase())
                    );
                  })
                  .map(({ id, name, mobNo, email }, index) => (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{mobNo}</td>
                      <td>{email}</td>
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

export default Faculty;
