package com.example.backend;

import com.example.backend.commen.DishCategoryEnum;
import com.example.backend.dto.DishDTO;
import com.example.backend.dto.DishInCartDTO;
import com.example.backend.entity.Dish;
import com.example.backend.entity.DishInCart;
import com.example.backend.repo.DishInCartRepo;
import com.example.backend.repo.DishRepo;
import com.example.backend.repo.OrderRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;


import static com.example.backend.commen.DishCategoryEnum.*;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;


class OrderingSysServiceTest {
    private final DishRepo mockDishRepo=mock(DishRepo.class);
    private final DishInCartRepo mockDishInCartRepo=mock(DishInCartRepo.class);
    private final OrderRepo mockOrderRepo=mock(OrderRepo.class);

    @Test
    void getAllDishesTest(){
        //GIVEN
        Dish dish1 = new Dish("1",SIDE_DISHES,"Rice","Rice",new BigDecimal("1"),true,true,1,"https://example");
        List<Dish> expected = List.of(dish1);
        when(mockDishRepo.findAll()).thenReturn(expected);
        OrderingSysService orderingSysService = new OrderingSysService(mockDishRepo, mockDishInCartRepo, mockOrderRepo);
        //WHEN
        List<Dish> actual = orderingSysService.getAllDishes();
        //THEN
        verify(mockDishRepo).findAll();
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void saveNewDish(){
        //GIVEN
        DishDTO dishDTO = new DishDTO(DRINK,"Water","Water",new BigDecimal("3.5"),true,true);
        Dish expected = new Dish(null,DRINK,"Water","Water",new BigDecimal("3.5"),true,true,1,"https://i.pinimg.com/564x/eb/8a/f5/eb8af5f50a8557fc5aad97db8f4fa4cb.jpg");
        when(mockDishRepo.save(expected)).thenReturn(expected);
        OrderingSysService orderingSysService = new OrderingSysService(mockDishRepo, mockDishInCartRepo, mockOrderRepo);
        //WHEN
        Dish actual = orderingSysService.saveNewDish(dishDTO);
        //THEN
        verify(mockDishRepo).save(expected);
        Assertions.assertEquals(expected, actual);
    }
}
