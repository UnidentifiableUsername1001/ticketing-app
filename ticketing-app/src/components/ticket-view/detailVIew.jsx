import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { config } from '../../../config';
import Select from 'react-select';
import useAssignableUsers from '../../hooks/useAssignableUsers';
import { jwtDecode } from 'jwt-decode';
import { useAppContext } from '../../context/authContext';
import statusMapping from '../../hooks/ticketConstants';

function DetailView() {
    const [ticketTitle, setTicketTitle] = useState('');
    const [ticketDescription, setTicketDescription] = useState('');

    const [ticketStatus, setTicketStatus] = useState({});
    const [draftStatus, setDraftStatus] = useState(null);

    const [assignedUser, setAssignedUser] = useState({});
    const [draftAssignee, setDraftAssignee] = useState(null);

    const [existingComments, setExistingComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();
    const url = config.backendUrl;
    const jwtInStore = sessionStorage.getItem('auth-token');
    const params = useParams();
    const assignableUsers = useAssignableUsers();
    const statusOptions = statusMapping();
    

    useEffect (() => {
        const fetchSelectedTicket = async () => {
            try {
                const response = await fetch(`${url}/api/ticket/${params.ticketId}`, {
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
                const statusObject = {value: data.status, label: data.status};
                const assigneeObject = {value: data.assignedTo._id, label: data.assignedTo.firstName + " " + data.assignedTo.lastName}
                const reversedComments = data.comments.reverse();

                setTicketTitle(data.title);
                setTicketDescription(data.description);
                setTicketStatus(statusObject);
                setDraftStatus(statusObject);
                setDraftAssignee(assigneeObject);
                setAssignedUser(assigneeObject);
                setExistingComments(reversedComments);
            } catch (e) {
                console.log('Error fetching data: ' + e);
            }
        }
        fetchSelectedTicket();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const decodedToken = jwtDecode(jwtInStore);
            const currentUserId = decodedToken.user.id;

            const assigneeId = typeof draftAssignee === 'object' ? draftAssignee.value : draftAssignee;
            const destructStatus = typeof draftStatus === 'object' ? draftStatus.value : draftStatus;

            const payload = {
                status: destructStatus,
                assignedUser: assigneeId,
            };

            if (newComment.trim() !== '') {
                payload.newComment = {
                    text: newComment,
                    postedBy: currentUserId
                };
            }

            const response = await fetch(`${url}/api/ticket/${params.ticketId}`, { 
                method: 'PUT',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`,
                },
                body: JSON.stringify(payload) 
            });

            const setStates = () => {
                setAssignedUser('');
                setTicketStatus('');
                setNewComment('');
            }

            if (!response.ok) {
                const data = await response.json();
                throw new Error(`HTTP error, status ${response.status}, ${data.error}`);
            }
            
            setStates();
            navigate('/dashboard');
        } catch (e) {
            console.error(e);
        }
    };

    console.log(existingComments);
    return (
        <div className='min-h-screen bg-wisePaleGrey pt-32'>
            <div className='grid grid-cols-20'>
                <div className='bg-wiseOffWhite col-span-8 col-start-4 col-end-12 p-8 rounded-md shadow-md'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-8'>
                            <h1 className='font-wise font-bold text-4xl'>{ticketTitle}</h1>
                            <div className=''>
                                <h3 className='font-lato font-semibold text-1xl'>Description</h3>
                                <p className='description'>{ticketDescription}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-lato font-semibold text-1xl'>Comments</h3>
                            <input 
                                type='text'
                                id='comment'
                                className='font-lato p-2 shadow-md border-b border-gray-400 rounded-b-md hover:bg-wiseSkin/15'
                                placeholder='Add a new comment'
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}/>
                        </div>
                        <div className='flex flex-col gap-8'>
                            {existingComments.map((comment, index) => (
                                <div key={index} className=''>
                                    {comment ? (<>
                                        <h3><span className='font-lato font-semibold text-1xl'>{comment.postedBy?.firstName + " " + comment.postedBy?.lastName + " "}</span><span className='text-gray-500 font-lato italic pl-3 text-sm'>{new Date(comment.createdAt).toLocaleString()}</span></h3>
                                        <p className='font-lato'>{comment.text}</p>                           
                                    </>) : (<></>)}
                                </div>
                            ))}
                        </div>
                    </div>    
                </div>
                <div className='sidebar col-span-4 col-start-13'>
                    <div className='flex flex-col gap-8'>
                        <div>
                            <h3 className='font-lato font-semibold text-1xl'>Status</h3>
                            <p className='font-lato font-light text-lg'>{ticketStatus.value}</p>
                        </div>
                        <div>
                            <h3 className='font-lato font-semibold text-1xl'>Assignee</h3>
                            <p className='font-lato font-light text-lg'>{typeof assignedUser === 'object' ? assignedUser.label : assignedUser}</p>
                        </div>
                        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor='assignedUser' className='font-lato font-semibold text-1xl'>Change assigned user?</label>
                                <Select
                                    value={draftAssignee}
                                    options={assignableUsers}
                                    onChange={(selectedOption) => setDraftAssignee(selectedOption)} />
                            </div>
                            <div>
                                <label htmlFor='status' className='font-lato font-semibold text-1xl'>Change status?</label>
                                    <Select
                                        value={draftStatus}
                                        options={statusOptions}
                                        onChange={(selectedOption) => setDraftStatus(selectedOption)} />
                            </div>
                            <button type='submit' className='bg-wiseSkin rounded-full w-20 self-center p-2 cursor-pointer'>Save</button>
                        </form>
                    </div>    
                </div>
            </div>
        </div>
    );
}

export default DetailView;