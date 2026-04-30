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
    const [existingComments, setExistingComments] = useState([]);
    const [newComment, setNewComment] = useState('');
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
                setExistingComments(data.comments);
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
                    comments: newComment
                })
            });

            const setStates = () => {
                setAssignedUser('');
                setTicketStatus('');
                setNewComment('');
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
        <div className='container'>
            <div className='title-description-container'>
                <h1 className='title'>{ticketTitle}</h1>
                <p className='description'>{ticketDescription}</p>
            </div>
            <div className='prev-comments'>
                <h3>Comments</h3>
                {existingComments.map((comment) => (
                    <div key={comment._id} className='comment-div'>
                        <h3 className='commentor-and-time'>{comment.postedBy + " " + comment.createdAt}</h3>
                        <p className='comment-text'>{comment.text}</p>
                    </div>
                ))}
            </div>
            <div className='status-and-assignee-aside'>
                <h3>Status <br></br></h3>
                <p>{ticketStatus}</p>
                <h3>Assignee</h3><br></br>
                <p>{assignedUser}</p>    
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    id='comment'
                    className='comment'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}/>
                <label htmlFor='assignedUser' className='user-dropdown'>Change assigned user?</label>
                <Select
                    value={assignedUser}
                    options={assignableUsers}
                    onChange={(selectedOption) => setAssignedUser(selectedOption)} />
                <label htmlFor='status' className='status-dropdown'>Change status?</label>
                    <select 
                        id="status"
                        value={ticketStatus}
                        onChange={(e) => setTicketStatus(e.target.value)}>
                        <option value="Open">Open</option>
                        <option value="In progress">In progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                <button type='submit'>Save changes</button>
            </form>
        </div>
    );
}

export default DetailView;