package ch.japt.epj.advice;

import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ControllerExceptionHandler {
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(IllegalArgumentException.class)
  @ResponseBody
  ExceptionInformation handleInvalidArgument(
      HttpServletRequest request, IllegalArgumentException e) {
    return new ExceptionInformation(
        e.getMessage(),
        request.getRequestURL().toString(),
        request.getQueryString(),
        request.getMethod());
  }
}
