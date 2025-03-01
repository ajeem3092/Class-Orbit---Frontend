import './login.css';  // Importing the global CSS
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleApi = async () => {
        // Validation: Check if email or password is empty
        if (!email || !password) {
            if (!email && !password) {
                setErrorMessage("Email and password should not be blank");
            } else if (!email) {
                setErrorMessage("Email should not be blank");
            } else if (!password) {
                setErrorMessage("Password should not be blank");
            }
            return; // Stop function execution
        }
    
        try {
            let response = await axios.post('http://localhost:8080/', {
                email: email,
                password: password
            });
    
            let user1 = response.data;
            
            if (!user1 || !user1.data) {
                setErrorMessage("Invalid login credentials.");
                return;
            }
    
            sessionStorage.setItem("userName", user1.data.name);
            sessionStorage.setItem("userId", user1.data.id);
            sessionStorage.setItem("userRole", user1.data.role);
    
            // Navigate based on user role
            if (user1.data.role === "ROLE_STUDENT") navigate('/student');
            else if (user1.data.role === "ROLE_FACULTY") navigate('/faculty');
            else if (user1.data.role === "ROLE_ADMIN") navigate('/admin');
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Invalid email or password. Please try again.");
        }
    };
 
    return (
        <div className="login-page"> {/* Scoped class added here */}
            <NavBar />
            <ToastContainer position="top-center" autoClose={5000} />
            <div className="split-screen">
                <div className="overlay">
                    <div className="overlay-left">
                        <div className="login-section">
                            <div className="logo">
                                <img src="/image/images_low.png?v=1" alt="ClassOrbit Logo" />
                            </div>
                            <h1>Login</h1>
                            <p>Enter your account details</p>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                            <form>
                                <input type="email" placeholder="User Id" onChange={handleEmail} value={email} required />
                                <input type="password" placeholder="Password" onChange={handlePassword} value={password} required />
                                <a href="#" className="forgot-password">Forgot Password?</a>
                                <button type="button" onClick={handleApi} disabled={!email || !password}>Login</button>
                            </form>
                        </div>
                    </div>
                    <div className="overlay-right">
                        <img src="/image/loginimg.jpg?v=1" alt="Login Visual" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
