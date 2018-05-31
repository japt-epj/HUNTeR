package ch.japt.epj.helper;

import ch.japt.epj.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class TestUserAuthenticator {

  private final JwtTokenProvider tokenProvider;
  private final AuthenticationManager authenticationManager;

  public TestUserAuthenticator(
      @Autowired JwtTokenProvider tokenProvider,
      @Autowired AuthenticationManager authenticationManager) {
    this.tokenProvider = tokenProvider;
    this.authenticationManager = authenticationManager;
  }

  public String authenticate(String email, String password) {
    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    return "Bearer " + tokenProvider.generateToken(authentication);
  }
}
