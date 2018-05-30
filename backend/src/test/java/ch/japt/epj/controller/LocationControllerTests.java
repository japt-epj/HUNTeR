package ch.japt.epj.controller;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
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
public class LocationControllerTests extends AuthenticatedControllerTest {
  @Autowired private MockMvc mvc;;

  @Before
  public void authenticateAsStudent() {
    setCurrentToken("andi.hoerler@hsr.ch", "andi");
  }

  @Test
  public void getNextLocationInExecution() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/location/6")
            .header("Authorization", token)
            .accept(MediaType.APPLICATION_JSON);

    mvc.perform(request)
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").exists())
        .andExpect(jsonPath("$.exerciseTitle").value("Sexualkunde"))
        .andExpect(jsonPath("$.lat").value(47.225361))
        .andExpect(jsonPath("$.lng").value(8.816099));
  }

  @Test
  public void getAllNextLocations() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/location")
            .header("Authorization", token)
            .accept(MediaType.APPLICATION_JSON);

    mvc.perform(request)
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").exists())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$", hasSize(8)));
  }
}
