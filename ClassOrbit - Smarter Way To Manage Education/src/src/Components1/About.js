import React from 'react';
import NavBar from "./NavBar"
function About() {

return (
    <div>
        <NavBar></NavBar>
        <div className='cotainer-fluid'>
            <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:10 , marginLeft:'20px'}}>    
                <div className="col-9 p-5 shadow bg-white" >
                <center><span className='fw-bold fs-1'>ClassOrbit: A Smarter Way to Manage Education</span></center>
                <br></br>
                <center><span className='fw-lightbold fs-3'>A comprehensive Student Portal web application named ClassOrbit designed to 
                        streamline communication and information sharing between students, faculty and administrators. The backend is built 
                        using Spring Boot and MySQL, providing a secure and efficient data management system. The frontend is developed with React, offering
                        a dynamic and user-friendly interface. The portal will feature secure user authentication and role-based access
                        control. Administrators will have full control over student and faculty data. Faculty members will be empowered to
                        manage academic aspects including posting notices, creating and managing timetables, and uploading assignments
                        and assignment answer keys. Students will have access to essential information such as assignments, notice board
                        and timetables. This system emphasizes secure authentication, efficient data management, and a user-friendly
                        experience for all user roles.</span></center>
                </div>
            </div>
        </div>
    </div>
    );
}
export default About;