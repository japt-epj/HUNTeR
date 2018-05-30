package ch.japt.epj.controller;

import ch.japt.epj.helper.TestUserAuthenticator;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AuthenticatedControllerTest {

  protected String token;
  protected @Autowired TestUserAuthenticator authenticator;

  @Before
  public void setCurrentToken() {
    token = authenticator.authenticate("tobias.saladin@hsr.ch", "tobias");
  }

  public void setCurrentToken(String email, String password) {
    token = authenticator.authenticate(email, password);
  }
}
