package ch.japt.epj.configuration;

import ch.japt.epj.security.CustomUserDetailsService;
import ch.japt.epj.security.JwtAuthenticationEntryPoint;
import ch.japt.epj.security.JwtAuthenticationFilter;
import ch.japt.epj.security.JwtTokenProvider;
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


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {


    private final JwtAuthenticationEntryPoint unauthorizedHandler;

    private final CustomUserDetailsService customUserDetailsService;


    public WebSecurityConfig(@Autowired JwtAuthenticationEntryPoint unauthorizedHandler, @Autowired CustomUserDetailsService customUserDetailsService) {
        this.unauthorizedHandler = unauthorizedHandler;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(
            @Autowired JwtTokenProvider tokenProvider,
            @Autowired CustomUserDetailsService customUserDetailsService) {
        return new JwtAuthenticationFilter(tokenProvider, customUserDetailsService);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
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
        String[] allowed = {
                "/",
                "/*",
                "/static/**/*"
        };

        http
                .exceptionHandling()
                    .authenticationEntryPoint(unauthorizedHandler)
                    .and()
                .authorizeRequests()
                    .antMatchers(allowed).permitAll()
                    .anyRequest().authenticated()
                    .and()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()
                .formLogin()
                    // uncommenting this should enable a default login form
                    // we need to replace this with a custom one
                    //.loginPage("login")
                    .permitAll()
                    .and()
                .logout()
                    .permitAll();
//
//        // This is key for exposing csrf tokens in apis that are outside
//        // of the browser. We will need these headers in react and for
//        // testing with postman etc.
//        http.addFilterAfter(new CsrfTokenResponseHeaderBindingFilter(), CsrfFilter.class);
    }
}
