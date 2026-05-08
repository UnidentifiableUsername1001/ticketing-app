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
        navigate(`/ticket/${ticketId}`);
    };

    const colorRender = (status) => {
        if (status === 'Open') return (<span className="bg-red-500 rounded-md p-1 text-wiseOffWhite">{status}</span>);
        if (status === 'In progress') return (<span className="bg-yellow-500 rounded-md p-1 text-bgMain">{status}</span>);
        if (status === 'Closed') return (<span className="bg-gray-500 rounded-md p-1 text-wiseOffWhite">{status}</span>);
    }

    return (
        <div className='bg-wisePaleGrey min-h-screen'>
            <div className='max-w-6xl mx-auto'>
                <table className='w-full text-left border-collapse'> 
                    <thead className=''>
                        <tr className='text-bgMain font-bold font-lato text-xl border-b border-bgMain'>
                            <th className='py-3 px-4'>Status</th>
                            <th className='py-3 px-4'>Title</th>
                            <th className='py-3 px-4'>Requester</th>
                            <th className='py-3 px-4'>Requested</th>
                            <th className='py-3 px-4'>Assignee</th>
                        </tr>
                    </thead>
                    <tbody className='font-lato font-light'>
                        {tickets.map((ticket) => (
                            <tr key={ticket._id} onClick={() => {goToTicket(ticket._id)}} className='border-b border-bgMain hover:bg-wiseSkin cursor-pointer transition-colors duration-200'>
                                {ticket.status !== 'Closed' ? (
                                    <>
                                        <td className='py-3 px-4'>{colorRender(ticket.status)}</td>
                                        <td className='py-3 px-4'>{ticket.title}</td>
                                        <td className='py-3 px-4'>{ticket.createdBy.firstName + " " + ticket.createdBy.lastName}</td>
                                        <td className='py-3 px-4'>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                                        {ticket.assignedTo ? (
                                            <td className='py-3 px-4'>{ticket.assignedTo.firstName + " " + ticket.assignedTo.lastName}</td> 
                                        ) : (
                                            <td className='py-3 px-4'>Unassigned</td>    
                                        )}
                                    </>    
                                ) : (<></>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard