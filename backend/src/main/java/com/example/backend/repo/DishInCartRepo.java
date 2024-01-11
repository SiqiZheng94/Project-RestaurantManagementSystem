package com.example.backend.repo;

import com.example.backend.entity.DishInCart;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DishInCartRepo extends MongoRepository<DishInCart, String> {
}
