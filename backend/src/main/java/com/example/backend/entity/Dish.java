package com.example.backend.entity;

import com.example.backend.commen.DishCategoryEnum;
import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@With
@Document("dishes")
public record Dish(
        String _id,
        DishCategoryEnum category,
        String name,
        String description,
        BigDecimal price,
        boolean vegetarian,
        boolean availability
) {
}
