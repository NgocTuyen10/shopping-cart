package com.example.comicsproject.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.example.comicsproject.config.JWTConfig;
import com.example.comicsproject.service.UserDetailsServiceImpl;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class JWTWebSecurity extends WebSecurityConfigurerAdapter {
  @Autowired
  private JWTConfig jwtConfig;

  @Autowired
  private UserDetailsServiceImpl userDetailsService;

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable().authorizeRequests().antMatchers(HttpMethod.POST, jwtConfig.getUri()).permitAll()
        .antMatchers("/register", "/img/**","/fonts/**","/css/**", "/js/**", "/lib/**", "/webjars/**","/login/**","/register/**", "/error.html",
            "/views/**","/auth/**", "**.xlsm", "**.docx", "**.pdf", "**.xlsx", "/upload/**")
        .permitAll()
        .antMatchers("/main", "/index","/comics/**", "/searchresult", "/favicon.ico",
            "/lastmonthdashboard", "/logout")
        .permitAll().antMatchers("/").permitAll().anyRequest().authenticated().and()
        .addFilter(new JWTAuthenticationFilter(authenticationManager(), jwtConfig))
        .addFilter(new JWTAuthorizationFilter(authenticationManager(), jwtConfig))
        // this disables session creation on Spring Security
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }

  @Override
  public void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
  }

  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

}
