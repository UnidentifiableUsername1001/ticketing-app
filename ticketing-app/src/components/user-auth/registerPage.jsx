import React, {useState} from "react";
import { config } from "../../../config";
import { useAppContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router";
import './RegisterPage.css';

function RegisterPage() {
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState('');
    const navigate = useNavigate('');
    const {setIsLoggedIn} = useAppContext();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${config.backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            })
            const data = await response.json();
            if (!response.ok) return setShowError(data.error);
            
            sessionStorage.setItem('auth-token', data.authToken);
            sessionStorage.setItem('name', data.firstName);
            sessionStorage.setItem('email', data.email);
            setIsLoggedIn(true);
            navigate('/app');
        } catch (e) {
            console.log('Error fetching details: ' + e.message);
        }
    }

    return (
        <div className="container">
            <div className="register-card">
                <h2 className="title">Register</h2>
                <form onSubmit={handleRegister}>
                        <label htmlFor="firstName" className="form label"> First Name</label><br></br>
                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                />
                        <label htmlFor="lastName" className="form label"> Last Name</label><br></br>
                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                />


                        <label htmlFor="email" className="form label">Email</label><br></br>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />


                        <label htmlFor="password" className="form label"> Password</label><br></br>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                    <button type="submit">Register</button>
                </form>
                <div className="subtext-section">
                        {showError ? (
                            <>
                                <p className="error-pop-up">
                                    {showError}
                                </p>
                            </>
                        ) : (
                            <>
                                {/* nothing to see here */}
                            </>
                        )}
                    <p className="login-redirect">
                        Already a member? <Link to="/app/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
};

export default RegisterPage;