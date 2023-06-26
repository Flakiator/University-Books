import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap';
import cookieManager from './cookieManager';

export default function BorrowerLenderTable(props) {
  const [selectedTable, setSelectedTable] = useState('borrower');
  const { books, orders } = props

  const handleTableChange = (table) => {
    setSelectedTable(table);
  };

  const renderTable = () => {
    if (selectedTable === 'lender') {
      return (
        <Table striped bordered>
          
          <thead>
            <tr>
              <th>Title</th>
              <th>Purchase type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {books
            .filter((book) => book.ownerId === cookieManager.get("TOKEN"))
            .map((book, index) => (
              <tr key={index}>
                <td>
                <Link to={`/books/${book.id}`} style={{ textDecoration: "none" }} key={index}>
                  {book.title}
                </Link>
                </td>
                <td>{book.bookType}</td>
                <td>{book.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else if (selectedTable === 'borrower') {
      return (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Title</th>
              <th>Purchase type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {orders.map((order, index) => (
            
            <tr key={index}>
              <td>
              <Link to={`/books/${order.id}`} style={{ textDecoration: "none" }} key={index}>
              {order.title}
              </Link>
              </td>
              <td>{order.bookType}</td>
              <td>{order.status}</td>
            </tr>
            
          ))}
          </tbody>
        </Table>
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      {/* Table Navigation Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => handleTableChange('borrower')}
          style={{
            backgroundColor: selectedTable === 'borrower' ? '#A3D5FF' : '',
            color: selectedTable === 'borrower' ? 'black' : ''
          }}
        >
          My orders
        </button>
        <button
          onClick={() => handleTableChange('lender')}
          style={{
            backgroundColor: selectedTable === 'lender' ? '#A3D5FF' : '',
            color: selectedTable === 'lender' ? 'black' : ''
          }}
        >
          My listings
        </button>
      </div>

      {/* Render the selected table */}
      {renderTable()}
    </div>
  );
}
