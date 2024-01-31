package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class PriceSummary {
    private BigDecimal totalPriceSum;
}
