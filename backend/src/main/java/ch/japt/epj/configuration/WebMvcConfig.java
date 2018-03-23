package ch.japt.epj.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = { "classpath:/public/" };

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        super.addResourceHandlers(registry);

//        if (!registry.hasMappingForPattern("/webjars/**")) {
//            registry
//                    .addResourceHandler("/webjars/**")
//                    .addResourceLocations("classpath:/META-INF/resources/webjars/");
//        }

        if (!registry.hasMappingForPattern("/app/**")) {
            registry
                    .addResourceHandler("/app/**")
                    .addResourceLocations("classpath:/META-INF/resources/webjars/frontend/");
        }

//        if (!registry.hasMappingForPattern("/static/**")) {
//            registry
//                    .addResourceHandler("/static/**")
//                    .addResourceLocations("classpath:/META-INF/resources/webjars/frontend/static");
//        }
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry
                .addViewController("/")
                // maybe just try a location here?
                .setViewName("forward:/app/index.html");
    }
}
