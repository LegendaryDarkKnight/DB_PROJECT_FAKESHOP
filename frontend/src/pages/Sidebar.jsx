import React from 'react';

const Sidebar = ({ shopName, website, onShopNameChange, onWebsiteChange }) => {
  return (
    <div className="sidebar">
      <form>
        <div className="mb-3">
          <label htmlFor="shopName" className="form-label">Shop Name</label>
          <input type="text" className="form-control" id="shopName" value={shopName} onChange={onShopNameChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="website" className="form-label">Website</label>
          <input type="text" className="form-control" id="website" value={website} onChange={onWebsiteChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default Sidebar;
