import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config";
import { useAppContext } from "../../context/authContext";
import Select  from 'react-select';
import {useAssignableUsers} from '../../hooks/useAssignableUsers'

function CreateTicket() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [assignedTo, setAssignedTo] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const urlTickets = `${config.backendUrl}/api/ticket/create`;
    const jwtInStore = sessionStorage.getItem('auth-token');
    const assignableUsers = useAssignableUsers();

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                    assignedUser: assignedTo.value
                })
            });

            const setStates = () => {
                setTitle('');
                setDescription('');
                setAssignedTo('');
                setStatus('');
            }
            if(!response.ok) {
                const data = await response.json();
                throw new Error(`HTTP error, status ${response.status}, ${data.error}`);
            }
            setStates();
            navigate('/dashboard');
        } catch (e) {
            console.error(e);
            setError(e.message);
        }
    };

    return (
        <div className="container">   
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title" className="title">Title</label>
                    <input 
                        type="text"
                        id="title"
                        className="title"
                        placeholder="Write a brief title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    <label htmlFor="description" className="description-title">Description</label>
                    <input 
                        type="text"
                        id="description"
                        className="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    <label htmlFor="status" className="status-dropdown">Status</label>
                    <select 
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        <option value="" disabled>Select a status</option> 
                        <option value="Open">Open</option>
                        <option value="In progress">In progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <label htmlFor="assignedUser" className="assignedUser">Assigned To?</label>
                    <Select
                        value={assignedTo}
                        options={assignableUsers} 
                        onChange={(selectedOption) => setAssignedTo(selectedOption)}/>
                    <button type="submit">Create ticket</button>
                </form>
            </div>
        </div>
    )
}

export default CreateTicket;