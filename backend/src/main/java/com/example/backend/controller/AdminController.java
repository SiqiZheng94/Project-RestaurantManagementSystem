package com.example.backend.controller;

import com.example.backend.OrderingSysService;
import com.example.backend.commen.DishCategoryEnum;
import com.example.backend.dto.DishDTO;
import com.example.backend.entity.Dish;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final OrderingSysService service;

    @GetMapping("/menu")
    public List<Dish> getAllDishes() {
        return service.getAllDishes();
    }

    @PostMapping("/menu/add")
    public Dish addANewDish(@RequestBody DishDTO dishDto) {
        return service.saveNewDish(dishDto);
    }

    @PutMapping("/menu/update")
    public Dish updateThisDish(@RequestBody Dish dish) {
        return service.updateThisDish(dish);
    }

    @DeleteMapping("/menu/delete/{id}")
    public void deleteThisDish(@PathVariable String id){
        service.deleteThisDish(id);
    }

    @GetMapping("menu/filter")
    public List<Dish> getAllFilteredDishes(
        @RequestParam(required = false) DishCategoryEnum category,
        @RequestParam(required = false) Boolean availability
) {
            if (category != null && availability != null) {
                return service.getAllDishesByCategoryAndAvailability(category, availability);
            } else if (category != null) {
                return service.getAllDishesByCategory(category);
            } else if (availability != null) {
                return service.getAllDishesByAvailability(availability);
            } else {
                return service.getAllDishes();
            }
        }
}
