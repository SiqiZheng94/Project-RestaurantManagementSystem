package com.example.backend;

import com.example.backend.commen.DishCategoryEnum;
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

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderingSysService {
    private final DishRepo dishRepo;
    private final DishInCartRepo dishInCartRepo;
    private final OrderRepo orderRepo;

    // Admin
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

    // Customer
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

    public Order creatOrderAndLeerCart() {
       Order newOrder = new Order(
               null,
               LocalDateTime.now(),
               "OPEN",
               dishInCartRepo.findAll()
       );
       dishInCartRepo.deleteAll();
       return orderRepo.save(newOrder);
    }
}