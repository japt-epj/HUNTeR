package ch.japt.epj.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ControllerExceptionHandler {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseBody ExceptionInformation handleInvalidArgument(HttpServletRequest request, IllegalArgumentException e) {
        return new ExceptionInformation(
                e.getMessage(),
                request.getRequestURL().toString(),
                request.getQueryString(),
                request.getMethod());
    }
}
