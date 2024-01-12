package com.example.backend;

import com.example.backend.dto.DishInCartDTO;
import com.example.backend.entity.DishInCart;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.List;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class UserControllerTest {
    private final String BASE_URL = "/api/user";
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Test
    void addDishInCart_shouldReturnDishInCart () throws Exception {
        DishInCartDTO dishInCartDTO = new DishInCartDTO(
                1,1, 2.46F
        );
       String dishInCartDtoJson = objectMapper.writeValueAsString(dishInCartDTO);
       MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL+"/shoppingCart/add")
               .contentType(MediaType.APPLICATION_JSON)
               .content(dishInCartDtoJson))
               .andReturn();

        DishInCart dishInCart = objectMapper.readValue(result.getResponse().getContentAsString(), DishInCart.class);
        String dishInCartJson = objectMapper.writeValueAsString(dishInCart);

       mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL+"/shoppingCart"))
               .andExpect(MockMvcResultMatchers.status().isOk())
               .andExpect(MockMvcResultMatchers.content().json(String.valueOf(List.of(dishInCartJson))));
    }
}

