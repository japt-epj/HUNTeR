package ch.japt.epj.controller;

import ch.japt.epj.helper.TestUserAuthenticator;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AuthenticatedControllerTest {

  protected String completeToken;
  protected @Autowired TestUserAuthenticator authenticator;

  @Before
  public void getToken() {
    completeToken = authenticator.authenticate("tobias.saladin@hsr.ch", "tobias");
  }

  public void getToken(String email, String password) {
    completeToken = authenticator.authenticate(email, password);
  }
}
