package com.example.backend;

import com.example.backend.commen.DishCategoryEnum;
import com.example.backend.dto.DishDTO;
import com.example.backend.dto.DishInCartDTO;
import com.example.backend.entity.Dish;
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

import java.math.BigDecimal;
import java.util.List;

import static com.example.backend.commen.DishCategoryEnum.DRINK;
import static org.junit.Assert.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)

class AdminControllerTest {
    private final String BASE_URL = "/api/admin";
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllDishes_whenRepositoryIsEmpty_shouldReturnEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/menu"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                    []
                """));
    }

    @Test
    void updateThisDish_whenUpdateSavedDish_shouldReturnUpdatedDish () throws Exception {
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", new BigDecimal("5"), true, true);
        String dishDtoJson = objectMapper.writeValueAsString(dishDto);
        MvcResult addResult = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL+"/menu/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(dishDtoJson))
                .andReturn();
        Dish savedDish = objectMapper.readValue(addResult.getResponse().getContentAsString(), Dish.class);

        DishDTO updateDishDto = new DishDTO(DishCategoryEnum.FRY, "Test", "Test", new BigDecimal("1"), false, false);
        String updateDishDtoJson = objectMapper.writeValueAsString(updateDishDto);
        MvcResult updateResult = mockMvc.perform(MockMvcRequestBuilders.put(BASE_URL+"/menu/update/" + savedDish._id())
                .contentType(MediaType.APPLICATION_JSON)
                .content(updateDishDtoJson))
                .andReturn();
        Dish updatedDish = objectMapper.readValue(updateResult.getResponse().getContentAsString(), Dish.class);

        Dish expectedDish = new Dish(savedDish._id(), DishCategoryEnum.FRY, "Test", "Test", new BigDecimal("1"), false, false,savedDish.dishId(), savedDish.imageURL());
        Assertions.assertEquals(updatedDish, expectedDish);
    }

    @Test
    void getAllFilteredDishes_whenCategoryIsDRINKAndAvailabilityIsTrue_shouldReturnExpectedDish () throws Exception {
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", new BigDecimal("5"), true, true);
        String dishDtoJson = objectMapper.writeValueAsString(dishDto);
        MvcResult addResult = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL+"/menu/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishDtoJson))
                .andReturn();
        Dish savedDish = objectMapper.readValue(addResult.getResponse().getContentAsString(), Dish.class);
        String expectedDishJson = objectMapper.writeValueAsString(savedDish);

        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/menu/filter")
                .param("category", "DRINK")
                .param("availability", "true"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(String.valueOf(List.of(expectedDishJson))));
    }

    @Test
    void getAllFilteredDishes_whenCategoryIsDRINKAndAvailabilityIsNotDefined_shouldReturnExpectedDish () throws Exception {
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", new BigDecimal("5"), true, true);
        String dishDtoJson = objectMapper.writeValueAsString(dishDto);
        MvcResult addResult = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL+"/menu/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishDtoJson))
                .andReturn();
        Dish savedDish = objectMapper.readValue(addResult.getResponse().getContentAsString(), Dish.class);
        String expectedDishJson = objectMapper.writeValueAsString(savedDish);

        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/menu/filter")
                        .param("category", "DRINK"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(String.valueOf(List.of(expectedDishJson))));
    }

    @Test
    void getAllFilteredDishes_whenCategoryIsNotDefinedAndAvailabilityIsTrue_shouldReturnExpectedDish () throws Exception {
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", new BigDecimal("5"), true, true);
        String dishDtoJson = objectMapper.writeValueAsString(dishDto);
        MvcResult addResult = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL+"/menu/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishDtoJson))
                .andReturn();
        Dish savedDish = objectMapper.readValue(addResult.getResponse().getContentAsString(), Dish.class);
        String expectedDishJson = objectMapper.writeValueAsString(savedDish);

        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/menu/filter")
                        .param("availability", "true"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(String.valueOf(List.of(expectedDishJson))));
    }

    @Test
    void getAllFilteredDishes_whenCategoryIsNotDefinedAndAvailabilityIsNotDefined_shouldReturnExpectedDish () throws Exception {
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", new BigDecimal("5"), true, true);
        String dishDtoJson = objectMapper.writeValueAsString(dishDto);
        MvcResult addResult = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL+"/menu/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishDtoJson))
                .andReturn();
        Dish savedDish = objectMapper.readValue(addResult.getResponse().getContentAsString(), Dish.class);
        String expectedDishJson = objectMapper.writeValueAsString(savedDish);

        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/menu/filter"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(String.valueOf(List.of(expectedDishJson))));
    }

    @Test
    void deleteThisDish_shouldReturnEmptyList () throws Exception {
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", new BigDecimal("5"), true, true);
        String dishDtoJson = objectMapper.writeValueAsString(dishDto);
        MvcResult addResult = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL+"/menu/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishDtoJson))
                .andReturn();
        Dish savedDish = objectMapper.readValue(addResult.getResponse().getContentAsString(), Dish.class);

        mockMvc.perform(MockMvcRequestBuilders.delete(BASE_URL + "/menu/delete/" + savedDish._id()))
                .andExpect(MockMvcResultMatchers.status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/menu"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                    []
                """));
    }

    @Test
    void getAllOrders_whenRepositoryIsEmpty_shouldReturnEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/orders"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                    []
                """));
    }

    @Test
    void updateOrderStatus_whenOpenReturnInProcess_whenInProcessReturnFinished() throws Exception {
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", new BigDecimal("5"), true, true);
        String dishDtoJson = objectMapper.writeValueAsString(dishDto);
        MvcResult addResult = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL+"/menu/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dishDtoJson))
                .andReturn();
        Dish savedDish = objectMapper.readValue(addResult.getResponse().getContentAsString(), Dish.class);

        DishInCartDTO dishInCartDTO = new DishInCartDTO(savedDish.dishId(), new BigDecimal("1"));
        String dishInCartDtoJson = objectMapper.writeValueAsString(dishInCartDTO);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/shoppingCart/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(dishInCartDtoJson));

        MvcResult orderResult = mockMvc.perform((MockMvcRequestBuilders.get("/api/user/shoppingCart/payment")))
                .andReturn();
        Order newOrder = objectMapper.readValue(orderResult.getResponse().getContentAsString(), Order.class);

        MvcResult updatedOrderResult1 = mockMvc.perform(MockMvcRequestBuilders.put(BASE_URL + "/orders/update-status/" + newOrder._id()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        Order updatedOrder1 = objectMapper.readValue(updatedOrderResult1.getResponse().getContentAsString(), Order.class);
        Assertions.assertEquals("IN PROGRESS", updatedOrder1.status());

        MvcResult updatedOrderResult2 = mockMvc.perform(MockMvcRequestBuilders.put(BASE_URL + "/orders/update-status/" + newOrder._id()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        Order updatedOrder2 = objectMapper.readValue(updatedOrderResult2.getResponse().getContentAsString(), Order.class);
        Assertions.assertEquals("FINISHED", updatedOrder2.status());

        MvcResult updatedOrderResult3 = mockMvc.perform(MockMvcRequestBuilders.put(BASE_URL + "/orders/update-status/" + newOrder._id()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        Order updatedOrder3 = objectMapper.readValue(updatedOrderResult3.getResponse().getContentAsString(), Order.class);
        Assertions.assertEquals("FINISHED", updatedOrder3.status());
    }
}
