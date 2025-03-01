import React from "react";
import FacultyNavBar from "./FacultyNavBar";
import UserInfo from "../Components1/UserInfo";
import DynamicJumbotron from "../Components1/DynamicJumbotron";
import ViewTimeTable from "./ViewTimeTable"


const FacultyDashboard = () => {
  return (
    <div className="faculty-container">
      {/* Left Panel: Sidebar Navbar */}
      <div className="left-panel">
        <FacultyNavBar />
      </div>

      {/* Right Panel: User Info + Jumbotron + Content */}
      <div className="right-panel" >
        {/* User Info beside Navbar */}
        <div className="top-section" >
          <UserInfo />
        </div>

        {/* Jumbotron below User Info */}
        <DynamicJumbotron />
        
        <ViewTimeTable />
      </div>

    </div>

  );
};

export default FacultyDashboard;
