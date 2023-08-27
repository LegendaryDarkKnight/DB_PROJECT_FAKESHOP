import { useEffect, useState } from "react";
import '../styles/Details.css'
import { useParams } from "react-router-dom";
import Menu from './Menu'
import { FiShoppingCart } from "react-icons/fi";

const Rating = ({ value, onClick }) => {
    const maxStars = 5;

    const handleStarClick = (selectedValue) => {
        onClick(selectedValue);
    };

    return (
        <div className="rating">
            {[...Array(maxStars)].map((_, index) => (
                <span
                    key={index}
                    className={index < value ? 'star filled' : 'star'}
                    onClick={() => handleStarClick(index + 1)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

const ReviewForm = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ rating, comment });
        setRating(0);
        setComment('');
    };

    return (
        <div className="review-form my-4">
            <h3>Add a Review</h3>
            <Rating value={rating} onClick={setRating} />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Enter your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit Review
                </button>
            </form>
        </div>
    );
};

const ProductDetailsPage = () => {
    const { productID } = useParams();
    console.log(productID);
    const [productData, setProductData] = useState(null);
    const ReloadData = async () => {
        try {
            const response = await fetch("http://localhost:3000/getSingleProduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: productID }),
                credentials: 'include',
            });

            if (!response.ok) {
                console.error("Network response was not ok");
                return;
            }

            const data = await response.json();
            console.log(data.rows[0].PRODUCT_NAME);
            setProductData(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    const product = {
        name: 'Sample Product',
        description: productID,
        price: '$99.99',
        imageUrl: 'sample_image.jpg', // Replace with actual image URL
    };
    useEffect(() => {
        ReloadData();
    }, []);

    const [reviews, setReviews] = useState([]);

    const addReview = (review) => {
        setReviews([...reviews, review]);
    };

    return (
        <>
            <Menu />
            {productData && <div className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <img src={'../../productImage/' + productData.rows[0].IMAGE} alt={product.name} className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        <h2>{productData.rows[0].PRODUCT_NAME}</h2>
                        <p>{productData.rows[0].DESCRIPTION}</p>
                        <h4>Price: {productData.rows[0].PRICE}</h4>
                        <Rating value={productData.rows[0].RATING} />
                        <button className="btn btn-primary mx-5" style={{ backgroundColor: 'orange', border: 'none' }}><FiShoppingCart /> Add to Cart</button>
                    </div>
                </div>
                <hr />
                <ReviewForm onSubmit={addReview} />
                <div className="mt-4">
                    <h3>Customer Reviews</h3>
                    {reviews.length === 0 ? (
                        <p>No reviews yet.</p>
                    ) : (
                        <ul className="list-unstyled">
                            {reviews.map((review, index) => (
                                <li key={index}>
                                    <Rating value={review.rating} />
                                    <p>{review.comment}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>}
        </>
    );
};

export default ProductDetailsPage;
