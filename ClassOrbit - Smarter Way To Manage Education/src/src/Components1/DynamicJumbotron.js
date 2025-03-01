import React from 'react';
import './DynamicJumbotron.css'

function DynamicJumbotron() {
  // Get the current date in a readable format (e.g., "10th October, 2024")
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Get the user's name from sessionStorage or set a default
  const userName = sessionStorage.getItem('userName') || 'Nischal Basavaraju';

  return (
    <div className="jumbotron">
      <div className="jumbotron-content">
        <p className="date">{currentDate}</p>
        <p className="welcome">Welcome back, {userName}!</p>
        <p className="update">Always stay updated in your student portal</p>
      </div>
      <img src="/image/boy.png?v=1" alt="Jumbotron Image" className="jumbotron-image" />
    </div>
  );
}

export default DynamicJumbotron;
