package ch.japt.epj.controller;

import static ch.japt.epj.helper.PaginationChecker.isPaginated;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.hamcrest.core.IsNull;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class PersonControllerTests extends AuthenticatedControllerTest {

  @Autowired private MockMvc mvc;

  @Test
  public void getExistingPersonById() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/person/5")
            .header("Authorization", token)
            .contentType(MediaType.APPLICATION_JSON);

    ResultActions actions =
        mvc.perform(request)
            .andExpect(status().isOk())
            .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

    assertPersonPayload(actions, "$[0]");
  }

  @Test
  public void getCurrentPerson() throws Exception {
    setCurrentToken("dolores.abernathy@host.westworld.com", "dolores");

    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/person/current")
            .header("Authorization", token)
            .contentType(MediaType.APPLICATION_JSON);

    ResultActions actions =
        mvc.perform(request)
            .andExpect(status().isOk())
            .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

    assertPersonPayload(actions, "$");
  }

  @Test
  public void checkPersonPagination() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/person")
            .header("Authorization", token)
            .contentType(MediaType.APPLICATION_JSON);

    mvc.perform(request)
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(isPaginated());
  }

  @Test
  public void getCommaSeparatedPeople() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/person/5,3")
            .header("Authorization", token)
            .contentType(MediaType.APPLICATION_JSON);

    ResultActions actions =
        mvc.perform(request)
            .andExpect(status().isOk())
            .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$", hasSize(2)));

    assertPersonPayload(actions, "$[1]");
  }

  private static void assertPersonPayload(ResultActions mvc, String object) throws Exception {
    mvc.andExpect(jsonPath(object + ".id").value(5))
        .andExpect(jsonPath(object + ".firstName").value("Dolores"))
        .andExpect(jsonPath(object + ".lastName").value("Abernathy"))
        .andExpect(jsonPath(object + ".email").value("dolores.abernathy@host.westworld.com"))
        .andExpect(jsonPath(object + ".password").value(IsNull.nullValue()))
        .andExpect(jsonPath(object + ".schools").isArray());
  }
}
