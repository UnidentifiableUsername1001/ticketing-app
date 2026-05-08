import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config";
import { useAppContext } from "../../context/authContext";
import Select  from 'react-select';
import useAssignableUsers from '../../hooks/useAssignableUsers'
import statusMapping from "../../hooks/ticketConstants";

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
    const statusOptions = statusMapping();

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
        <div className="min-h-screen bg-wisePaleGrey pt-32">   
            <div className="grid grid-cols-5">
                <div className="col-span-3 col-start-2 w-4/6 mx-auto">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-wiseOffWhite shadow-md rounded-md p-8">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title" className="font-lato font-semibold text-1xl">Title<span className="text-wiseDarkPink">*</span></label>
                            <input 
                                type="text"
                                id="title"
                                className="p-2 bg-white font-lato shadow-sm rounded-sm hover:shadow-lg hover:bg-wiseDarkPink/10"
                                placeholder="Write a brief title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="description" className="font-lato font-semibold text-1xl">Description<span className="text-wiseDarkPink">*</span></label>
                            <input 
                                type="text"
                                id="description"
                                className="p-8 bg-white shadow-sm rounded-sm hover:shadow-lg font-lato hover:bg-wiseDarkPink/10"
                                placeholder="Write a detailed description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="status" className="font-lato font-semibold text-1xl">Status<span className="text-wiseDarkPink">*</span></label>
                            <div className="w-1/3">
                                <Select 
                                    value={status}
                                    options={statusOptions} 
                                    onChange={(selectedOption) => setStatus(selectedOption)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="assignedUser" className="font-lato font-semibold text-1xl">Assigned To?</label>
                            <div className="w-1/3">
                                <Select
                                    value={assignedTo}
                                    options={assignableUsers} 
                                    onChange={(selectedOption) => setAssignedTo(selectedOption)}/>
                            </div>
                        </div>
                        <button type="submit" className="cursor-pointer bg-wiseSkin hover:bg-wiseDarkPink rounded-full w-1/7 mx-auto p-4 font-lato font-medium shadow-sm hover:shadow-lg">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTicket;