package com.example.backend.controller;

import com.example.backend.OrderingSysService;
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

    @GetMapping
    public List<Dish> getAllDishes() {
        return service.getAllDishes();
    }

    @PostMapping("/add")
    public Dish addNewDish(@RequestBody DishDTO dishDto) {
        return service.saveNewDish(dishDto);
    }
}