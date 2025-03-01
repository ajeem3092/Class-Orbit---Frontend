import React, { useState } from 'react';
import FacultyNavBar from './FacultyNavBar';
import './Faculty.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserInfo from "../Components1/UserInfo";
import DynamicJumbotron from "../Components1/DynamicJumbotron";

function UploadAssignment() {
   const [moduleName, setModuleName] = useState('');
   const [description, setDescription] = useState('');
   const [selectedFile, setSelectedFile] = useState(null);
   const navigate = useNavigate();

   const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
   };

   const submitForm = (e) => {
      e.preventDefault();
      if (!moduleName || !description || !selectedFile) {
         alert("Please fill in all fields and select a file before submitting.");
         return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("facultyName", sessionStorage.getItem('userName'));
      formData.append("facultyId", sessionStorage.getItem('userId'));
      formData.append("moduleName", moduleName);
      formData.append("description", description);

      axios.post("http://localhost:8080/faculty/addassignment", formData, {
         headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
         alert("Assignment Uploaded Successfully!");
         navigate('/faculty');
      })
      .catch(() => alert("File Upload Error"));
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

            {/* Upload Assignment Form Below Jumbotron */}
            <div className="assignment-container">
               <div className="assignment-form">
                  <h3 className="text-center mb-4">Upload Assignment</h3>
                  <form onSubmit={submitForm}>
                     <div className="mb-3">
                        <label className="form-label">Module Name</label>
                        <input type="text" className="form-control" placeholder="Enter Module Name"
                           onChange={(e) => setModuleName(e.target.value)} value={moduleName} required />
                     </div>

                     <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" placeholder="Enter Assignment Details" rows="4"
                           onChange={(e) => setDescription(e.target.value)} value={description} required></textarea>
                     </div>

                     <div className="mb-3">
                        <label className="form-label">Upload File</label>
                        <input type="file" className="form-control" onChange={handleFileChange} required />
                     </div>

                     <button type="submit" className="btn btn-success w-100">Upload</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}

export default UploadAssignment;
