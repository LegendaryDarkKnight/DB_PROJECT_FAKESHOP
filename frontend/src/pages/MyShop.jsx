import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AddProductModal from './AddProductModal';
import '../styles/MyShop.css'
import Menu from './Menu';

const MyShop = () => {
  const [shopName, setShopName] = useState('My Shop');
  const [website, setWebsite] = useState('https://example.com');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const [productFormData, setProductFormData] = useState({
    category: '',
    description: '',
    stock: '',
    price: '',
    productName: '',
    brand: '',
    image: null,
  });
  const handleProductSubmit = async (formData) => {
    // Show an alert with the submitted data
    const { image, ...otherData } = formData;
    const imageName = image ? image.name : 'No image uploaded';
    alert(`Image: ${imageName}\nData: ${JSON.stringify(otherData, null, 2)}`);
    const data = {
      category : productFormData.category,
      description: productFormData.description,
      stock: productFormData.stock,
      price: parseInt(productFormData.price),
      productName: productFormData.productName,
      image: imageName,
      brand: productFormData.brand
    }
    try {
      const response = await fetch(`http://localhost:3000/shop/add`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: 'include',
      });
      if (response.ok){
          console.log('Product Added');
          alert('Success')
      }
      else
          console.log('trouble')
  } catch (error) {
      console.log('Error ordering:', error);
      alert('Failed')
  }
  
};
  const handleShopNameChange = (event) => {
    setShopName(event.target.value);
  };

  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };

  const handleAddProductClick = () => {
    setShowAddProductModal(true);
  };

  const handleProductFormChange = (event) => {
    const { id, value } = event.target;
    setProductFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        const fileName = selectedFile.name; // Extract the filename
        setProductFormData((prevData) => ({
          ...prevData,
          image: {
            name: fileName,
            data: imageData,
          },
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  

  return (
    <>
    <Menu/>
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="profile-section p-4 bg-light">
            <h1>Profile</h1>
            <p>Shop Name: {shopName}</p>
            <p>Website: {website}</p>
          </div>
        </div>
        <div className="col-md-4">
          <Sidebar
            shopName={shopName}
            website={website}
            onShopNameChange={handleShopNameChange}
            onWebsiteChange={handleWebsiteChange}
          />
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleAddProductClick}>
        Add Product
      </button>
      {showAddProductModal && (
        <AddProductModal
          onClose={() => setShowAddProductModal(false)}
          productFormData={productFormData}
          onProductFormChange={handleProductFormChange}
          onImageUpload={handleImageUpload}
          onSubmit={handleProductSubmit}
        />
      )}
    </div>
    </>
  );
};

export default MyShop;
