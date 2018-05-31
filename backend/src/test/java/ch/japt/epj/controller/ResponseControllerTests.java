package ch.japt.epj.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class ResponseControllerTests extends AuthenticatedControllerTest {
  @Autowired private MockMvc mvc;

  @Test
  public void createNewResponse() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.post("/api/response")
            .header("Authorization", token)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"exerciseId\": \"1\", \"executionId\": \"1\", \"answerId\": \"1\"}");

    mvc.perform(request).andExpect(status().isCreated());
  }
}
