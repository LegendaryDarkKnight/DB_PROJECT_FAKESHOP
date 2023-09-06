import React, { useState, useEffect , useContext} from 'react';
import Sidebar from './FilterSidebar';
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

import "../styles/SearchProduct.scss";
import Menu from "./Menu";
import { UserContext } from '../App';

export const SearchContext = React.createContext();
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
      } catch (error) {
        console.error("Error:", error);
      }
  }
  const handleAddToCart = async () => {
    if (!userData) {
      alert("Please log in to add items to your cart.");
      navigate('/login');
    }
    else if(userData.rows[0].USER_TYPE != 'CUSTOMER') {
      alert('You cannot buy products as shop');
      return;
    } 
    else {
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
        <Link to={`/details/${props.productID}`} className="card__btn card__btn--view-details">View Details</Link>
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


function SearchProducts() {
  const [product, setAllproduct] = useState(null);

// 
  const [allCategory,setAllCategory] = useState([]);
  const [allBrands,setAllBrands] = useState([]);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [brand, setBrand] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [name, setName] = useState('');


// 
  useEffect(() => {
    reloadData();
  }, []); // Trigger a fetch when filters change


  const reloadData = async () => {
    try {
      // Construct your fetch URL based on the selected filters
      const fetchUrl = `http://localhost:3000/getSearchedProducts?name=${name}&category=${category}&maxPrice=${maxPrice}&minPrice=${minPrice}&brand=${brand}&sortBy=${sortBy}`;

      const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        console.error('Network response was not ok');
      }

      const data = await response.json();
      console.log('API data:', data.rows);
      setAllproduct(data.rows);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleSubmit= async(e)=>{
    alert('Clik2')
    await reloadData();
  }
  return (
    <>
    <SearchContext.Provider 
    value = 
    {{allCategory,setAllCategory,
      allBrands,setAllBrands,
      category,setCategory,
      minPrice,setMinPrice,
      maxPrice,setMaxPrice,
      brand, setBrand,
      sortBy, setSortBy,
      name, setName,
      handleSubmit
    }}>
    <Menu/>
      <Sidebar/> 
      <br />
      
      <br />
      <div className="wrapper1">
      
        {product &&
          product.map((contents, index) => (
            <Card
              key={index}
              productID={contents.PRODUCT_ID}
              title={contents.PRODUCT_NAME}
              image={`../../productImage/${contents.IMAGE}`}
              price={contents.PRICE}
              stock={contents.STOCK}
            />
          ))}
      </div>
      </SearchContext.Provider>
    </>
  );
}

export default SearchProducts;
