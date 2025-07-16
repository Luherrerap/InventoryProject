package com.finalproject.inventory.service;



import com.finalproject.inventory.model.Product;
import com.finalproject.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(Product product) {
        if (productRepository.existsByCode(product.getCode())) {
            throw new RuntimeException("Product code already exists");
        }
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}