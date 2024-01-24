package com.example.backend;

import com.example.backend.commen.DishCategoryEnum;
import com.example.backend.dto.DishDTO;
import com.example.backend.entity.Dish;
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
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", 5.00F, true, true);
        String dishDtoJson = objectMapper.writeValueAsString(dishDto);
        MvcResult addResult = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL+"/menu/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(dishDtoJson))
                .andReturn();
        Dish savedDish = objectMapper.readValue(addResult.getResponse().getContentAsString(), Dish.class);

        DishDTO updateDishDto = new DishDTO(DishCategoryEnum.FRY, "Test", "Test", 1.00F, false, false);
        String updateDishDtoJson = objectMapper.writeValueAsString(updateDishDto);
        MvcResult updateResult = mockMvc.perform(MockMvcRequestBuilders.put(BASE_URL+"/menu/update/" + savedDish._id())
                .contentType(MediaType.APPLICATION_JSON)
                .content(updateDishDtoJson))
                .andReturn();
        Dish updatedDish = objectMapper.readValue(updateResult.getResponse().getContentAsString(), Dish.class);

        Dish expectedDish = new Dish(savedDish._id(), DishCategoryEnum.FRY, "Test", "Test", 1.00F, false, false,savedDish.dishId(), savedDish.imageURL());
        Assertions.assertEquals(updatedDish, expectedDish);
    }

    @Test
    void getAllFilteredDishes_whenCategoryIsDRINKAndAvailabilityIsTrue_shouldReturnExpectedDish () throws Exception {
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", 5.00F, true, true);
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
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", 5.00F, true, true);
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
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", 5.00F, true, true);
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
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", 5.00F, true, true);
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
        DishDTO dishDto = new DishDTO(DRINK, "Water", "Water", 5.00F, true, true);
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
}
