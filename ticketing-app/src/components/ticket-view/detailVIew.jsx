import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { config } from '../../../config';
import {Select} from 'react-select';
import useAssignableUsers from '../../hooks/useAssignableUsers';

function DetailView() {
    const [ticketTitle, setTicketTitle] = useState('');
    const [ticketDescription, setTicketDescription] = useState('');
    const [ticketStatus, setTicketStatus] = useState('');
    const [assignedUser, setAssignedUser] = useState('');
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const url = config.backendUrl;
    const jwtInStore = sessionStorage.getItem('auth-token');
    const params = useParams();
    const assignableUsers = useAssignableUsers();

    useEffect (() => {
        const fetchSelectedTicket = async () => {
            try {
                const response = await fetch(`${url}/api/ticket/:ticketId`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/JSON',
                        'Content-Type':'application/JSON',
                        Authorization: `Bearer ${jwtInStore}`,
                    }
                });
            
                if(!response.ok) {
                    throw new Error(`HTTP error, status ${response.status}`);
                }
                const data = await response.json();
                setTicketTitle(data.title);
                setTicketDescription(data.description);
                setTicketStatus(data.status);
                setAssignedUser(data.assignedTo);
            } catch (e) {
                console.log('Error fetching data: ' + e);
            }
        }
        fetchSelectedTicket();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/api/ticket/:ticketId`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`,
                },
                body: JSON.stringify({
                    status: ticketStatus,
                    assignedUser: assignedUser.value,
                    comments: comment
                })
            });

            const setStates = () => {
                setAssignedUser('');
                setTicketStatus('');
                setComment('');
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
}