import { useState, useEffect } from 'react';
import Menu from './Menu';
import '../styles/MyOrder.css';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        let isCurrent = true;

        fetch(`http://localhost:3000/order/getUserOrders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        }).then(res => res.json())
            .then((orders) => {
                if (isCurrent) {
                    setOrders(orders.rows);
                }
            })
            .catch((error) => {
                // Handle any errors that occur during the fetch request
                console.error('Error fetching user data:', error);
            })
            .finally(() => {
                isCurrent = false; // Make sure to set isCurrent to false in the finally block
            });

        return () => {
            isCurrent = false; // Set isCurrent to false when the effect cleanup is performed
        };
        // You can fetch the data from your backend API here
        // Example: fetch('/api/orders')
        //   .then(response => response.json())
        //   .then(data => setOrders(data));

        // For demonstration, I'll create a sample data structure
        // const sampleData = [
        //   {
        //     PRODUCT_ID: 1,
        //     PRODUCT_NAME: 'Product 1',
        //     IMAGE: 'product1.jpg',
        //     COST: 100.00,
        //     ORDERED_ON: '01/September/2023',
        //     DELIVERY_STATUS: 'Delivered',
        //     DELIVERY_DATE: '05/September/2023',
        //   },
        //   // Add more order objects as needed
        // ];

        // setOrders(sampleData);
    }, []);

    const handleReturnOrder = (orderId) => {
        // Implement the logic to return the order here
        // Example: send a request to your backend to process the return
        // and then update the UI accordingly
    };

    const filteredOrders = orders.filter((order) =>
        order.PRODUCT_NAME.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <>
            <Menu />
            <br/>
            <br/>
            <div className="order-list ">
                <div className='row'>
                    <div className='col-md-9' style={{display:"flex", justifyContent:"center", fontSize: '30px'}}><strong>My Orders</strong></div>
                    <div className='col-md-3'>
                        <input
                            type="text"
                            placeholder="My Order"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </div>
                <br/>
                <br/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Image</th>
                            <th>Cost</th>
                            <th>Ordered On</th>
                            <th>Delivery Status</th>
                            <th>Delivery Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order,index) => (
                            <tr key={index} className="hover-effect">
                                <td>{order.PRODUCT_NAME}</td>
                                <td>
                                    <img
                                        src={'../../productImage/' + order.IMAGE}
                                        alt="Product"
                                        width="50"
                                        height="50"
                                    />
                                </td>
                                <td>{order.COST}</td>
                                <td>{order.ORDERED_ON}</td>
                                <td>{order.DELIVERY_STATUS}</td>
                                <td>{order.DELIVERY_DATE ? order.DELIVERY_DATE : "NOT DECIDED"}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleReturnOrder(order.PRODUCT_ID)}
                                    >
                                        Return Order
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyOrder;
