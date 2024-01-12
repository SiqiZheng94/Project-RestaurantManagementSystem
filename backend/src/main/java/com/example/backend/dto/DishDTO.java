package com.example.backend.dto;

import com.example.backend.commen.DishCategoryEnum;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
public class DishDTO {
    private DishCategoryEnum category;
    private String name;
    private String description;
    private float price;
    private boolean vegetarian;
}
