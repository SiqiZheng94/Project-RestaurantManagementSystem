package com.example.backend;

import com.example.backend.dto.DishDTO;
import com.example.backend.entity.Dish;
import com.example.backend.repo.DishRepo;
import com.example.backend.repo.OrderRepo;
import com.example.backend.service.AdminService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;


import static com.example.backend.commen.DishCategoryEnum.*;
import static org.mockito.Mockito.*;


class AdminServiceTest {
    private final DishRepo mockDishRepo=mock(DishRepo.class);
    private final OrderRepo mockOrderRepo=mock(OrderRepo.class);

    @Test
    void getAllDishesTest(){
        //GIVEN
        Dish dish1 = new Dish("1",SIDE_DISHES,"Rice","Rice",new BigDecimal("1"),true,true,1,"https://example");
        List<Dish> expected = List.of(dish1);
        when(mockDishRepo.findAll()).thenReturn(expected);
        AdminService adminService = new AdminService(mockDishRepo, mockOrderRepo);
        //WHEN
        List<Dish> actual = adminService.getAllDishes();
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
        AdminService adminService = new AdminService(mockDishRepo, mockOrderRepo);
        //WHEN
        Dish actual = adminService.saveNewDish(dishDTO);
        //THEN
        verify(mockDishRepo).save(expected);
        Assertions.assertEquals(expected, actual);
    }
}
