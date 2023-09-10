import { useState, useEffect } from 'react';
import Menu from './Menu';
import '../styles/MyOrder.css';
import Modal from './Modal';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(0);
    const [complainText, setComplainText] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('Default'); // Default filter option

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

    const handleReturnOrder = async (orderID, complainText, e) => {
        e.preventDefault();
        if (complainText == null || complainText == '') {
            alert('Empty Complain');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/order/return', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ orderID: orderID, complainText: complainText }),
                credentials: 'include'
            })
            if (!response.ok) {
                alert('Network Problem');
                return;
            }
            alert('Request Sent');
            window.location.reload();
        } catch (error) {
            alert('Problem in Network')
        }
    };

    const openModal = (orderID) => {

        setIsOpen(true);
        setSelected(orderID);
    }

    return (
        <>
            <Menu />
            <br />
            <br />
            <div className="order-list ">
                <div className='row'>
                    <div className='col-md-9' style={{ display: "flex", justifyContent: "center", fontSize: '30px' }}><strong>My Orders</strong></div>
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
                            <option value="Delivered">Delivered</option>
                            <option value="Not Delivered">Not Delivered</option>
                            <option value="Not Dispatched">Not Dispatched</option>
                        </select>
                    </div>

                </div>
                <br />
                <br />
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
                        {orders.filter((order) => {
                            if (selectedFilter === 'Default') return true;
                            if (selectedFilter === 'Delivered') return order.DELIVERY_STATUS === 'DELIVERED';
                            if (selectedFilter === 'Not Delivered') return order.DELIVERY_STATUS === 'NOT DELIVERED';
                            if (selectedFilter === 'Not Dispatched') return order.DELIVERY_STATUS === 'NOT DISPATCHED';
                            return false;
                        })
                            .map((order, index) => (
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
                                        {order.DELIVERY_DATE && order.STATUS == 'YES' && <button
                                            className="btn btn-primary"
                                            onClick={() => { openModal(order.ORDER_ID) }}
                                        >
                                            Return Order
                                        </button>}
                                        {order.DELIVERY_DATE && order.STATUS == 'NO' && <strong>Pending Aprroval</strong>}
                                        {!order.DELIVERY_DATE &&
                                            <strong>Unavailable</strong>
                                        }
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <div >
                        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                            <div className="form-group">
                                <label htmlFor="complain" style={{ fontWeight: 'bold', marginBottom: '10px' }}>Complain</label>
                                <textarea
                                    id="complain"
                                    name="complain"
                                    rows="4"
                                    cols="50"
                                    placeholder="Enter your complaint here"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        resize: 'vertical',
                                        fontSize: '16px'
                                    }}
                                    value={complainText}
                                    onChange={(e) => setComplainText(e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                style={{
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    marginTop: '10px'
                                }}
                                onClick={(e) => handleReturnOrder(selected, complainText, e)}
                            >
                                Submit
                            </button>
                        </form>

                    </div>
                </Modal>
            </div>
        </>
    );
};

export default MyOrder;
