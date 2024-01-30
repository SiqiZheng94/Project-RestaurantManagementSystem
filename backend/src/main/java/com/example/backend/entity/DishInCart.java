package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.math.BigDecimal;

@With
@Document("dishes_in_cart")

@Data
@AllArgsConstructor
public class DishInCart {
    private String _id;
    private int dishId;
    private String name;
    private String description;
    private BigDecimal amount;
    private BigDecimal onePiecePrice;
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal totalPrice;
}