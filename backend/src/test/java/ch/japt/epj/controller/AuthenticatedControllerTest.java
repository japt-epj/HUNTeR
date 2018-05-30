package ch.japt.epj.controller;

import ch.japt.epj.helper.TestUserAuthenticator;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AuthenticatedControllerTest {

  protected String completeToken;
  @Autowired TestUserAuthenticator authenticator;

  @Before
  public void getToken() {
    String validEmail = "tobias.saladin@hsr.ch";
    String validPassword = "tobias";
    completeToken = authenticator.authenticate(validEmail, validPassword);
  }
}
