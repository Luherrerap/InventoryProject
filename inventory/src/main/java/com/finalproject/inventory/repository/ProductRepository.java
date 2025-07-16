package com.finalproject.inventory.repository;

import com.finalproject.inventory.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, String> {
    boolean existsByCode(String code);
    Optional<Product> findByCode(String code);
}
