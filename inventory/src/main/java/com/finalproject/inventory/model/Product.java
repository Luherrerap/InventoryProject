package com.finalproject.inventory.model;

import org.springframework.data.mongodb.core.index.Indexed;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    private String id;

    @Indexed(unique = true)
    private String code;

    private String name;
    private String description;
    private String category;
    private String supplier;
    private double salePrice;
    private String unit;
    private int stock;
}