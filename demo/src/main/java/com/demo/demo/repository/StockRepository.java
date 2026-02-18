package com.demo.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.demo.demo.Entity.Stock;
public interface StockRepository extends JpaRepository<Stock, Long> {
}
