package com.example.backend.service;

import com.example.backend.commen.DishCategoryEnum;
import com.example.backend.dto.DishDTO;
import com.example.backend.entity.Dish;
import com.example.backend.entity.Order;
import com.example.backend.repo.DishRepo;
import com.example.backend.repo.OrderRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final DishRepo dishRepo;
    private final OrderRepo orderRepo;

   public List<Dish> getAllDishes(){
       return dishRepo.findAll();
   }

    public Dish saveNewDish(DishDTO dishDto) {
       Dish newDish = new Dish(
               null,
               dishDto.getCategory(),
               dishDto.getName(),
               dishDto.getDescription(),
               dishDto.getPrice(),
               dishDto.isVegetarian(),
               dishDto.isAvailability(),
               dishRepo.findAll().size()+1,
               "https://i.pinimg.com/564x/eb/8a/f5/eb8af5f50a8557fc5aad97db8f4fa4cb.jpg"
       );
       return dishRepo.save(newDish);
    }

    public Dish updateThisDish(String id, DishDTO dishDto) {
        Optional<Dish> selectedDish = dishRepo.findById(id);
        Dish updatedDish = new Dish(
                selectedDish.get()._id(),
                dishDto.getCategory(),
                dishDto.getName(),
                dishDto.getDescription(),
                dishDto.getPrice(),
                dishDto.isVegetarian(),
                dishDto.isAvailability(),
                selectedDish.get().dishId(),
                selectedDish.get().imageURL()
        );
        return dishRepo.save(updatedDish);
    }

    public void deleteThisDish(String id) {
       dishRepo.deleteById(id);
    }

    public List<Dish> getAllDishesByCategoryAndAvailability(DishCategoryEnum category, Boolean availability) {
        return  dishRepo.findAllByCategoryAndAvailability(category,availability);
   }

    public List<Dish> getAllDishesByCategory(DishCategoryEnum category) {
        return dishRepo.findAllByCategory(category);
    }

    public List<Dish> getAllDishesByAvailability(Boolean availability) {
       return dishRepo.findAllByAvailability(availability);
    }

    public List<Order> getAllOrders() {
       return orderRepo.findAll();
    }

    public Order updateOrderStatus(String id) {
        Order selectedOrder = orderRepo.findById(id).get();
        if(Objects.equals(selectedOrder.status(), "OPEN")){
            return orderRepo.save(selectedOrder.withStatus("IN PROGRESS"));
        }
        else if(Objects.equals(selectedOrder.status(), "IN PROGRESS")){
            return orderRepo.save(selectedOrder.withStatus("FINISHED"));
        }
        return selectedOrder;
    }
}