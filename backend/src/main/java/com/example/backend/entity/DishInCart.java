package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@With
@Document("dishes_in_cart")

@Data
@AllArgsConstructor
public class DishInCart {
    private String _id;
    private int dishId;
    private int amount;
    float price;

    public void setAmount(int amount) {
        this.amount = amount;
    }
}