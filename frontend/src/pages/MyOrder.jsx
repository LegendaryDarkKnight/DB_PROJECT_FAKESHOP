import { useState, useEffect } from 'react';
import Menu from './Menu';
import '../styles/MyOrder.css';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const [searchText, setSearchText] = useState('');


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const parsedDate = new Date(dateString);
        return parsedDate.toLocaleDateString(undefined, options);
    };
    
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
                console.error('Error fetching user data:', error);
            })
            .finally(() => {
                isCurrent = false; // Make sure to set isCurrent to false in the finally block
            });

        return () => {
            isCurrent = false; // Set isCurrent to false when the effect cleanup is performed
        };
      
    }, []);

    const handleReturnOrder = (orderId) => {

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
