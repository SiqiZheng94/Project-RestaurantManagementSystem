package com.example.backend.repo;

import com.example.backend.entity.DishInCart;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface DishInCartRepo extends MongoRepository<DishInCart, String> {
    List<DishInCart> findAllByDishIdIs(int dishId);

}
