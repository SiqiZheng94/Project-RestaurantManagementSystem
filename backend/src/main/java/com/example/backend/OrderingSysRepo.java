package com.example.backend;

import com.example.backend.entity.Dish;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderingSysRepo extends MongoRepository<Dish, String> {
}
