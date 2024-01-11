package com.example.backend;

import com.example.backend.dto.DishDTO;
import com.example.backend.entity.Dish;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderingSysService {
    private final OrderingSysRepo repo;

   public List<Dish> getAllDishes(){
       return repo.findAll();
   }

    public Dish saveNewDish(DishDTO dishDto) {
       Dish newDish = new Dish(
               null,
               4,
               dishDto.getCategory(),
               dishDto.getName(),
               dishDto.getDescription(),
               dishDto.getPrice(),
               dishDto.isVegetarian(),
               false
       );
       return repo.save(newDish);
    }
}
