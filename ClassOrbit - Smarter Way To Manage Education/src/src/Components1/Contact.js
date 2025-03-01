import React from 'react';
import NavBar from './NavBar';
import { NavLink } from 'react-router-dom';

function Contact() {
    return (
        <div>
            <NavBar />
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center" style={{ height: "98vh", marginTop: 10 }}>
                    <div className="col-12 col-md-10 p-5 shadow bg-white">
                        <center><span className="fw-lightbold fs-1">Contact Us</span></center>
                        <div className="row justify-content-around mt-4">
                            {/* Contact Card 1 */}
                            <div className="col-12 col-md-4 mb-3">
                                <div className="card text-bg-white mb-3" style={{ width: '100%' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Aftab Hussain</h5>
                                        <p className="card-text">Gmail: ahussain1802@gmail.com</p>
                                        <a href="https://www.linkedin.com/in/aftab-hussain-b66389237/" className="card-link">
                                            <i className="bi bi-linkedin"></i>www.linkedin.com/in/aftab-hussain-b66389237
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Card 2 */}
                            <div className="col-12 col-md-4 mb-3">
                                <div className="card text-bg-white mb-3" style={{ width: '100%' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Ayush Jakkulwar</h5>
                                        <p className="card-text">Gmail: ayushjakkulwar00@gmail.com</p>
                                        <a href="https://www.linkedin.com/in/ayush-jakkulwar-a7bb02218/" className="card-link">
                                            <i className="bi bi-linkedin"></i>www.linkedin.com/in/ayush-jakkulwar-a7bb02218
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Card 3 */}
                            <div className="col-12 col-md-4 mb-3">
                                <div className="card text-bg-white mb-3" style={{ width: '100%' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Ajeem Makandar</h5>
                                        <p className="card-text">Gmail: ajeem3690@gmail.com</p>
                                        <a href="#" className="card-link">
                                            <i className="bi bi-linkedin"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Card 4 */}
                            <div className="col-12 col-md-4 mb-3">
                                <div className="card text-bg-white mb-3" style={{ width: '100%' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Aditi Mokdam</h5>
                                        <p className="card-text">Gmail: aditi.mokdam@gmail.com</p>
                                        <a href="https://www.linkedin.com/in/aditi-mokdam-34384b274/" className="card-link">
                                            <i className="bi bi-linkedin"></i>www.linkedin.com/in/aditi-mokdam-34384b274
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Card 5 */}
                            <div className="col-12 col-md-4 mb-3">
                                <div className="card text-bg-white mb-3" style={{ width: '100%' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Mr. Ramu Parupali</h5>
                                        <p className="card-text">Gmail: Ramup@cdac.in</p>
                                        <a href="#" className="card-link">
                                            <i className="bi bi-linkedin"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
