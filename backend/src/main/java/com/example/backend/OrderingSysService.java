package com.example.backend;

import com.example.backend.dto.DishDTO;
import com.example.backend.dto.DishInCartDTO;
import com.example.backend.entity.Dish;
import com.example.backend.entity.DishInCart;
import com.example.backend.entity.Order;
import com.example.backend.repo.DishInCartRepo;
import com.example.backend.repo.DishRepo;
import com.example.backend.repo.OrderRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderingSysService {
    private final DishRepo dishRepo;
    private final DishInCartRepo dishInCartRepo;
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
               true,
               dishRepo.findAll().size()+1
       );
       return dishRepo.save(newDish);
    }

    public void addDishInCart(DishInCartDTO dishInCartDTO) {
        List<DishInCart> optionalDishInCart=dishInCartRepo.findAllByDishIdIs(dishInCartDTO.getDishId());
       if(!optionalDishInCart.isEmpty())
        {
            optionalDishInCart.get(0).setAmount(optionalDishInCart.get(0).getAmount()+dishInCartDTO.getAmount());
            dishInCartRepo.save(optionalDishInCart.get(0));
        } else {
           DishInCart dishInChat = new DishInCart(
                   null,
                   dishInCartDTO.getDishId(),
                   dishInCartDTO.getAmount(),
                   dishInCartDTO.getPrice()
           );
           dishInCartRepo.save(dishInChat);
       }
    }

    public List<DishInCart> getAllDishesInCart() {
       return dishInCartRepo.findAll();
    }

    public Order creatOrder() {
       Order newOrder = new Order(
               null,
               LocalDateTime.now(),
               "OPEN",
               dishInCartRepo.findAll()
       );
       return orderRepo.save(newOrder);
    }

    public void buy() {
       dishInCartRepo.deleteAll();
    }
}
