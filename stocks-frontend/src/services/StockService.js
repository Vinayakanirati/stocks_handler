import axios from 'axios';

const API_URL = 'http://localhost:8080/stocks';

class StockService {
    
    getAllStocks() {
        return axios.get(API_URL);
    }

    getStockById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    createStock(stock) {
        return axios.post(API_URL, stock);
    }

    updateStock(id, stock) {
        return axios.put(`${API_URL}/${id}`, stock);
    }

    deleteStock(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new StockService();
