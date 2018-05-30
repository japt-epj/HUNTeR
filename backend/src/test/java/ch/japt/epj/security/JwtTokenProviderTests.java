package ch.japt.epj.security;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class JwtTokenProviderTests {

  private final String validEmail = "tobias.saladin@hsr.ch";
  private final String validPassword = "tobias";

  private final String invalidEmail = "test@test.ch";
  private final String invalidPassword = "testPW";

  @Autowired private MockMvc mvc;

  @Autowired private JwtTokenProvider tokenProvider;

  @Autowired private AuthenticationManager authenticationManager;

  @Test
  public void shouldNotAllowAccessToUnauthenticatedUsers() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/person").accept(MediaType.APPLICATION_JSON);

    mvc.perform(request).andExpect(status().isUnauthorized());
  }

  @Test
  public void shouldProvideValidJwtToken() throws Exception {

    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(validEmail, validPassword));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String token = tokenProvider.generateToken(authentication);

    mvc.perform(
            MockMvcRequestBuilders.get("/api/person").header("Authorization", "Bearer " + token))
        .andExpect(status().isOk());
  }

  @Test
  public void shouldReturnFalseWithInvalidTokenSignature() throws Exception {
    String token =
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2p3dC1pZHAuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsdG86bWlrZUBleGFtcGxlLmNvbSIsIm5iZiI6MTUyNjYzNTY0OCwiZXhwIjoxNTI2NjM5MjQ4LCJpYXQiOjE1MjY2MzU2NDgsImp0aSI6ImlkMTIzNDU2IiwidHlwIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9yZWdpc3RlciJ9.DdUBpjoShYezUaOEbxmOfz7O0XwqfX8XyE4XACO6EF7q4ITNm4Q9fIHsHEzXTBMREFP8LRCDwbWzA7p8Qgxwlw";
    assertThat(tokenProvider.validateToken(token)).isFalse();
  }

  @Test
  public void shouldReturnFalseWithEmptyToken() throws Exception {
    String token = "";
    assertThat(tokenProvider.validateToken(token)).isFalse();
  }

  @Test
  public void shouldReturnFalseWithMalformedToken() throws Exception {
    String token =
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2p3dC1pZHAuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsdG86bWlrZUBleGFtcGxlLmNvbSIsIm5iZiI6MTUyNjYzOTU1OCwiZXhwIjoxNTI2NjQzMTU4LCJpYXQiOjE1MjY2Mzk1NTgsImp0aSI6ImlkMTIzNDU2IiwidHlwIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9yZWdpc3RlciJ9.Pfs18Hm2aISZte4ZLR5dRN1xJHs6_Pp8JE7UTqQDkLb3tYK1O7zrYNMuJQAvOqaB-DRobPNnDW9z7uBJBCNAYQ";
    assertThat(tokenProvider.validateToken(token)).isFalse();
  }

  @Test
  public void shouldReturnFalseWithExpiredToken() throws Exception {
    String token =
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNTI2NjM5OTk2LCJleHAiOjE1MjY2Mzk5OTd9.lAopehfqkH261MFWS4Y__WvfqRRmDq7wZv0MEuQdphlDyz6Ru7S0UuBrtmw0Ob01CyqoO_riA6ODdp9zbzkt8A";
    assertThat(tokenProvider.validateToken(token)).isFalse();
  }
}
