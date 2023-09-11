import React from 'react';
import { FaShoppingCart, FaUser, FaStore } from 'react-icons/fa';

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '10px',
  margin: '0px', // Set margin to 0px to eliminate space between cards
  width: '300px',
  transition: 'transform 0.2s',
};

const iconStyle = {
  fontSize: '32px',
  marginRight: '16px',
};

const titleStyle = {
  fontSize: '20px',
  margin: '0',
};

const valueStyle = {
  fontSize: '24px',
  margin: '0',
};

const Card = ({ title, value, icon }) => {
  return (
    <div style={cardStyle}>
      <div style={iconStyle}>{icon}</div>
      <div>
        <h2 style={titleStyle}>{title}</h2>
        <p style={valueStyle}>{value}</p>
      </div>
    </div>
  );
};

const Dashboard = ({ totalProducts, totalUsers, totalShops }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Card
        title="Total Products"
        value={totalProducts} // Get totalProducts from props
        icon={<FaShoppingCart />}
      />
      <Card
        title="Total Users"
        value={totalUsers} // Get totalUsers from props
        icon={<FaUser />}
      />
      <Card
        title="Total Shops"
        value={totalShops} // Get totalShops from props
        icon={<FaStore />}
      />
    </div>
  );
};

export default Dashboard;
