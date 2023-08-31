import React, { useState } from 'react';

function customOption(props){
    return(
        <>
            <option value = {props.CATEGORY}>{props.CATEGORY}</option>
        </>
    );
}
const AddProductModal = ({ onClose, productFormData, onProductFormChange, onImageUpload, onSubmit }) => {
    const [categories, setCategories] = useState([]);

    React.useEffect(() => {
        let isCurrent = true;

        fetch(`http://localhost:3000/getCategory`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        }).then(res => res.json())
            .then((categories) => {
                if (isCurrent) {
                    setCategories(categories.rows);
                }
            })
            .catch((error) => {
                // Handle any errors that occur during the fetch request
                console.error('Error fetching user data:', error);
            })
            .finally(() => {
                // console.log(categories);
                isCurrent = false; // Make sure to set isCurrent to false in the finally block
            });

        return () => {
            isCurrent = false; // Set isCurrent to false when the effect cleanup is performed
        };
        // reloadUserData();
        // console.log(userData.rows[0].USER_TYPE)
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('here');
        onSubmit(productFormData);
        // onClose();
    };

    return (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Product</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="category">Category</label>
                                <select
                                    className="form-select"
                                    id="category"
                                    value={productFormData.category}
                                    onChange={onProductFormChange}
                                    required>
                                    {categories.map((contents, index) => (
                                        <option key={index} value = {contents.CATEGORY}>{contents.CATEGORY}</option>
                                    ))}
                                    {/* <option value="">Select a category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="clothing">Clothing</option> */}
                                    {/* Add more options */}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    rows="4"
                                    value={productFormData.description}
                                    onChange={onProductFormChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stock">Stock</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="stock"
                                    value={productFormData.stock}
                                    onChange={onProductFormChange}
                                    required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    value={productFormData.price}
                                    onChange={onProductFormChange}
                                    required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productName">Product Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="productName"
                                    value={productFormData.productName}
                                    onChange={onProductFormChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="brand">Brand</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="brand"
                                    value={productFormData.brand}
                                    onChange={onProductFormChange}
                                    required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    accept="image/*"
                                    onChange={onImageUpload}
                                    required />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                                <button type="submit" className="btn btn-primary">Add Product</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
