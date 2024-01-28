package com.example.backend.controller;

import com.example.backend.OrderingSysService;
import com.example.backend.commen.DishCategoryEnum;
import com.example.backend.dto.DishDTO;
import com.example.backend.dto.PriceSummary;
import com.example.backend.entity.Dish;
import com.example.backend.entity.Order;
import com.example.backend.entity.User;
import com.example.backend.util.JwtUtil;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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

    private final String USERNAME = "admin";
    private final String PASSWORD = "123456";
    @PostMapping("/login")
    public User login(@RequestBody User user){
        if(USERNAME.equals(user.getUsername()) && PASSWORD.equals(user.getPassword())){
            user.setToken(JwtUtil.createToken());
            return user;
        }
        return null;
    }
    // test if the token is expired
//    @GetMapping("check-token")
//    public boolean checkToken(String token) {
//        return JwtUtil.checkToken(token);
//    }
    @GetMapping("check-token")
    public boolean checkToken(HttpServletRequest request) {
        String token = request.getHeader("token");
        return JwtUtil.checkToken(token);
    }
}
