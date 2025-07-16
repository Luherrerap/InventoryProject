package com.finalproject.inventory.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "inventory_movements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryMovement {
    @Id
    private String id;

    private String productCode;
    private String type; 
    private int quantity;
    private LocalDate date;
    private String comments;
}

