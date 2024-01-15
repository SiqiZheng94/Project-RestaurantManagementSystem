package com.example.backend.repo;

import com.example.backend.entity.Dish;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DishRepo extends MongoRepository<Dish, String> {
}
