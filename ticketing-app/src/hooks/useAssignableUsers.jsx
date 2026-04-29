import React, {useState, useEffect} from 'react';
import { config } from "../../../config";

function useAssignableUsers() {
    const [assignableUsers, setAssignableUsers] = useState([]);
    const urlUsers = `${config.backendUrl}/api/users/`;
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
            const mappedArray = data.userArray.map(({_id, firstName, lastName}) => ({
                value: _id, 
                label: firstName + " " + lastName}))
            setAssignableUsers(mappedArray);
        } catch (e) {
            console.error('Error fetching data: ' + e);
        }
    };
        fetchAssignableUsers();
    }, []);

    return assignableUsers;
}

export default useAssignableUsers;