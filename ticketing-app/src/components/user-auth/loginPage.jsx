import React, {useState} from "react";
import './loginPage.css';
import {config} from '../../config'
import { Link, useNavigate } from "react-router";
import { useAppContext } from "../../context/authContext";


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState('');
    const navigate = useNavigate();
    const {setIsLoggedIn} = useAppContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        try { 
            const response = await fetch(`${config.backendUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/JSON',
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                email: email,
                password: password
            }) 
        });

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
            <div className="login-card">
                <h2 className="title">Login</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email" className="login-input">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password" className="login-input">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="input"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
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
                    <p className="register-pivot">
                        New here? <Link to="/app/register">Register</Link>
                    </p>
                </div>                    
            </div>
        </div>
    )
}

export default LoginPage;