import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const [stocks, setStocks] = useState([]);
  const [stockName, setStockName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Use this URL for all API calls
  const API_URL = 'http://localhost:8080/stocks';

  // Fetch stocks on component mount
  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = () => {
    axios.get(API_URL)
      .then(response => {
        setStocks(response.data);
      })
      .catch(error => {
        console.error("Error fetching stocks:", error);
      });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const stock = { stockName, quantity, price };

    if (isEditing) {
      axios.put(`${API_URL}/${id}`, stock)
        .then(() => {
          fetchStocks();
          resetForm();
        })
        .catch(error => console.error("Error updating stock:", error));
    } else {
      axios.post(API_URL, stock)
        .then(() => {
          fetchStocks();
          resetForm();
        })
        .catch(error => console.error("Error adding stock:", error));
    }
  };

  const handleEdit = (stock) => {
    setId(stock.id);
    setStockName(stock.stockName);
    setQuantity(stock.quantity);
    setPrice(stock.price);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this stock?")) {
      axios.delete(`${API_URL}/${id}`)
        .then(() => {
          fetchStocks();
        })
        .catch(error => console.error("Error deleting stock:", error));
    }
  };

  const resetForm = () => {
    setId(null);
    setStockName('');
    setQuantity('');
    setPrice('');
    setIsEditing(false);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <h2 className="text-center my-4">Stock Management</h2>

        {/* Form Section */}
        <div className="card p-4 mb-4">
          <h4>{isEditing ? "Update Stock" : "Add Stock"}</h4>
          <form onSubmit={handleSave}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Stock Name"
                value={stockName}
                onChange={(e) => setStockName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success me-2">{isEditing ? "Update" : "Add"}</button>
            {isEditing && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
          </form>
        </div>

        {/* List Section */}
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Stock Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.length > 0 ? (
                stocks.map(stock => (
                  <tr key={stock.id}>
                    <td>{stock.stockName}</td>
                    <td>{stock.quantity}</td>
                    <td>{stock.price}</td>
                    <td>
                      <button onClick={() => handleEdit(stock)} className="btn btn-info btn-sm me-2">Edit</button>
                      <button onClick={() => handleDelete(stock.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No stocks available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
