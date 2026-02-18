import React, { useState, useEffect } from 'react';
import StockService from '../services/StockService';
import './StockForm.css';

const StockForm = ({ currentStock, onCleanup }) => {
    const [id, setId] = useState('');
    const [stockName, setStockName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (currentStock) {
            setId(currentStock.id);
            setStockName(currentStock.stockName);
            setQuantity(currentStock.quantity);
            setPrice(currentStock.price);
        } else {
            setId('');
            setStockName('');
            setQuantity('');
            setPrice('');
        }
    }, [currentStock]);

    const saveOrUpdateStock = (e) => {
        e.preventDefault();
        const stock = { stockName, quantity, price };

        if (id) {
            StockService.updateStock(id, stock).then((response) => {
                console.log(response.data);
                onCleanup();
            }).catch(error => {
                console.error("Error updating stock:", error);
            });
        } else {
            StockService.createStock(stock).then((response) => {
                console.log(response.data);
                onCleanup();
            }).catch(error => {
                console.error("Error creating stock:", error);
            });
        }
    };

    const cancel = () => {
        onCleanup();
    };

    return (
        <div className="stock-form-container">
            <h3>{id ? "Update Stock" : "Add Stock"}</h3>
            <form>
                <div className="form-group">
                    <label> Stock Name: </label>
                    <input placeholder="Stock Name" name="stockName" className="form-control"
                        value={stockName} onChange={(e) => setStockName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> Quantity: </label>
                    <input placeholder="Quantity" name="quantity" className="form-control"
                        value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="form-group">
                    <label> Price: </label>
                    <input placeholder="Price" name="price" className="form-control"
                        value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>

                <button className="btn btn-success" onClick={saveOrUpdateStock}>Save</button>
                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>
            </form>
        </div>
    );
};

export default StockForm;
