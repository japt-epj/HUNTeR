package ch.japt.epj.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = { "classpath:/public/" };

    @Override
    @Profile({"standalone", "test"})
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        super.addResourceHandlers(registry);

        if (!registry.hasMappingForPattern("/index.html")) {
            registry.addResourceHandler("/index.html")
                    .addResourceLocations("classpath:/META-INF/resources/webjars/frontend/index.html");
        }

        if (!registry.hasMappingForPattern("/static/**")) {
            registry.addResourceHandler("/static/**")
                    .addResourceLocations("classpath:/META-INF/resources/webjars/frontend/static/");
        }
    }

    @Override
    @Profile({"standalone", "test"})
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/")
                .setViewName("forward:/index.html");
    }

    @Bean
    @Profile("!prod")
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("*");
            }
        };
    }
}
