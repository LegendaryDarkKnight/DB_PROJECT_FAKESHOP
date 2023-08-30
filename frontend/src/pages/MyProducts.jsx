import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Products.scss";
import Menu from "./Menu";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../App';
import Modal from './Modal';
import ProductChangeForm from "./ProductChangeForm";
export const CardContext = React.createContext();
function Card(props) {
    const [values, setValues] = useState({
        name: props.title,
        description: props.description,
        stock: props.stock,
        price: props.price
    }); 
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    const handleChange = async () => {
        setIsOpen(false);
        console.log(values);
        try {
            const response = await fetch("http://localhost:3000/shop/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({type: 'all', productID: props.productID, stock: values.stock, price: values.price, name: values.name}),
                credentials: 'include',
            });

            if (!response.ok) {
                console.error("Network response was not ok");
                return;
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        }
        navigate('/myProducts');
    };
    return (
        <CardContext.Provider value = {{setValues}}>
            <div className="card">
            <div className="card__body">
                <img src={props.image} alt={props.title} className="card__image" />
                <h5 className="card__title">{props.title}</h5>
                <p className="card__description"><strong>Price: </strong>{props.price}<strong> Tk</strong> </p>
                <p className="card__description"><strong>Stock: </strong>{props.stock}</p>
            </div>
            <div className="card__button-container">
                <button className="card__btn card__btn--add-to-cart" onClick={() => setIsOpen(true)}>
                    Change Info {/* Icon and button text */}
                </button>
                <Link to={`/details/${props.productID}`} className="card__btn card__btn--view-details">View Details</Link>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <ProductChangeForm productName ={props.title} description={props.description} stock={props.stock} price={props.price} onSubmit = {handleChange}/> 
                </Modal>
            </div>
            </div>
        </CardContext.Provider>
    );
}

Card.propTypes = {
    productID: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired
};

function MyProducts() {
    const [product, setAllproduct] = useState(null);


    useEffect(() => {
        reloadData();
    }, []);

    const reloadData = async () => {
        try {
            console.log('hello');
            const response = await fetch(`http://localhost:3000/shop/getProducts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            if (!response.ok) {
                console.error("Network response was not ok");
            }

            const data = await response.json();
            console.log("API data:", data.rows);
            setAllproduct(data.rows);
        } catch (error) {
            console.log("Error:", error);
        }
        console.log('hello2');
    };

    return (
        <>
            <Menu />
            <br />
            <br />
            <div className="wrapper">
                {product &&
                    product.map((contents, index) => (
                        <Card
                            key={index}
                            productID={contents.PRODUCT_ID}
                            title={contents.PRODUCT_NAME}
                            description = {contents.DESCRIPTION}
                            image={'../../productImage/' + contents.IMAGE}
                            price={contents.PRICE}
                            stock={contents.STOCK}
                        />
                    ))}
            </div>
        </>
    );
}

export default MyProducts;