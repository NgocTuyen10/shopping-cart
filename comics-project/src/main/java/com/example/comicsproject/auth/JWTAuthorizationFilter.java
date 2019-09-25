package com.example.comicsproject.auth;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.example.comicsproject.config.JWTConfig;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter  {
  private JWTConfig jwtConfig;
  
   public JWTAuthorizationFilter(AuthenticationManager authManager, JWTConfig config) {
          super(authManager);
          this.jwtConfig = config;
      }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {

    // 1. get the authentication header. Tokens are supposed to be passed in the
    // authentication header
    String header = request.getHeader(jwtConfig.getHeader());

    // 2. validate the header and check the prefix
    if (header == null || !header.startsWith(jwtConfig.getPrefix())) {
      chain.doFilter(request, response); // If not valid, go to the next filter.
      return;
    }

    // If there is no token provided and hence the user won't be authenticated.
    // It's Ok. Maybe the user accessing a public path or asking for a token.

    // All secured paths that needs a token are already defined and secured in
    // config class.
    // And If user tried to access without access token, then he won't be
    // authenticated and an exception will be thrown.

    // 3. Get the token
    UsernamePasswordAuthenticationToken authentication = getAuthentication(request);
    SecurityContextHolder.getContext().setAuthentication(authentication);
    chain.doFilter(request, response);
  }

  private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
    // 1. get the authentication header. Tokens are supposed to be passed in the
    // authentication header
    String header = request.getHeader(jwtConfig.getHeader());
    // 3. Get the token
    String token = header.replace(jwtConfig.getPrefix(), "");
    UsernamePasswordAuthenticationToken auth = null;
    try { // exceptions might be thrown in creating the claims if for example the token is
        // expired

      // 4. Validate the token
      Claims claims = Jwts.parser().setSigningKey(jwtConfig.getSecret().getBytes())
                     .parseClaimsJws(token)
                     .getBody();
      String username = claims.getSubject();
      if (username != null) {
        @SuppressWarnings("unchecked")
        List<String> authorities = (List<String>) claims.get("authorities");

        // 5. Create auth object
        // UsernamePasswordAuthenticationToken: A built-in object, used by spring to
        // represent the current authenticated / being authenticated user.
        // It needs a list of authorities, which has type of GrantedAuthority interface,
        // where SimpleGrantedAuthority is an implementation of that interface
        auth = new UsernamePasswordAuthenticationToken(username, null, authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));

        // 6. Authenticate the user
        // Now, user is authenticated
        SecurityContextHolder.getContext().setAuthentication(auth);
      }
    } catch (Exception e) {
      // In case of failure. Make sure it's clear; so guarantee user won't be
      // authenticated
      SecurityContextHolder.clearContext();
    }
    
    return auth;
    
  }
}