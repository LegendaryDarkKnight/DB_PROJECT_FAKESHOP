import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu'; // Make sure to adjust the import path
import '../styles/Cart.scss'
import Modal from './Modal2';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App";
const CartpropsCard = ({
    image,
    name,
    price,
    quantity,
    onQuantityIncrease,
    onQuantityDecrease,
    onRemoveCartItem,
    isChecked,
    onToggleCheckbox,
    index,
    stock
}) => {
    return (
        <div className="card">
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={isChecked}
                    onChange={() => onToggleCheckbox(index)}
                />
            </div>
            <button className="card__btn card__btn--remove" onClick={() => onRemoveCartItem(index)}>
                <FaTimes className="cross-icon" />
            </button>
            <img src={image} alt={name} className="card__image" />
            <div className="card__title">
                <h5>{name}</h5>
            </div>
            <div className="card__description">
                <p>Price: {price} Tk</p>

                <div className="quantity-controls">
                    <button className="card__btn card__btn--decrease" onClick={() => onQuantityDecrease(index)} disabled={quantity === 1}>
                        -
                    </button>
                    <span className="quantity"> {quantity} </span>
                    <button className="card__btn card__btn--increase" onClick={() => onQuantityIncrease(index)} disabled={quantity === stock} >+</button>
                </div>
            </div>
        </div>
    );
};

CartpropsCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    onQuantityIncrease: PropTypes.func.isRequired,
    onQuantityDecrease: PropTypes.func.isRequired,
    onRemoveCartItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    singlePrice: PropTypes.number.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onToggleCheckbox: PropTypes.func.isRequired
};

