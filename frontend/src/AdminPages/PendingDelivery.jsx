import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'
import Modal from './Modal'

function ProductCard(props) {
    const { productName, shopName, customerContact, Name, Image, Address, orderID} = props;
    const [isOpen, setIsOpen] = useState(false);
    const handleDeliverClick = async() => {
        // Add your logic for handling the delivery button click here
        try {
            const response = await fetch('http://localhost:3000/admin/deliver', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({orderID:orderID}),
                credentials: 'include',
            })
            if(!response.ok){
                alert('Response Not Ok');
                return; 
            }
            
        } catch (error) {
            alert('Error Found');
            return;
        }
        alert(`Delivering ${productName} to ${customerContact}`);
        window.location.reload();
    };

    return (
        <div className="product-card card" style={{ height: "210px", marginTop: '20px', maxWidth: '100vw', width: '600px' }}>
            <div className="card-body">
                <h6 className="card-title">Customer Name: {Name}</h6>
                <p className="card-text">Shop: {shopName}</p>
                <p className="card-text">Customer Contact: {customerContact}</p>
                <p className="card-text">Customer Address: {Address}</p>
                <div className='row'>
                    <div className='col-9'>
                        <button
                            className="btn btn-warning"
                            onClick={() => { setIsOpen(true) }}
                        >
                            View Delivery Details
                        </button>
                    </div >
                    <div className='col-3'>
                        <button
                            className="btn btn-primary"
                            onClick={handleDeliverClick}
                        >
                            Deliver
                        </button>
                    </div>


                </div>
            </div>
            <hr />
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <h6>{productName}</h6>
                <img src={Image} style={{height:'300px', width:'400px'}}></img>
            </Modal>
        </div>
    );
}

function PendingDelivery() {
    // Dummy data for product cards
    const [productData, setProductData] = useState([
    ]);

    useEffect(() => {
        let isCurrent = true;

        fetch(`http://localhost:3000/admin/pendingDelivery`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then((data) => {
                if (isCurrent) {
                    setProductData(data.rows);
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



    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar />
                    {/* Rendering product cards using map */
                        console.table(productData)
                    }
                    <div>
                        <h1 style={{marginLeft:'100px'}}>Pending Deliveries</h1>
                        {productData.map((product, index) => (
                            <ProductCard
                                key={index}
                                Name = {product.NAME}
                                productName={product.PRODUCT_NAME}
                                shopName={product.SHOP_NAME}
                                customerContact={product.CONTACT}
                                Image = {'../../productImage/'+product.IMAGE}
                                Address = {product.ADDRESS}
                                orderID = {product.ORDER_ID}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}


export default PendingDelivery;
