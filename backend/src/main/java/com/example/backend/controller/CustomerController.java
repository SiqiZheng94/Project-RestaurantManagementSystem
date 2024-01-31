package com.example.backend.controller;

import com.example.backend.dto.DishInCartDTO;
import com.example.backend.entity.Dish;
import com.example.backend.entity.DishInCart;
import com.example.backend.entity.Order;
import com.example.backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService service;

    @GetMapping
    public List<Dish> getAllDishes() {
        return service.getAllDishes();
    }
    @PostMapping("/shoppingCart/add")
    public DishInCart addDishInCart (@RequestBody DishInCartDTO dishInCartDTO){
        return service.addDishInCart(dishInCartDTO);
    }
    @GetMapping("/shoppingCart")
    public List<DishInCart> getAllDishesInCart(){
        return service.getAllDishesInCart();
    }
    @DeleteMapping("/shoppingCart/delete/{id}")
        public void deleteDishInCart(@PathVariable String id){
        service.deleteDishInCart(id);
    }
    @PutMapping("/shoppingCart/update")
    public DishInCart changeQuantity(@RequestBody DishInCartDTO dishInCartDTO){
        return service.changeQuantity(dishInCartDTO);
    }
    @GetMapping("/shoppingCart/payment")
    public Order creatOrderAndLeerCart() {
        return service.creatOrderAndEmptyCart();
    }

}