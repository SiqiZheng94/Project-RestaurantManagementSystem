package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.With;

@With
@Data
@AllArgsConstructor
public class User {
    private String username;
    private String password;
    private String token;
}
