import React from 'react'
import AdminNavBar from './AdminNavBar'
import UserInfo from '../Components1/UserInfo'
import DynamicJumbotron from '../Components1/DynamicJumbotron'

function Admin() {
  return (
    <div className="faculty-container">

      <div className="left-panel">
        <AdminNavBar />
      </div>

      {/* Right Panel: User Info + Jumbotron + Content */}
      <div className="right-panel" >
        {/* User Info beside Navbar */}
        <div className="top-section" >
          <UserInfo />
        </div>

        {/* Jumbotron below User Info */}
        <DynamicJumbotron />

      </div>

    </div>
  )
}

export default Admin