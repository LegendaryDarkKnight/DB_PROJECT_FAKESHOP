import  { useState, useEffect} from 'react';

const styles = {
  formContainer: {
    top: '50%',
    width: '600px', // Adjust the width as needed
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'none',
  },
  label: {
    marginBottom: '12px',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

const OfferForm = (props) => {
  // ... (Same state and input change handler as before)
  const [offerData, setOfferData] = useState({
    offerName: '',
    validity: 1,
    productID: '', // Initial value is an empty string
    offerType: '',
    amount: 0,
    minAmount: 0,
    discRate: 0,
  });
  const [product, setAllproduct] = useState(null);


  useEffect(() => {
      reloadData();
  }, []);

  const reloadData = async () => {
      try {
          console.log('hello');
          const response = await fetch(`http://localhost:3000/shop/getProducts`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
              credentials: 'include',
          });

          if (!response.ok) {
              console.error("Network response was not ok");
          }

          const data = await response.json();
          console.log("API data:", data.rows);
          setAllproduct(data.rows);
      } catch (error) {
          console.log("Error:", error);
      }
      console.log('hello2');
  };
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfferData({
      ...offerData,
      [name]: value,
    });
  };

  // Dummy product options for the dropdown

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (
      (offerData.offerType == 'DISCOUNT' && offerData.discRate == 0) ||
      (offerData.offerType != 'DISCOUNT' && (offerData.amount == 0 || offerData.minAmount == 0))
    ) {
      alert('Please fill in the required fields.');
      return;
    } else {
      alert(JSON.stringify(offerData));
    }
    const response = await fetch('http://localhost:3000/shop/addOffer',{
      method: "POST",
      headers:{
        "Content-type": "application/json",
      },
      body: JSON.stringify(offerData),
      credentials: 'include'
    });

  };
  return (
    <div style={styles.formContainer}>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <div style={styles.label}>
          <label htmlFor="offerName">Offer Name:</label>
          <input
            style={styles.input}
            type="text"
            id="offerName"
            name="offerName"
            value={offerData.offerName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='row'>
          <div style={styles.label} className='col-6'>
            <label htmlFor="productID">Product ID:</label>
            <select
              style={styles.select}
              id="productID"
              name="productID"
              value={offerData.productID}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a Product</option>
              {product && product.map((product) => (
                <option key={product.PRODUCT_ID} value={product.PRODUCT_ID}>
                  {product.PRODUCT_NAME}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.label} className='col-6'>
            <label htmlFor="offerType">Offer Type:</label>
            <select
              style={styles.select}
              id="offerType"
              name="offerType"
              value={offerData.offerType}
              onChange={handleInputChange}
              required
            >
              <option value="">SELECT TYPE</option>
              <option value="DISCOUNT">DISCOUNT</option>
              <option value="MONEY_CUT">MONEY_CUT</option>
              <option value="DELIVERY_OFFER">DELIVERY_OFFER</option>
            </select>
          </div>
        </div>
        <div className='row'>

          <div style={styles.label} className='col-6'>
            <label htmlFor="amount">Amount:</label>
            <input
              style={styles.input}
              type="number"
              id="amount"
              name="amount"
              value={offerData.amount}
              onChange={handleInputChange}
              min = "0"
            />
          </div>
          <div style={styles.label} className='col-6'>
            <label htmlFor="minAmount">Minimum Amount:</label>
            <input
              style={styles.input}
              type="number"
              id="minAmount"
              name="minAmount"
              value={offerData.minAmount}
              onChange={handleInputChange}
              min = "0"
            />
          </div>
        </div>
        <div className='row'>
          <div style={styles.label} className='col-6'>
            <label htmlFor="discRate">Discount Rate:</label>
            <input
              style={styles.input}
              type="number"
              id="discRate"
              name="discRate"
              value={offerData.discRate}
              onChange={handleInputChange}
              min = "0"
              max = "100"
            />
          </div>
          <div style={styles.label} className='col-6'>
            <label htmlFor="validity">Validity(days):</label>
            <input
              style={styles.input}
              type="number"
              id="validity"
              name="validity"
              value={offerData.validity}
              onChange={handleInputChange}
              min = "1"
              required
            />
          </div>
        </div>
        {/* ... (Other form fields) */}
        <div style={styles.label} className='row'>
          <button type="submit" className='btn btn-primary col-3 mx-5'>
            Submit
          </button>
          <button  className='btn btn-danger col-3 mx-5' onClick={props.onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default OfferForm;
