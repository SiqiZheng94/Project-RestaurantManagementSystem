package com.example.backend.entity;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

@With
@Document("dishes_in_cart")
public record DishInCart(
        String _id,
        int dishId,
        int amount
) {
}
