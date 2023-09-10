import { useContext, useEffect } from 'react';
import { SearchContext } from './SearchProducts';

function Sidebar() {
  const{allCategory,setAllCategory,
    allBrands,setAllBrands,
    category,setCategory,
    minPrice,setMinPrice,
    maxPrice,setMaxPrice,
    brand, setBrand,
    sortBy, setSortBy,
    name, setName,
    handleSubmit
  } = useContext(SearchContext);
  useEffect(() => {
    reloadCategory();
    reloadBrand(category);
  }, []);
  
  const reloadCategory = async () => {
    try {
      const response = await fetch('http://localhost:3000/getCategory', {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
  
      setAllCategory(data.rows);
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching data');
    }
  }
  
  const reloadBrand = async (category1) => {
    try {
      const response = await fetch(`http://localhost:3000/getBrand`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({category: category1}),
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
  
      setAllBrands(data.rows)
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching data brand');
    }
  }
  const handleMinPriceChange = (e) => {
    const newMinPrice = Math.min(Number(e.target.value), maxPrice);
     // Ensure minPrice is less than or equal to maxPrice
    setMinPrice(newMinPrice>0?newMinPrice:0);
  
  };

  const handleMaxPriceChange = (e) => {
    const newMaxPrice = Math.max(Number(e.target.value), minPrice); // Ensure maxPrice is greater than or equal to minPrice
    setMaxPrice(newMaxPrice<500000?newMaxPrice:500000);

  }

  const handleCategoryChange= async(e)=>{
    setCategory(e.target.value);
    await reloadBrand(e.target.value);
    setBrand('');
  }

  const handleOnSubmit = async (e) => {
    alert(JSON.stringify({ category, minPrice, maxPrice, brand, sortBy, name }));
    await handleSubmit();
  };
  
  return (
    <div className='sidebar1'>
      <div className="sidebar-content1">
      <button className='btn btn-primary mx-5' onClick={handleOnSubmit}>Search</button>

        {/* Name Filter */}
        <div >
          <input
            type="text"
            id="name"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: '10px' }}
            className='design29'
          />
        </div>

        {/* Category Dropdown */}
        <select onChange={handleCategoryChange} 
        style={{ marginTop: '20px' }}
        className='design29'>
          <option value="">All Categories</option>
          {allCategory && allCategory.map((contents, index) => (
                  <option key={index} value = {contents.CATEGORY}>{contents.CATEGORY}</option>
          ))}
          {/* Add options for categories */}
        </select>

        {/* Price Range Selector */}
        <div style={{ marginTop: '20px' }}>
      <label htmlFor="minPrice">Min Price:</label>
      <input
        type="number"
        id="minPrice"
        placeholder="Min Price"
        value={minPrice}
        onChange={handleMinPriceChange}
        style={{ marginBottom: '10px' }}
        className='design29'
      />
      <label htmlFor="maxPrice">Max Price:</label>
      <input
        type="number"
        id="maxPrice"
        placeholder="Max Price"
        value={maxPrice}
        onChange={handleMaxPriceChange}
        className='design29'
      />
    </div>

        {/* Brand Dropdown */}
        <select onChange={(e) => setBrand(e.target.value)} style={{ marginTop: '20px' }}
        className='design29'>
          <option value="">All Brands</option>
          {allBrands && allBrands.map((contents,index)=>(
            <option key={index} value={contents.BRAND}>{contents.BRAND}</option>
          ))}
          {/* Add options for brands */}
        </select>

        {/* Sort By Dropdown */}
        <select onChange={(e) => setSortBy(e.target.value)} style={{ marginTop: '20px' }}
        className='design29'>
          <option value="">Default</option>
          <option value="ORDER BY PRICE ASC">Price: Low to High</option>
          <option value="ORDER BY PRICE DESC">Price: High to Low</option>
          {/* Add more sorting options if needed */}
        </select>
      </div>
    </div>
  );
}

export default Sidebar;
// 
// 