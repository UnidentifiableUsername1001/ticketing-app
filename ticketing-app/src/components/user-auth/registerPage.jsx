import React, {useState} from "react";
import { config } from "../../../config";
import { useAppContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router";



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
            if (!response.ok) return setShowError(data.message);
            
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
        <div className="registration-component">
            <div className="absolute inset-0 bg-linear-to-b from-bgMain/50 to-bgMain"></div>
            <div className="p-12 -mt-64 relative">
                <h2 className="title text-center bg-green-400 -mt-6 mb-6">Register</h2>
                <form className="bg-wiseOffWhite/10 backdrop-blur-sm rounded-sm flex flex-col p-8 gap-6 items-center" onSubmit={handleRegister}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="firstName" className="form-label"> First Name</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    className="form-control"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="lastName" className="form-label"> Last Name</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Smith"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    />
                        </div>
                        <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        </div>
                        <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="form-label"> Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        </div>
                        <div className="flex flex-row gap-6">
                            <button className="bg-wiseSkin p-2 rounded-full" type="submit">Register</button>                         
                        </div>
                </form>
                <p className="text-wiseOffWhite text-center"> Already a member? <Link className="text-wiseSkin underline" to="/app/login">Login</Link></p>
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
                </div>
            </div>
        </div>
    )
};

export default RegisterPage;