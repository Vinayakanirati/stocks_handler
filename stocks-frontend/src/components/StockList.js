import React, { useState, useEffect } from 'react';
import StockService from '../services/StockService';
import './StockList.css';

const StockList = ({ onEdit }) => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = () => {
        StockService.getAllStocks().then((response) => {
            setStocks(response.data);
        }).catch(error => {
            console.error("Error fetching stocks:", error);
        });
    };

    const deleteStock = (id) => {
        if (window.confirm("Are you sure you want to delete this stock?")) {
            StockService.deleteStock(id).then(() => {
                fetchStocks();
            }).catch(error => {
                console.error("Error deleting stock:", error);
            });
        }
    };

    return (
        <div className="stock-list-container">
            <h2 className="text-center">Stocks List</h2>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Stock Name</th>
                            <th> Stock Quantity</th>
                            <th> Stock Price</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stocks.map(
                                stock =>
                                    <tr key={stock.id}>
                                        <td> {stock.stockName} </td>
                                        <td> {stock.quantity}</td>
                                        <td> {stock.price}</td>
                                        <td>
                                            <button onClick={() => onEdit(stock)} className="btn btn-info">Update </button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => deleteStock(stock.id)} className="btn btn-danger">Delete </button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockList;
