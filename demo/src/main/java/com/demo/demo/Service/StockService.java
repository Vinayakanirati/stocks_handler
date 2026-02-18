package com.demo.demo.Service;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.demo.demo.repository.*;
import com.demo.demo.Entity.Stock;

@Service
public class StockService {

    @Autowired
    private StockRepository repo;

    public Stock saveStock(Stock stock) {
        return repo.save(stock);
    }

    public List<Stock> getAllStocks() {
        return repo.findAll();
    }

    public Stock getStockById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void deleteStock(Long id) {
        repo.deleteById(id);
    }
}

