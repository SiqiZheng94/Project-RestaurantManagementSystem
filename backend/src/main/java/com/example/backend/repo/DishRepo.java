package com.example.backend.repo;

import com.example.backend.commen.DishCategoryEnum;
import com.example.backend.entity.Dish;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DishRepo extends MongoRepository<Dish, String> {
    List<Dish> findAllByCategory(DishCategoryEnum category);
    List<Dish> findAllByAvailability(boolean availability);
    List<Dish> findAllByCategoryAndAvailability(DishCategoryEnum category, boolean availability);

}
