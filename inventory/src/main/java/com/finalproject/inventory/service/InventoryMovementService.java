package com.finalproject.inventory.service;

import com.finalproject.inventory.model.InventoryMovement;
import com.finalproject.inventory.model.Product;
import com.finalproject.inventory.repository.InventoryMovementRepository;
import com.finalproject.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryMovementService {

    @Autowired
    private InventoryMovementRepository movementRepository;

    @Autowired
    private ProductRepository productRepository;

    public InventoryMovement saveMovement(InventoryMovement movement) {
        Product product = productRepository.findByCode(movement.getProductCode())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        int adjustedStock = product.getStock();

        switch (movement.getType()) {
            case "entrada":
            case "ajuste_positivo":
            case "devolucion":
                adjustedStock += movement.getQuantity();
                break;
            case "ajuste_negativo":
                if (adjustedStock < movement.getQuantity()) {
                    throw new RuntimeException("Insufficient stock for negative adjustment");
                }
                adjustedStock -= movement.getQuantity();
                break;
            default:
                throw new RuntimeException("Invalid movement type");
        }

        product.setStock(adjustedStock);
        productRepository.save(product);

        return movementRepository.save(movement);
    }

    public List<InventoryMovement> getAllMovements() {
        return movementRepository.findAll();
    }
}