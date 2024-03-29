package com.example.backend.controller;

import com.example.backend.service.AdminService;
import com.example.backend.commen.DishCategoryEnum;
import com.example.backend.dto.DishDTO;
import com.example.backend.entity.Dish;
import com.example.backend.entity.Order;
import com.example.backend.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService service;

    @GetMapping("/menu")
    public List<Dish> getAllDishes() {
        return service.getAllDishes();
    }

    @PostMapping("/menu/add")
    public Dish addANewDish(@RequestBody DishDTO dishDto) {
        return service.saveNewDish(dishDto);
    }


    @PutMapping("/menu/update/{id}")
    public Dish updateThisDish(@PathVariable String id, @RequestBody DishDTO dishDto) {
        return service.updateThisDish(id, dishDto);
    }

    @DeleteMapping("/menu/delete/{id}")
    public void deleteThisDish(@PathVariable String id){
        service.deleteThisDish(id);
    }

    @GetMapping("/menu/filter")
    public List<Dish> getAllFilteredDishes(
        @RequestParam(required = false) DishCategoryEnum category,
        @RequestParam(required = false) Boolean availability
    ){
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

    @GetMapping("/orders")
    public List<Order> getAllOrders(){
        return service.getAllOrders();
    }

    @PutMapping("/orders/update-status/{id}")
    public Order updateOrderStatus(@PathVariable String id){
        return service.updateOrderStatus(id);
    }


    @PostMapping("/login")
    public User login(@RequestBody User user){
        return service.login(user);
    }

    @GetMapping("/check-token")
    public boolean checkToken(HttpServletRequest request) {
        return service.checkToken(request);
    }
}
