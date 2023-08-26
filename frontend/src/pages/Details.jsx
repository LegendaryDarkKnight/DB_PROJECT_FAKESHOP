import { useParams } from "react-router-dom"; 

function Details() {
    const { title } = useParams(); 
    const productDetails = {
        title: "Product Title",
        description: "Product Description",
    };

    return (
        <div className="details">
            <h1>{productDetails.title+" "+title}</h1>
            <p>{productDetails.description}</p>
        </div>
    );
}

export default Details;
