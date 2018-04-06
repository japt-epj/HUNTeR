package ch.japt.epj.configuration;

public class WebSecurityConfig{}

//@Configuration
//@EnableWebSecurity
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        // these paths are allowed free access
//        String[] allowed = {
//                "/",
//                "/portfolio",
//                "/portfolio/*",
//                "/*",
//                "/static/**/*"
//        };
//
////        http
////                .authorizeRequests()
////                    .antMatchers(allowed).permitAll()
////                    .anyRequest().authenticated()
////                    .and()
////                .formLogin()
////                    // uncommenting this should enable a default login form
////                    // we need to replace this with a custom one
////                    //.loginPage("login")
////                    .permitAll()
////                    .and()
////                .logout()
////                    .permitAll();
//
//        // This is key for exposing csrf tokens in apis that are outside
//        // of the browser. We will need these headers in react and for
//        // testing with postman etc.
//        http.addFilterAfter(new CsrfTokenResponseHeaderBindingFilter(), CsrfFilter.class);
//    }
//}
