import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Login.css';
import { FaUser } from "react-icons/fa";
import { TbEyeClosed, TbEyeUp } from "react-icons/tb";
import logo from '../assets/loge_new 2.png';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const userData = {
            username: username,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:8080/user/login', userData);
            if (response.status === 200) {
                const token = response.headers.get('jwt-token');
                const tokenDecoded = jwtDecode(token);
                const authorities = tokenDecoded.authorities;

                if (token != null) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('exp', tokenDecoded.exp);
                    localStorage.setItem('tokenDecoded', tokenDecoded);

                    if (authorities.includes("ROLE_ROLE_MISSTAFF")) {
                        localStorage.setItem('role', "ROLE_ROLE_MISSTAFF");
                        localStorage.setItem('userId', response.data.userId);
                        navigate('/admin/tickets'); // Navigate to TicketTableAdmin
                    } else if (authorities.includes("ROLE_ROLE_STUDENT")) {
                        localStorage.setItem('role', "ROLE_ROLE_STUDENT");
                        navigate('/student/violation');
                    } else if (authorities.includes("ROLE_ROLE_ADMIN")) {
                        localStorage.setItem('role', "ROLE_ROLE_ADMIN");
                        navigate('/admin/offense');
                    } else if (authorities.includes("ROLE_ROLE_GUEST")) {
                        localStorage.setItem('role', "ROLE_ROLE_GUEST");
                        navigate('/guest/violation');
                    } else {
                        navigate('/login');
                    }
                }
            } else {
                console.error('Login failed:', response.statusText);
                alert('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred while processing your request.');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="semi-body">
            <div className="form-box-login">
                <form onSubmit={handleLogin} className="form-container-login">
                    <div className="header">
                        <div className="logo">
                            <img src={logo} alt="Logo" id="logo"/>
                        </div>
                        <h1>Login</h1>
                    </div>

                    <div className="field-box">
                        <label>Username</label>
                        <div className="insert">
                            <input type="text" required onChange={(e) => setUsername(e.target.value)} />
                            <FaUser className="icon" />
                        </div>
                    </div>

                    <div className="field-box field-box-password">
                        <label>Password</label>
                        <div className="insert">
                            <input type={showPassword ? "text" : "password"} required onChange={(e) => setPassword(e.target.value)} />
                            {showPassword ? (
                                <TbEyeUp className="icon" onClick={togglePasswordVisibility} />
                            ) : (
                                <TbEyeClosed className="icon" onClick={togglePasswordVisibility} />
                            )}
                        </div>
                        
                        <div className="forgot-password-link">
                            <a href="account/forgot-password">Forgot password?</a>
                        </div>    
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button type="submit" className="login">Login</button>

                    <div className="register-link">
                        <p className="noAcc">Don't have an Account?<a className="click" href="account/create">Click here</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
