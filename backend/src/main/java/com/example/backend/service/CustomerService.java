package com.example.backend.service;

import com.example.backend.dto.DishInCartDTO;
import com.example.backend.entity.Dish;
import com.example.backend.entity.DishInCart;
import com.example.backend.entity.Order;
import com.example.backend.repo.DishInCartRepo;
import com.example.backend.repo.DishRepo;
import com.example.backend.repo.OrderRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@Service
@RequiredArgsConstructor
public class CustomerService {
    private final DishRepo dishRepo;
    private final DishInCartRepo dishInCartRepo;
    private final OrderRepo orderRepo;


    public List<Dish> getAllDishes(){
        return dishRepo.findAll();
    }
    public DishInCart addDishInCart(DishInCartDTO dishInCartDTO) {
        List<DishInCart> dishAlreadyInCart=dishInCartRepo.findAllByDishIdIs(dishInCartDTO.getDishId());
        List<Dish> selectedDish = dishRepo.findAllByDishId(dishInCartDTO.getDishId());
        BigDecimal decimalPrice = selectedDish.get(0).price();
        if(!dishAlreadyInCart.isEmpty())
        {
            BigDecimal amount = dishAlreadyInCart.get(0).getAmount().add(dishInCartDTO.getAmount());
            dishAlreadyInCart.get(0).setAmount(amount);
            dishAlreadyInCart.get(0).setTotalPrice(amount.multiply(decimalPrice));
            return dishInCartRepo.save(dishAlreadyInCart.get(0));
        } else {
            DishInCart dishInChat = new DishInCart(
                    null,
                    selectedDish.get(0).dishId(),
                    selectedDish.get(0).name(),
                    selectedDish.get(0).description(),
                    dishInCartDTO.getAmount(),
                    selectedDish.get(0).price(),
                    decimalPrice.multiply(dishInCartDTO.getAmount())

            );
            return dishInCartRepo.save(dishInChat);
        }
    }

    public List<DishInCart> getAllDishesInCart() {
        return dishInCartRepo.findAll();
    }

    public void deleteDishInCart(String id) {
        dishInCartRepo.deleteById(id);
    }

    public DishInCart changeQuantity(DishInCartDTO dishInCartDTO){
        int dishId = dishInCartDTO.getDishId();
        List<DishInCart> allByDishIdIs = dishInCartRepo.findAllByDishIdIs(dishId);
        DishInCart selectd = allByDishIdIs.get(0);
        BigDecimal updatedAmount = dishInCartDTO.getAmount();
        selectd.setAmount(updatedAmount);
        selectd.setTotalPrice(selectd.getOnePiecePrice().multiply(updatedAmount));
        return dishInCartRepo.save(selectd);
    }

    public Order creatOrderAndEmptyCart() {
        Order newOrder = new Order(
                null,
                LocalDateTime.now(),
                "OPEN",
                dishInCartRepo.findAll(),
                dishInCartRepo.computeTotalPriceSum().getTotalPriceSum()
        );
        dishInCartRepo.deleteAll();
        return orderRepo.save(newOrder);
    }
}
