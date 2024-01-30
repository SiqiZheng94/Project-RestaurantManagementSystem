package com.example.backend.repo;

import com.example.backend.entity.Order;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface OrderRepo extends MongoRepository<Order, String> {
}
