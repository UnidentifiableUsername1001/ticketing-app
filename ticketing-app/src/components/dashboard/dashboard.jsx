import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../../../config';
import { useAppContext } from '../../context/authContext';

function Dashboard() {
    const [tickets, setTickets] = useState([]);
    const [showError, setShowError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                let url = `${config.backendUrl}/api/ticket/`;
                const jwtInStore = sessionStorage.getItem('auth-token'); 
                const response = await fetch(url, {
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
                setTickets(data.ticketArray);
            } catch (e) {
                console.log('Error fetching data: ' + e.message);
            }
        };
        fetchTickets();
    }, []);

    const goToTicket = (ticketId) => {
        navigate(`/app/ticket/${ticketId}`);
    };

    return (
        <div className='container'>
            <div className='row'>
                {tickets.map((ticket) => (
                    <div key={ticket._id} className='ticket-div'>
                        <div className='title'><a onClick={() => {goToTicket(ticket._id)}}>{ticket.title}</a></div>
                        {ticket.assignedTo ? (
                            <div className='assignee'>{ticket.assignedTo.firstName}</div> 
                        ) : (
                            <div className='no-assignee'>Unassigned</div>    
                        )}
                        <div className='status'>{ticket.status}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard