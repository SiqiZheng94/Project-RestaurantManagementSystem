package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
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
//@Data
//@AllArgsConstructor
//public class DishInCart {
//    private String _id;
//    private int dishId;
//    private int amount;
//
//    public int calculateTotalPrice(int dishPrice) {
//        return dishPrice * amount;
//    }
//}