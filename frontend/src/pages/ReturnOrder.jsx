import React, { useState, useEffect } from 'react';
import Menu from './Menu';

const ReturnOrder = () => {
    const [orders, setOrders] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('Default'); // Default selected filter

    useEffect(() => {
        let isCurrent = true;

        fetch(`http://localhost:3000/order/getReturnOrders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then((orders) => {
                if (isCurrent) {
                    setOrders(orders.rows);
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            })
            .finally(() => {
                isCurrent = false;
            });

        return () => {
            isCurrent = false;
        };
    }, []);

    // Filter the orders based on the selected filter value
    const filteredOrders = selectedFilter === 'Approved'
        ? orders.filter((order) => order.STATUS === 'APPROVED')
        : selectedFilter === 'Pending'
            ? orders.filter((order) => order.STATUS === 'PENDING')
            : orders;


    return (
        <>
            <Menu />
            <br />
            <br />
            <div className="order-list ">
                <div className='row'>
                    <div className='col-md-9' style={{ display: "flex", justifyContent: "center", fontSize: '30px' }}>
                        <strong>Returned Orders</strong>
                    </div>
                    <div className='col-md-3'>
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px',
                                backgroundColor: '#fff',
                                backgroundImage: 'linear-gradient(to bottom, #f9f9f9, #fff 25px)'
                            }}
                        >
                            <option value="Default">Default</option>
                            <option value="Approved">Approved</option>
                            <option value="Pending">Pending</option>
                        </select>

                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Approval Status</th>
                            <th>Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order, index) => (
                            <tr key={index} className="hover-effect">
                                <td>{order.PRODUCT_NAME}</td>
                                <td>{order.STATUS}</td>
                                <td>{order.RETURN_DATE || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ReturnOrder;
