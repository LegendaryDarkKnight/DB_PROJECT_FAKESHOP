import { useState, useEffect } from 'react';
import Menu from './Menu';
import '../styles/MyOrder.css';
import { useNavigate } from 'react-router-dom';

const ShopOrder = () => {
    const [orders, setOrders] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        let isCurrent = true;

        fetch(`http://localhost:3000/order/getShopOrders`, {
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

    }, []);

    const handleReturnOrder = async(orderID) => {
        try {
            const response = await fetch('http://localhost:3000/shop/dispatch',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({orderID: orderID}),
                credentials: 'include',
            })
            if(!response.ok){
                alert('Fault');
                return;
            }
            alert('Success');
            navigate('/shopOrder');
        } catch (error) {
            console.log(error);
        }
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
                                    {order.DELIVERY_STATUS == 'NOT DISPATCHED' &&<button
                                        className="btn btn-primary"
                                        onClick={() => handleReturnOrder(order.ORDER_ID)}
                                    >
                                        Dispatch
                                    </button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ShopOrder;
