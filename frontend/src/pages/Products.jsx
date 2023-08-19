import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import Dummy from "../dummy/dummy";
import "../styles/Products.scss";
import Menu from "./Menu"; 

function Card(props){
    return(
        <div className="card">
            <div className="card__body">
                <img src={props.image} alt={props.title} className="card__image" />
                <h2 className="card__title">{props.title}</h2>
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

export default function Products(){
    return(
        <>
        <Menu/>
        <br/>
        <br/>
        <div className="wrapper">
           {Dummy.map(contents =>(
               <Card 
               key={contents.Product_id} // Add key prop here
               title={contents.Product_id}
               image={contents.Image}
               description={contents.Description + " " + contents.Category}
               />
               ))}
        </div>
        </>
    );
}
