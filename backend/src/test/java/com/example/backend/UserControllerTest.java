package com.example.backend;

import com.example.backend.dto.DishDTO;
import com.example.backend.dto.DishInCartDTO;
import com.example.backend.entity.Dish;
import com.example.backend.entity.DishInCart;
import com.example.backend.entity.Order;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.nio.charset.Charset;
import java.time.LocalDateTime;
import java.util.List;

import static com.example.backend.commen.DishCategoryEnum.DRINK;
import static org.junit.Assert.*;


@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    private final String BASE_URL = "/api/user";
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Test
    void addDishInCart_shouldReturnDishInCart () throws Exception {
        // add a dish in DB
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", 5.00F, true, true);
        String dishDtoJson = objectMapper.writeValueAsString(dishDto);
        MvcResult addResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/menu/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishDtoJson))
                .andReturn();
        Dish savedDish = objectMapper.readValue(addResult.getResponse().getContentAsString(), Dish.class);
        // add 10 * dish in cart
        DishInCartDTO dishInCartDTO = new DishInCartDTO(savedDish.dishId(), 10);
        String dishInCartDtoJson = objectMapper.writeValueAsString(dishInCartDTO);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL + "/shoppingCart/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishInCartDtoJson))
                .andReturn();
        DishInCart dishAlreadyInCart = objectMapper.readValue(result.getResponse().getContentAsString(), DishInCart.class);
        // Add 10 more pieces and test for changes in quantity and price
        DishInCart expect = new DishInCart(dishAlreadyInCart.get_id(),dishAlreadyInCart.getDishId(),dishAlreadyInCart.getName(),dishAlreadyInCart.getDescription(),20,savedDish.price(),dishAlreadyInCart.getOnePiecePrice()*20);
        String expectJson = objectMapper.writeValueAsString(expect);
        mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL+"/shoppingCart/add")
               .contentType(MediaType.APPLICATION_JSON)
               .content(dishInCartDtoJson))
               .andExpect(MockMvcResultMatchers.status().isOk())
               .andExpect(MockMvcResultMatchers.content().json(expectJson));
    }
    @Test
    void creatOrder_shouldReturnOrder () throws Exception {
            DishInCartDTO dishInCartDTO = new DishInCartDTO(
                    1,1
            );
            String dishInCartDtoJson = objectMapper.writeValueAsString(dishInCartDTO);
            MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL+"/shoppingCart/add")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(dishInCartDtoJson))
                    .andReturn();

            DishInCart dishInCart = objectMapper.readValue(result.getResponse().getContentAsString(), DishInCart.class);

        MvcResult resultOrder = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL+"/order"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        Order order = objectMapper.readValue(resultOrder.getResponse().getContentAsString(),Order.class);
        Assertions.assertNotNull(order._id());
        Assertions.assertTrue(order.localDateTime().isBefore(LocalDateTime.now()));
        Assertions.assertEquals("OPEN", order.status());
        Assertions.assertEquals(List.of(dishInCart), order.dishesInCart());
    }
    @Test
    void buy_shouldEmptyChart () throws Exception
    {
        mockMvc.perform(MockMvcRequestBuilders.delete(BASE_URL+"/buy"))
                .andExpect(MockMvcResultMatchers.status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL+"/shoppingCart"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                        []
                    """
                ));
    }
}

