import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const columnStyle = {
    maxWidth: '150px', // Adjust the width as needed
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};

const LoginHistory = () => {
    const [loginHistory, setLoginHistory] = useState([]);

    useEffect(() => {
        // Fetch recent login history data from your API or database here
        // Replace this with your actual API endpoint
        fetch('http://localhost:3000/admin/loginhistory', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setLoginHistory(data.rows);
            })
            .catch((error) => {
                console.error('Error fetching recent login history:', error);
            });
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar></Sidebar>
                    <div className="mb-3">
                        <h4>Recent Login History</h4>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th style={columnStyle}>USER MAIL</th>
                                        <th>LOGIN TIME</th>
                                        <th>LOGOUT TIME</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loginHistory.map((historyItem, index) => (
                                        <tr key={index}>
                                            <td style={columnStyle}>{historyItem.EMAIL.trim()}</td>
                                            <td>{historyItem.LOG_IN_TIME}</td>
                                            <td>{historyItem.LOG_OUT_TIME}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginHistory;
