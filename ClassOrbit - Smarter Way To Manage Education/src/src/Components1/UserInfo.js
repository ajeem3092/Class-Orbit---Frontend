import React from 'react';
import './UserInfo.css'; 

function UserInfo() {

  const userName = sessionStorage.getItem('userName') || 'Guest';

  return (
    <div className="user-info">
      <div className="profile-icon">
        <img src="/image/Icon.jpg?v=1" alt="Profile Icon" />
      </div>
      <div className="user-details">
        <p className="user-name">{userName}</p>
        <p class="user-program">CDAC</p>

      </div>
    </div>
  );
}

export default UserInfo;
