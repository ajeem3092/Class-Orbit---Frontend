import React from "react";
import StudentNavBar from "./StudentNavBar";
import UserInfo from "../Components1/UserInfo";
import DynamicJumbotron from "../Components1/DynamicJumbotron";
import './Student.css'
import TimeTable from "./TimeTable";

const StudentDashboard = () => {
  return (
    <div className="student-container">
      {/* Left Panel: Sidebar Navbar */}
      <div className="left-panel">
        <StudentNavBar />
      </div>

      {/* Right Panel: User Info + Jumbotron + Content */}
      <div className="right-panel">
        {/* User Info beside Navbar */}
        <div className="top-section">
          <UserInfo />
        </div>

        {/* Jumbotron below User Info */}
        <DynamicJumbotron />
        <TimeTable/>
      </div>
    </div>
  );
};

export default StudentDashboard;
