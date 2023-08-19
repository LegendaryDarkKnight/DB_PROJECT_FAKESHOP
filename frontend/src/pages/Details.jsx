import { useParams } from "react-router-dom"; // Import useParams from React Router

function Details() {
    const { title } = useParams(); // Get the product title from the URL
    // You can use this title to fetch the relevant product details or use it as needed

    // Replace this with your actual product details fetching logic
    const productDetails = {
        title: "Product Title",
        description: "Product Description",
        // Other product details
    };

    return (
        <div className="details">
            <h1>{productDetails.title+" "+title}</h1>
            <p>{productDetails.description}</p>
            {/* Display other product details as needed */}
        </div>
    );
}

export default Details;
