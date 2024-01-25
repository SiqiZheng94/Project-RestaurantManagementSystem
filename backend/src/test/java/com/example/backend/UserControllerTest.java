package com.example.backend;

import com.example.backend.dto.DishDTO;
import com.example.backend.dto.DishInCartDTO;
import com.example.backend.entity.Dish;
import com.example.backend.entity.DishInCart;
import com.example.backend.entity.Order;
import com.fasterxml.jackson.core.JsonProcessingException;
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

import java.math.BigDecimal;
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
    void add10DishesInCart_shouldReturn20DishesInCart () throws Exception {
        // add a dish in DB
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", new BigDecimal("5"), true, true);
        String dishDtoJson = objectMapper.writeValueAsString(dishDto);
        MvcResult addResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/menu/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishDtoJson))
                .andReturn();
        Dish savedDish = objectMapper.readValue(addResult.getResponse().getContentAsString(), Dish.class);
        // add 10 * dish in cart
        DishInCartDTO dishInCartDTO = new DishInCartDTO(savedDish.dishId(), new BigDecimal("10"));
        String dishInCartDtoJson = objectMapper.writeValueAsString(dishInCartDTO);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL + "/shoppingCart/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishInCartDtoJson))
                .andReturn();
        DishInCart dishAlreadyInCart = objectMapper.readValue(result.getResponse().getContentAsString(), DishInCart.class);
        // add 10 more pieces and test for changes in quantity and price
        DishInCart expect = new DishInCart(dishAlreadyInCart.get_id(),dishAlreadyInCart.getDishId(),dishAlreadyInCart.getName(),
                dishAlreadyInCart.getDescription(),new BigDecimal("20"),savedDish.price(),dishAlreadyInCart.getOnePiecePrice().multiply(new BigDecimal("20")));
        String expectJson = objectMapper.writeValueAsString(expect);

        mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL + "/shoppingCart/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishInCartDtoJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectJson));
    }
    @Test
    void updateQuantityFrom10To1_shouldReturnQuantity1AndTotalPrice5() throws Exception {
        // add a dish in DB
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", new BigDecimal("5"), true, true);
        String dishDtoJson = objectMapper.writeValueAsString(dishDto);
        MvcResult addResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/menu/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishDtoJson))
                .andReturn();
        Dish savedDish = objectMapper.readValue(addResult.getResponse().getContentAsString(), Dish.class);
        // add 10 * dish in cart
        DishInCartDTO dishInCartDTO = new DishInCartDTO(savedDish.dishId(), new BigDecimal("10"));
        String dishInCartDtoJson = objectMapper.writeValueAsString(dishInCartDTO);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL + "/shoppingCart/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishInCartDtoJson))
                .andReturn();
        DishInCart dishAlreadyInCart = objectMapper.readValue(result.getResponse().getContentAsString(), DishInCart.class);
        // change the quantity of this dish in cart to 1
        DishInCartDTO updateDishInCartDTO = new DishInCartDTO(dishAlreadyInCart.getDishId(), new BigDecimal("1"));
        String updateDishInCartDTOJson = objectMapper.writeValueAsString(updateDishInCartDTO);

        mockMvc.perform(MockMvcRequestBuilders.put(BASE_URL + "/shoppingCart/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateDishInCartDTOJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        objectMapper.writeValueAsString(dishAlreadyInCart
                                .withAmount(new BigDecimal("1"))
                                .withTotalPrice(new BigDecimal("5"))
                        )));
    }
    @Test
    void payment_shouldReturnEmptyChartAndNewOrder () throws Exception {
        // add a dish in DB
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", new BigDecimal("5"), true, true);
        String dishDtoJson = objectMapper.writeValueAsString(dishDto);
        MvcResult addResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/menu/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishDtoJson))
                .andReturn();
        Dish savedDish = objectMapper.readValue(addResult.getResponse().getContentAsString(), Dish.class);
        // add 10 * dish in cart
        DishInCartDTO dishInCartDTO = new DishInCartDTO(savedDish.dishId(), new BigDecimal("10"));
        String dishInCartDtoJson = objectMapper.writeValueAsString(dishInCartDTO);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL + "/shoppingCart/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishInCartDtoJson))
                .andReturn();
        DishInCart dishAlreadyInCart = objectMapper.readValue(result.getResponse().getContentAsString(), DishInCart.class);


        // payment
        MvcResult resultOrder = mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL+"/shoppingCart/payment"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        // shoppingCard should be empty
        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL+"/shoppingCart"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                        []
                    """
                ));
        // a new order should be created
        Order order = objectMapper.readValue(resultOrder.getResponse().getContentAsString(),Order.class);
        Assertions.assertNotNull(order._id());
        Assertions.assertTrue(order.localDateTime().isBefore(LocalDateTime.now()));
        Assertions.assertEquals("OPEN", order.status());
        Assertions.assertEquals(List.of(dishAlreadyInCart), order.dishesInCart());
    }

}

