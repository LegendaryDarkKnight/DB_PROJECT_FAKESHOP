import React, { useEffect, useState } from 'react';

function UserRequest() {
    const [requestData, setRequestData] = useState([]);

    useEffect(() => {
        // Fetch data from your API and update the state
        fetch('http://localhost:3000/admin/getRechargeOrder', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setRequestData(data.rows);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array to ensure the effect runs only once

    const handleApproveClick = async(userId) => {
        // Implement logic to handle the "Approve" button click for the specific user
        // You can make another API request or update the state as needed
        console.log(`Approve button clicked for USER_ID: ${userId}`);
    };

    return (
        <div>
            <h1>User Request Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>USER_ID</th>
                        <th>REQUEST_TIME</th>
                        <th>REQUEST_AMOUNT</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requestData.map((item) => (
                        <tr key={item.USER_ID}>
                            <td>{item.USER_ID}</td>
                            <td>{item.REQUEST_TIME}</td>
                            <td>{item.REQUEST_AMOUNT}</td>
                            <td>
                                <button onClick={() => handleApproveClick(item.USER_ID)}>
                                    Approve
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserRequest;