const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();
    const fetchCartData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/cart`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            if (!response.ok) {
                console.log('not ok');
            }
            const data = await response.json();
            console.log('dara' + data);
            setCartData(data.rows);
            setCheckedItems(data.rows.map(item => item.STATUS === 'PICKED'))
        } catch (error) {
            console.log('Error fetching cart data:', error);
        }
    };
    const fetchDeliveryCharge = async () => {
        try {
            const response = await fetch(`http://localhost:3000/cart/deliverycharge`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            if (!response.ok) {
                console.log('not ok');
            }
            const data = await response.json();
            setDeliveryCharge(data.rows[0].DELIVERY_CHARGE);
        } catch (error) {
            console.log('Error fetching cart data:', error);
        }
    }
    const updateCart = async (productID, amount, totalPrice) => {
        try {
            const response = await fetch(`http://localhost:3000/cart/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productID: productID, amount: amount, totalPrice: totalPrice }),
                credentials: 'include',
            });
            if (response.ok)
                console.log('updated');
            else
                console.log('trouble')
        } catch (error) {
            console.log('Error fetching cart data:', error);
        }
    };
    const updateCartStatus = async (productID, status) => {
        try {
            const response = await fetch(`http://localhost:3000/cart/updateStatus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productID: productID, status: status }),
                credentials: 'include',
            });
            if (response.ok)
                console.log('updated status');
            else
                console.log('trouble updating status')
        } catch (error) {
            console.log('Error fetching cart data:', error);
        }
    };
    const removeCart = async (productID) => {
        try {
            const response = await fetch(`http://localhost:3000/cart/remove`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productID: productID }),
                credentials: 'include',
            });
            if (response.ok)
                console.log('removed');
            else
                console.log('trouble')
        } catch (error) {
            console.log('Error fetching cart data:', error);
        }
    };

    useEffect(() => {
        fetchCartData();
        fetchDeliveryCharge();

    }, []);

    const handleQuantityChange = async (itemIndex, newQuantity) => {
        const updatedCartData = [...cartData];
        console.log(updatedCartData)
        updatedCartData[itemIndex].QUANTITY = newQuantity;
        updatedCartData[itemIndex].TOTAL_PRICE = newQuantity * updatedCartData[itemIndex].PRICE;
        await updateCart(updatedCartData[itemIndex].PRODUCT_ID, updatedCartData[itemIndex].QUANTITY, updatedCartData[itemIndex].TOTAL_PRICE);
        await fetchDeliveryCharge();

        setCartData(updatedCartData);
    };
    const handleRemoveCartItem = async (itemIndex) => {
        const updatedCartData = cartData.filter((_, index) => index !== itemIndex);
        console.log(cartData[itemIndex].PRODUCT_ID);

        await removeCart(cartData[itemIndex].PRODUCT_ID);
        await fetchDeliveryCharge();

        setCartData(updatedCartData);
    };

    const handleToggleCheckbox = async (index) => {
        const updatedCartData = [...cartData];
        updatedCartData[index].STATUS = updatedCartData[index].STATUS === 'PICKED' ? 'ADDED' : 'PICKED';
        const updatedCheckedItems = updatedCartData.map(item => item.STATUS === 'PICKED');
        await updateCartStatus(cartData[index].PRODUCT_ID, updatedCartData[index].STATUS);
        await fetchDeliveryCharge();
        setCartData(updatedCartData);
        setCheckedItems(updatedCheckedItems);
    };

    const renderSelectedItemsTable = () => {
        return checkedItems.map((isChecked, index) => {
            if (isChecked) {
                const item = cartData[index];

                return (
                    <>
                        {item && <tr key={item.PRODUCT_ID}>
                            <td>{item.PRODUCT_NAME}</td>
                            <td>{item.TOTAL_PRICE} Tk</td>
                        </tr>}
                    </>
                );
            }
            return null;
        }
        );
    };
    const handleConfirmOrder = async () => {
        if(calculateTotalPrice() + deliveryCharge == 0){
            alert('No items selected');
            return;
        }
        if (userData.rows[0].TOTAL_CREDITS < calculateTotalPrice() + deliveryCharge) {
            alert('Not enough Money in wallet');
            return;
        }
        const selectedItems = cartData.filter((_, index) => checkedItems[index]);
        setIsOpen(true);
        console.log("Selected Items:", selectedItems);
    };
    const handlePurchasedOrder = async () => {
        try {
            const response = await fetch(`http://localhost:3000/order/place`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({deliveryCharge: deliveryCharge}),
                credentials: 'include',
            });
            if (response.ok)
                console.log('Ordered');
            else
                console.log('trouble')
        } catch (error) {
            console.log('Error ordering:', error);
        }
        navigate('/');
        alert('SuccessFul');
    };
    const calculateTotalPrice = () => {
        const total = checkedItems.reduce((acc, isChecked, index) => {
            if (isChecked && cartData[index]) {
                return acc + cartData[index].TOTAL_PRICE;
            }
            return acc;
        }, 0);
        return total;
    };

    return (
        <>
            <Menu />
            <br />
            <div style={{ textAlign: "center" }}>
                <h3>
                    Your Cart
                </h3>
            </div>
            <br />
            <br />
            <div className="wrapper">
                {cartData.map((contents, index) => (
                    <CartpropsCard
                        key={index}
                        image={'../../productImage/' + contents.IMAGE}
                        name={contents.PRODUCT_NAME}
                        price={contents.TOTAL_PRICE}
                        singlePrice={contents.PRICE}
                        quantity={contents.QUANTITY}
                        index={index}
                        stock={contents.STOCK}
                        onQuantityIncrease={() => handleQuantityChange(index, contents.QUANTITY + 1)}
                        onQuantityDecrease={() => handleQuantityChange(index, Math.max(contents.QUANTITY - 1, 1))}
                        onRemoveCartItem={handleRemoveCartItem}
                        isChecked={contents.STATUS == 'PICKED'}
                        onToggleCheckbox={() => handleToggleCheckbox(index)}
                    />
                ))}
                {cartData.length === 0 && <div>No data</div>}
            </div>
            <br />
            <br />
            <br />
            <br />
            <div style={{ textAlign: "center" }}>
                <h3>
                    Selected Items
                </h3>
            </div>

            <div className="container mt-5">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderSelectedItemsTable()}
                    </tbody>
                </table>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Delivary Charge</th>
                            <th>{deliveryCharge}</th>
                        </tr>
                    </thead>
                </table>
                <div className="text-center">
                    <h4 className="mb-4">
                        Total Price: {calculateTotalPrice() + deliveryCharge} Tk
                    </h4>
                    <button className="btn btn-primary btn-lg" onClick={handleConfirmOrder}>
                        Confirm Order
                    </button>
                </div>
            </div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="container mt-5" style={{ maxHeight: "350px", overflowY: "scroll" }}>
                    <div style={{ maxHeight: "100%" }}>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderSelectedItemsTable()}
                            </tbody>
                        </table>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Delivery Charge</th>
                                    <th>{deliveryCharge}</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="text-center">
                        <h4 className="mb-4">
                            Total Price: {calculateTotalPrice() + deliveryCharge} Tk
                        </h4>
                        <button className="btn btn-primary btn-lg" onClick={handlePurchasedOrder}>
                            Confirm Purchase
                        </button>
                    </div>
                </div>



            </Modal>
            <br />
            <br />
        </>
    );
};

export default Cart;
