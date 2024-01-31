package com.example.backend.repo;

import com.example.backend.entity.PriceSummary;
import com.example.backend.entity.DishInCart;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DishInCartRepo extends MongoRepository<DishInCart, String> {
    @Aggregation(pipeline = {
            "{ $group: { _id: null, totalPriceSum: { $sum:  '$totalPrice'} }}"
    })
    PriceSummary computeTotalPriceSum();
    List<DishInCart> findAllByDishIdIs(int dishId);
}
