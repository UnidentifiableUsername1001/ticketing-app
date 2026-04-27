import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config";
import { useAppContext } from "../../context/authContext";

function CreateTicket() {
    const [assignableUsers, setAssignableUsers] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const urlUsers = `${config.backendUrl}/api/users/`;
    const urlTickets = `${config.backendUrl}/api/tickets/create`;
    const jwtInStore = sessionStorage.getItem('auth-token');  

    useEffect (() => {
        const fetchAssignableUsers = async () => {
            try {            
                const response = await fetch(urlUsers, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/JSON',
                        'Content-Type': 'application/JSON',
                        Authorization: `Bearer ${jwtInStore}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}, ${response.message}`);
                    return;
                };
                const data = await response.json();
                setAssignableUsers(data.userArray);
            } catch (e) {
                console.error('Error fetching data: ' + e);
            }
        };
        fetchAssignableUsers();
    }, []);


    const returnToDashboard = () => {
        navigate('/dashboard');
    };


    const handleSubmit = async () => {
        try {
            const response = await fetch(urlTickets, {
                method: 'POST',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`,

                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    status: status,
                    assignedUser: assignedTo
                })
            });

            const setStates = () => {
                setTitle('');
                setDescription('');
                setAssignableTo('');
                setStatus('');
            }
            if(!response.ok) {
                const data = await response.json();
                throw new Error(`HTTP error: Status ${response.status}, ${data.message}`);
            }
            setStates();
            navigate('/dashboard');
        } catch (e) {
            console.error(e);
            setError(e.message);
        }
    };

    return (
        <div className="create-ticket-view">

        </div>
    )
}