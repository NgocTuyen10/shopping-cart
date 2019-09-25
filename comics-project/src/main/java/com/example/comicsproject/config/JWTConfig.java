package com.example.comicsproject.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class JWTConfig {
  @Value("${security.jwt.uri:/login}")
  private String Uri;

  @Value("${security.jwt.header:X-Auth-Token}")
  private String header;

  @Value("${security.jwt.prefix:Bearer }")
  private String prefix;

  @Value("${security.jwt.expiration:#{24*60*60}}")
  private int expiration;

  @Value("${security.jwt.secret:JwtSecretKey}")
  private String secret;
}