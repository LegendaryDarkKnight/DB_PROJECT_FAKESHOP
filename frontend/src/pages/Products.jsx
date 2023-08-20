import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import Dummy from "../dummy/dummy";
import "../styles/Products.scss";
import Menu from "./Menu"; 
import { useEffect, useState } from "react";

function Card(props){
    return(
        <div className="card">
            <div className="card__body">
                <img src={props.image} alt={props.title} className="card__image" />
                <h4 className="card__title">{props.title}</h4>
                <p className="card__description">{props.description}</p>
            </div>
            <div className="card__button-container">
            <button className="card__btn card__btn--add-to-cart">
                <FiShoppingCart /> Add to Cart {/* Icon and button text */}
                </button>
            <Link to={`/details/${props.title}`} className="card__btn card__btn--view-details">View Details</Link>
            </div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
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
                title={contents.PRODUCT_NAME}
                image={'../../images/download1.jpeg'}
                description={contents.CATEGORY.trim()}
              />
            ))}
        </div>
      </>
    );
  }
  