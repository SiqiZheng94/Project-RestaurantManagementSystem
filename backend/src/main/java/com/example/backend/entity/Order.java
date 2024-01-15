package com.example.backend.entity;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
@With
@Document("orders")
public record Order(
        String _id,
        LocalDateTime localDateTime,
        String status,
        List<DishInCart> dishesInCart
) {
}
