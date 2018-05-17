package ch.japt.epj.controller;

import ch.japt.epj.security.JwtTokenProvider;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthenticatedControllerTest {

  protected String completeToken;
  @Autowired private JwtTokenProvider tokenProvider;
  @Autowired private AuthenticationManager authenticationManager;

  @Before
  public void getToken() {
    String validEmail = "jonas.kugler@hsr.ch";
    String validPassword = "jonas";
    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(validEmail, validPassword));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    completeToken = "Bearer " + tokenProvider.generateToken(authentication);
  }
}
