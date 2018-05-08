package ch.japt.epj.security;


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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class JwtTokenProviderTests {

    private final String validEmail = "jonas.kugler@hsr.ch";
    private final String validPassword = "jonas";

    private final String invalidEmail = "test@test.ch";
    private final String invalidPassword = "testPW";


    @Autowired
    private MockMvc mvc;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Test
    public void shouldNotAllowAccessToUnauthenticatedUsers() throws Exception {
        MockHttpServletRequestBuilder request =
                MockMvcRequestBuilders
                        .get("/api/person")
                        .accept(MediaType.APPLICATION_JSON);

        mvc.perform(request).andExpect(status().isUnauthorized());

    }

    @Test
    public void shouldProvideJwtToken() throws Exception {


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(validEmail, validPassword)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        mvc.perform(MockMvcRequestBuilders.get("/api/person").header("Authorization", "Bearer " + token)).andExpect(status().isOk());
    }


}
