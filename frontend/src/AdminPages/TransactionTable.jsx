import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'
import './Transaction.css'
function TransactionTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/admin/getTransactions',{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
  })
      .then((response) => response.json())
      .then((data) => setData(data.rows))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='transaction-table' style={{maxHeight: "100vh", maxWidth:"80vw",overflowX: "auto",overflowY: "auto"}}>
      <h1>Transaction Table</h1>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Purchasing Date</th>
            <th>Product Name</th>
            <th>Customer Email</th>
            <th>Shop Email</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over your data to populate the table rows */}
          {data.map((row) => (
            <tr key={row.TRANSACTION_ID}>
              <td>{row.TRANSACTION_ID}</td>
              <td>{row.AMOUNT}</td>
              <td>{row.PURCHASING_DATE}</td>
              <td>{row.PRODUCT_NAME}</td>
              <td>{row.CUSTOMER_MAIL}</td>
              <td>{row.SHOP_MAIL}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableBody(){
  return (
    <>
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar></Sidebar>
                <TransactionTable/>
            </div>
        </div>
    </>
)
}
export default TableBody;
