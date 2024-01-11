package com.example.backend.controller;

import com.example.backend.OrderingSysService;
import com.example.backend.dto.DishDTO;
import com.example.backend.dto.DishInCartDTO;
import com.example.backend.entity.Dish;
import com.example.backend.entity.DishInCart;
import com.example.backend.entity.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final OrderingSysService service;

    @GetMapping
    public List<Dish> getAllDishes() {
        return service.getAllDishes();
    }
    @PostMapping("/shoppingCart/add")
    public void addDishInCart (@RequestBody DishInCartDTO dishInCartDTO){
        service.addDishInCart(dishInCartDTO);
    }
    @GetMapping("/shoppingCart")
    public List<DishInCart> getAllDishesInCart(){
        return service.getAllDishesInCart();
    }
    @GetMapping("/order")
    public Order creatOrder() {
        return service.creatOrder();
    }
    @DeleteMapping("/pay")
    public void pay(){
        service.pay();
    }
}