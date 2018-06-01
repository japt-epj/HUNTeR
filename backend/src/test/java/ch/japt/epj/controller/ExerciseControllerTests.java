package ch.japt.epj.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.jayway.jsonpath.JsonPath;
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
public class ExerciseControllerTests extends AuthenticatedControllerTest {

  @Autowired private MockMvc mvc;

  @Test
  public void getExerciseSuccess() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/exercise/2")
            .header("Authorization", token)
            .accept(MediaType.APPLICATION_JSON);

    mvc.perform(request)
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$[0].name").value("Bauernleben"))
        .andExpect(
            jsonPath("$[0].question")
                .value(
                    "Wenn das Wetter gut ist, wird der Bauer bestimmt den Eber, das Ferkel und..."))
        .andExpect(jsonPath("$[0].answers[0].text").value("...einen draufmachen"))
        .andExpect(jsonPath("$[0].answers[1].text").value("...die Nacht durchzechen"))
        .andExpect(jsonPath("$[0].answers[2].text").value("...die Sau rauslassen"))
        .andExpect(jsonPath("$[0].answers[3].text").value("...auf die Kacke hauen"));
  }

  @Test
  public void checkPageInformationDefaultQuery() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/exercise")
            .header("Authorization", token)
            .accept(MediaType.APPLICATION_JSON);

    mvc.perform(request)
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$.numberOfElements").value(5))
        .andExpect(jsonPath("$.size").value(5))
        .andExpect(jsonPath("$.number").value(0))
        .andExpect(jsonPath("$.last").value(false))
        .andExpect(jsonPath("$.first").value(true))
        .andExpect(jsonPath("$.sort[0].direction").value("ASC"))
        .andExpect(jsonPath("$.sort[0].property").value("name"))
        .andExpect(jsonPath("$.sort[0].ascending").value("true"))
        .andExpect(jsonPath("$.sort[0].descending").value("false"));
  }

  @Test
  public void checkPageInformationEmptyPage() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/exercise?page=100&limit=2")
            .header("Authorization", token)
            .accept(MediaType.APPLICATION_JSON);

    mvc.perform(request)
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$.numberOfElements").value(0))
        .andExpect(jsonPath("$.size").value(2))
        .andExpect(jsonPath("$.number").value(100))
        .andExpect(jsonPath("$.last").value(true))
        .andExpect(jsonPath("$.first").value(false))
        .andExpect(jsonPath("$.sort[0].direction").value("ASC"))
        .andExpect(jsonPath("$.sort[0].property").value("name"))
        .andExpect(jsonPath("$.sort[0].ascending").value("true"))
        .andExpect(jsonPath("$.sort[0].descending").value("false"));
  }

  @Test
  public void checkInvalidPagination() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/exercise/?sort=blabla")
            .header("Authorization", token)
            .accept(MediaType.APPLICATION_JSON);

    mvc.perform(request).andExpect(status().isOk()).andExpect(content().string(""));
  }

  @Test
  public void getExerciseNotFound() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/exercise/100000")
            .header("Authorization", token)
            .accept(MediaType.APPLICATION_JSON);

    mvc.perform(request)
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(content().string("[]"));
  }

  @Test
  public void makeExerciseSuccess() throws Exception {
    MockHttpServletRequestBuilder post =
        MockMvcRequestBuilders.post("/api/exercise")
            .header("Authorization", token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(
                "{ \"name\": \"This is a test question\", \"question\": \"What is 42?\", \"answers\": [ { \"text\": \"A number\" }, { \"text\": \"The answer to everything\" } ], \"correctAnswer\": \"1\" }");

    mvc.perform(post).andExpect(status().isCreated());

    MockHttpServletRequestBuilder getId =
        MockMvcRequestBuilders.get("/api/exercise")
            .header("Authorization", token)
            .accept(MediaType.APPLICATION_JSON)
            .param("sort", "exerciseId,desc");

    String content = mvc.perform(getId).andReturn().getResponse().getContentAsString();
    Integer id = JsonPath.read(content, "$.content[0].id");

    MockHttpServletRequestBuilder get =
        MockMvcRequestBuilders.get("/api/exercise/teacher/" + id)
            .header("Authorization", token)
            .accept(MediaType.APPLICATION_JSON);

    mvc.perform(get)
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$[0].name").value("This is a test question"))
        .andExpect(jsonPath("$[0].answers[0].checked").value(false))
        .andExpect(jsonPath("$[0].answers[1].checked").value(true));
  }

  @Test
  public void participantNeverSeesAnswer() throws Exception {
    setCurrentToken("andi.hoerler@hsr.ch", "andi");
    MockHttpServletRequestBuilder get =
        MockMvcRequestBuilders.get("/api/exercise/1,2,5")
            .header("Authorization", token)
            .accept(MediaType.APPLICATION_JSON);

    mvc.perform(get)
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$").isNotEmpty())
        .andExpect(jsonPath("$[*].answers[?(@.checked === true)]").isEmpty());
  }

  @Test
  public void makeExerciseFailure() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.post("/api/exercise")
            .header("Authorization", token)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{}");

    mvc.perform(request).andExpect(status().isBadRequest());
  }
}
