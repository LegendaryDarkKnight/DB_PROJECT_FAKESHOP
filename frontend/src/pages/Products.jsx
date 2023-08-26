import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

import "../styles/Products.scss";
import Menu from "./Menu";
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../App';

function Card(props) {
  const { userData} = useContext(UserContext);
  const navigate = useNavigate();
  
  const addInCart = async(data) =>{
    console.log("add");
    try {
        const response = await fetch("http://localhost:3000/cart/insert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: 'include',
        });

        if (!response.ok) {
          console.error("Network response was not ok");
        }

        // const data = await response.json();

      } catch (error) {
        console.error("Error:", error);
      }
  }
  const handleAddToCart = async () => {
    if (!userData) {
      alert("Please log in to add items to your cart.");
      navigate('/login');
    } else {
      const data = {productID: props.productID, amount:1, totalPrice: props.price}
      console.log(data);
      let ans;
      try {
          const response = await fetch("http://localhost:3000/cart/check", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include',
          });
  
          if (!response.ok) {
            console.error("Network response was not ok");
          }
          ans = await response.json();
          console.log(ans);
          if(ans.ans == 'No'){
            await addInCart(data);
            alert('Added to Cart');
          }
          else{
            alert('Already Added');
          }

        } catch (error) {
          console.error("Error:", error);
        }
      
    }
  };
  return (
    <div className="card">
      <div className="card__body">
        <img src={props.image} alt={props.title} className="card__image" />
        <h5 className="card__title">{props.title}</h5>
        <p className="card__description"><strong>Price: </strong>{props.price}<strong> Tk</strong> </p>
        <p className="card__description"><strong>Stock: </strong>{props.stock}</p>
      </div>
      <div className="card__button-container">
        <button className="card__btn card__btn--add-to-cart" onClick={handleAddToCart}>
          <FiShoppingCart /> Add to Cart {/* Icon and button text */}
        </button>
        <Link to={`/details/${props.title}`} className="card__btn card__btn--view-details">View Details</Link>
      </div>
    </div>
  );
}

Card.propTypes = {
  productID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired
};

export default function Products() {
  
  const [product, setAllproduct] = useState(null);
  
  
  useEffect(() => {
    reloadData();
  }, []);

  const reloadData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/getProducts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
  };

  console.log("Current product state:", product);

  return (
    <>
      <Menu />
      <br />
      <br />
      <div className="wrapper">
        {product &&
          product.map((contents) => (
            <Card
              key={contents.PRODUCT_ID}
              productID={contents.PRODUCT_ID}
              title={contents.PRODUCT_NAME}
              image={'../../images/download2.jpeg'}
              price={contents.PRICE}
              stock={contents.STOCK}
            />
          ))}
      </div>
    </>
  );
}
