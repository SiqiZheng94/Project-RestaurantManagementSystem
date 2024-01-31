package com.example.backend.util;

import io.jsonwebtoken.*;

import java.util.Date;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JwtUtil {
    private static long time = 1000L*60;
    private static String signature = "admin";
    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    private JwtUtil() {
    }
    public static String createToken(){
        JwtBuilder jwtBuilder = Jwts.builder();
        return jwtBuilder
                //header
                .setHeaderParam("typ","JWT")
                .setHeaderParam("alg","HS256")
                //payload
                .claim("username","admin")
                .claim("role","admin")
                .setSubject("admin-test")
                .setExpiration(new Date(System.currentTimeMillis() + time))
                .setId(UUID.randomUUID().toString())
                //signature
                .signWith(SignatureAlgorithm.HS256, signature)
                .compact();
    }
    // test if the token is expired
    public static boolean checkToken(String token){
        if (token == null || token.isEmpty()){
            return false;
        }
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(signature).parseClaimsJws(token);
        } catch (Exception e) {
            // Log the exception using SLF4J logger
            logger.error("Error checking token: " + e.getMessage(), e);
            return false;
        }
        return true;
    }
}
