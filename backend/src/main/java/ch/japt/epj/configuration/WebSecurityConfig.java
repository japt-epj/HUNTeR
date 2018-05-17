package ch.japt.epj.configuration;

import ch.japt.epj.security.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired JwtTokenProvider tokenProvider;
  @Autowired CustomUserDetailsService customUserDetailsService;

  private final JwtAuthenticationEntryPoint unauthorizedHandler;

  public WebSecurityConfig(
      @Autowired JwtAuthenticationEntryPoint unauthorizedHandler,
      @Autowired CustomUserDetailsService customUserDetailsService) {
    this.unauthorizedHandler = unauthorizedHandler;
    this.customUserDetailsService = customUserDetailsService;
  }

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  public void configure(AuthenticationManagerBuilder authenticationManagerBuilder)
      throws Exception {
    authenticationManagerBuilder
        .userDetailsService(customUserDetailsService)
        .passwordEncoder(passwordEncoder());
  }

  @Bean(BeanIds.AUTHENTICATION_MANAGER)
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // these paths are allowed free access
    String[] allowed = {"/api/auth/**", "/static/**"};

    http.cors()
        .and()
        .csrf()
        .disable()
        .exceptionHandling()
        .authenticationEntryPoint(unauthorizedHandler)
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeRequests()
        .antMatchers(allowed)
        .permitAll()
        .anyRequest()
        .authenticated()
        .and()
        .formLogin()
        //                uncommenting this should enable a default login form
        //                we need to replace this with a custom one
        .loginPage("/")
        .permitAll()
        .and()
        .logout()
        .permitAll();
    //
    //        // This is key for exposing csrf tokens in apis that are outside
    //        // of the browser. We will need these headers in react and for
    //        // testing with postman etc.
    http.addFilterBefore(
        new JwtAuthenticationFilter(tokenProvider, customUserDetailsService),
        UsernamePasswordAuthenticationFilter.class);
  }
}
