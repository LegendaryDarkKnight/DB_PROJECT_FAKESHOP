import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css'



const Signup = () => {
    const onFormSubmit = async (event) => {
        event.preventDefault();
    }
    const navigate = useNavigate();
    return (
        
            <div className="bg-white p-4 rounded w-50 col-md-12 body1">

                <form>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">
                            Product Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            placeholder="Product Name"
                            defaultValue="Default Product Name"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows={3}
                            placeholder="Description"
                            defaultValue="Default Description"
                            
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="stock" className="form-label">
                            Stock
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="stock"
                            placeholder="Stock"
                            defaultValue={10}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                            Price
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            id="price"
                            placeholder="Price"
                            defaultValue={10.0}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>

            </div>

    );
}
export default Signup;
