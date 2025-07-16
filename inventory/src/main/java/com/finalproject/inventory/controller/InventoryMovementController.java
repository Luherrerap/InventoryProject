package com.finalproject.inventory.controller;

import com.finalproject.inventory.model.InventoryMovement;
import com.finalproject.inventory.service.InventoryMovementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movements")
@CrossOrigin(origins = "http://localhost:5173")
public class InventoryMovementController {

    @Autowired
    private InventoryMovementService movementService;

    @PostMapping
    public ResponseEntity<?> createMovement(@RequestBody InventoryMovement movement) {
        try {
            InventoryMovement saved = movementService.saveMovement(movement);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<InventoryMovement> getAllMovements() {
        return movementService.getAllMovements();
    }
}
