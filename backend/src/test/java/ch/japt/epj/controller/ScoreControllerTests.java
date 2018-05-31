package ch.japt.epj.controller;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
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
public class ScoreControllerTests extends AuthenticatedControllerTest {
  @Autowired private MockMvc mvc;

  @Test
  public void getScoreForExecution() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/score/1")
            .header("Authorization", token)
            .accept(MediaType.APPLICATION_JSON);

    mvc.perform(request)
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$.*", hasSize(7)))
        .andExpect(jsonPath("$.3").isNotEmpty())
        .andExpect(jsonPath("$.3.id").value(3))
        .andExpect(jsonPath("$.3.userName").value("Andi H\u00f6rler"))
        .andExpect(jsonPath("$.3.me").value(false))
        .andExpect(jsonPath("$.3.userScore").value(0));
  }
}
