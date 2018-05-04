package ch.japt.epj.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.stream.Collectors;

@Configuration
@Profile({"dev", "test"})
public class LoggingConfiguration extends WebMvcConfigurerAdapter {
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new LoggingInterceptor()).addPathPatterns("/**");
  }

  class LoggingInterceptor implements HandlerInterceptor {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Override
    public boolean preHandle(
        HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
      String headers =
          response
              .getHeaderNames()
              .stream()
              .map(s -> s + ": " + request.getHeader(s))
              .collect(Collectors.joining("\n"));

      String message =
          String.format(
              "Method: %s, URL: %s, \nHeaders: %s",
              request.getMethod(), request.getRequestURL().toString(), headers);

      log.info(message);
      return true;
    }

    @Override
    public void postHandle(
        HttpServletRequest request,
        HttpServletResponse response,
        Object handler,
        ModelAndView modelAndView)
        throws Exception {
      String headers =
          response
              .getHeaderNames()
              .stream()
              .map(s -> s + ": " + response.getHeader(s))
              .collect(Collectors.joining("\n"));

      String message = String.format("Status: %s, \nHeaders: %s", response.getStatus(), headers);

      log.info(message);
    }

    @Override
    public void afterCompletion(
        HttpServletRequest httpServletRequest,
        HttpServletResponse httpServletResponse,
        Object handler,
        Exception e)
        throws Exception {
      // currently unlogged
    }
  }
}
