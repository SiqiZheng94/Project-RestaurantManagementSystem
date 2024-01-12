package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class DishInCartDTO {
    int dishId;
    int amount;
    float price;
}
