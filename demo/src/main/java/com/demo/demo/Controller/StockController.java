package com.demo.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import com.demo.demo.Service.StockService;
import com.demo.demo.Entity.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/stocks")
@CrossOrigin(origins = "http://localhost:3000")
public class StockController {

    @Autowired
    private StockService service;

    @PostMapping
    public Stock addStock(@RequestBody Stock stock) {
        return service.saveStock(stock);
    }

    @GetMapping
    public List<Stock> getAllStocks() {
        return service.getAllStocks();
    }

    @GetMapping("/{id}")
    public Stock getStock(@PathVariable Long id) {
        return service.getStockById(id);
    }

    @PutMapping("/{id}")
    public Stock updateStock(@PathVariable Long id, @RequestBody Stock stock) {
        stock.setId(id);
        return service.saveStock(stock);
    }

    @DeleteMapping("/{id}")
    public String deleteStock(@PathVariable Long id) {
        service.deleteStock(id);
        return "Deleted successfully";
    }
}