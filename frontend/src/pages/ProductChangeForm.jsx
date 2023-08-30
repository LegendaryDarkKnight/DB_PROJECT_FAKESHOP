import { useContext } from 'react';
import '../styles/Signup.css'
import { useState } from 'react';
import { CardContext } from './MyProducts';
const ProductChangeForm = (props) => {
    const {setValues}= useContext(CardContext);
    const handleInput =  (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }
    return (
        <div >
            <form onSubmit={props.onSubmit}>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">
                        Product Name
                    </label>
                    <input
                        type="text"
                        className="form-control "
                        id="productName"
                        placeholder="Product Name"
                        defaultValue={props.productName}
                        name = "name"
                        onChange={handleInput}
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
                        defaultValue={props.description}
                        name = "description"
                        onChange={handleInput}
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
                        defaultValue={props.stock}
                        name = "stock"
                        onChange={handleInput}
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
                        defaultValue={props.price}
                        name = "price"
                        onChange={handleInput}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

        </div>
    );
}
export default ProductChangeForm;
