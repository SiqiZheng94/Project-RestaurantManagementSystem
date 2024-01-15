package com.example.backend;

import com.example.backend.dto.DishDTO;
import com.example.backend.entity.Dish;
import com.example.backend.repo.DishInCartRepo;
import com.example.backend.repo.DishRepo;
import com.example.backend.repo.OrderRepo;
import org.junit.jupiter.api.Test;

import java.util.List;


import static com.example.backend.commen.DishCategoryEnum.*;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;


public class OrderingSysServiceTest {
    private final DishRepo mockDishRepo=mock(DishRepo.class);
    private final DishInCartRepo mockDishInCartRepo=mock(DishInCartRepo.class);
    private final OrderRepo mockOrderRepo=mock(OrderRepo.class);
    @Test
    void gerAllDishesTest(){
        //GIVEN
        Dish dish1 = new Dish("1",SIDE_DISHES,"Rice","Rice",1.00F,true,true,1);
        List<Dish> expected = List.of(dish1);
        when(mockDishRepo.findAll()).thenReturn(expected);
        OrderingSysService orderingSysService = new OrderingSysService(mockDishRepo, mockDishInCartRepo, mockOrderRepo);
        //WHEN
        List<Dish> actual = orderingSysService.getAllDishes();
        //THEN
        verify(mockDishRepo).findAll();
        assertEquals(expected,actual);
    }
    @Test
    void saveNewDish(){
        //GIVEN
        DishDTO dishDTO = new DishDTO(DRINK,"Water","Water",3.50F,true);
        Dish expected = new Dish(null,DRINK,"Water","Water",3.50F,true,true,1);
        when(mockDishRepo.save(expected)).thenReturn(expected);
        OrderingSysService orderingSysService = new OrderingSysService(mockDishRepo, mockDishInCartRepo, mockOrderRepo);
        //WHEN
        Dish actual = orderingSysService.saveNewDish(dishDTO);
        //THEN
        verify(mockDishRepo).save(expected);
        assertEquals(expected,actual);
    }
}
