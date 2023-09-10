import { useState, useEffect } from 'react';
import Sidebar from './Sidebar'


function ProductCard(props) {
    const { productName, shopName, Name, orderID, complaint } = props;
    const handleApprove = async (orderID) => {
        // Add your logic for handling the delivery button click here
        try {
            const response = await fetch('http://localhost:3000/admin/approveReturn', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderID: orderID }),
                credentials: 'include',
            })
            if (!response.ok) {
                alert('Response Not Ok');
                return;
            }

        } catch (error) {
            alert('Error Found');
            return;
        }
        window.location.reload();
    };

    const handleRefuse = async (orderID) => {
        try {
            const response = await fetch('http://localhost:3000/admin/refuseReturn', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderID: orderID }),
                credentials: 'include',
            })
            if (!response.ok) {
                alert('Response Not Ok');
                return;
            }

        } catch (error) {
            alert('Error Found');
            return;
        }
        window.location.reload();
    }
    return (
        <div className="product-card card" style={{ height: "auto", marginTop: '20px', maxWidth: '100vw', width: '600px' }}>
            <div className="card-body">
                <h6 className="card-title">Customer Name: {Name}</h6>
                <p className="card-text"><strong>Shop: </strong> {shopName}</p>
                <p className="card-text"><strong>Product Name: </strong>{productName}</p>
                <p className="card-text"><strong>Complain: </strong>{complaint}</p>
                <div className='row'>
                    <div className='col-9'>
                        <button
                            className="btn btn-warning"
                            onClick={() => { handleApprove(orderID) }}
                        >
                            Approve
                        </button>
                    </div >
                    <div className='col-3'>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleRefuse(orderID)}
                        >
                            Refuse
                        </button>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
}

function PendingReturn() {
    // Dummy data for product cards
    const [productData, setProductData] = useState([
    ]);

    useEffect(() => {
        let isCurrent = true;

        fetch(`http://localhost:3000/admin/pendingReturn`, {
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
                    <div className='mx-6'>
                        <h1 style={{ marginLeft: '100px' }}>Pending Deliveries</h1>
                        {productData.map((product, index) => (
                            <ProductCard
                                key={index}
                                Name={product.NAME}
                                productName={product.PRODUCT_NAME}
                                shopName={product.SHOP_NAME}
                                orderID={product.ORDER_ID}
                                complaint={product.COMPLAINT}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}


export default PendingReturn;
