package com.finalproject.inventory.repository;

import com.finalproject.inventory.model.InventoryMovement;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InventoryMovementRepository extends MongoRepository<InventoryMovement, String> {
    List<InventoryMovement> findByProductCode(String productCode);
}
