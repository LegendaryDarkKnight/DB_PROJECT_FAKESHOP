import React, { useState , useEffect} from 'react';
import Sidebar from './Sidebar';
import AddProductModal from './AddProductModal';
import '../styles/MyShop.css'
import Menu from './Menu';
import OfferForm from './OfferForm';

const MyShop = () => {
  const [shopName, setShopName] = useState('');
  const [website, setWebsite] = useState('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showOfferForm, setshowOfferForm] = useState(false);
  useEffect(() => {
    fetch('http://localhost:3000/shop/info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setShopName(data.rows[0].SHOP_NAME);
                setWebsite(data.rows[0].WEBSITE)
            })
            .catch((error) => {
                console.error('Error fetching recent login history:', error);
            });
  }, [])
  
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
      category: productFormData.category,
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
      if (response.ok) {
        console.log('Product Added');
        alert('Success')
        window.location.reload();
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
      <Menu />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="profile-section p-4 bg-light">
              <h1>Profile</h1>
              <p><strong>Shop Name:</strong> {shopName}</p>
              <p> <strong>Website:</strong> {website}</p>
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
        <div>

          <button className="btn btn-primary mt-3" onClick={handleAddProductClick}>
            Add Product
          </button>
        </div>
        <div>

          <button className="btn btn-warning mt-3" onClick={()=>setshowOfferForm(true)}>
            Add Offer
          </button>
        </div>
        {showAddProductModal && (
          <AddProductModal
            onClose={() => setShowAddProductModal(false)}
            productFormData={productFormData}
            onProductFormChange={handleProductFormChange}
            onImageUpload={handleImageUpload}
            onSubmit={handleProductSubmit}
          />
        )}
        {showOfferForm &&
          <OfferForm onClose={()=>setshowOfferForm(false)}></OfferForm>
        }
      </div>
    </>
  );
};

export default MyShop;
