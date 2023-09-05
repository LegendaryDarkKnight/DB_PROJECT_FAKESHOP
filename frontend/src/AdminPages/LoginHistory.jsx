import React, { useState, useEffect } from 'react';

const LoginHistory = () => {
    const [loginHistory, setLoginHistory] = useState([]);

    useEffect(() => {
        // Fetch recent login history data from your API or database here
        // Replace this with your actual API endpoint
        // fetch('http://localhost:3000/recent-login-history', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     credentials: 'include',
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setLoginHistory(data);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching recent login history:', error);
        //     });
    }, []);

    return (
        <div className="col">
            <div className="mb-3">
                <h4>Recent Login History</h4>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>IP Address</th>
                                <th>Location</th>
                                <th>Device</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loginHistory.map((historyItem, index) => (
                                <tr key={index}>
                                    <td>{historyItem.timestamp}</td>
                                    <td>{historyItem.ipAddress}</td>
                                    <td>{historyItem.location}</td>
                                    <td>{historyItem.device}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LoginHistory;
