import react, {useState, useEffect} from "react";

import {config} from '../../config'

function TestPage() {
    const [test, setTest] = useState('')

    useEffect(() => {
        const callTestRoute = async () => {
            try {
                let url = `${config.backendUrl}/api/test`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                } 
                const data = await response.text();
                setTest(data);
            } catch (error) {
                console.log('Fetch error: ' + error);
            }
        };

        callTestRoute();
    }, []);

    return (
        <div>{test}</div>
    )
}

export default TestPage;