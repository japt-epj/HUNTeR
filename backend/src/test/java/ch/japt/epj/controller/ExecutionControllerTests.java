package ch.japt.epj.controller;

import static ch.japt.epj.helper.PaginationChecker.isPaginated;
import static org.hamcrest.CoreMatchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
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
public class ExecutionControllerTests extends AuthenticatedControllerTest {

  @Autowired private MockMvc mvc;

  @Test
  public void getExecutionById() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/execution/1")
            .header("Authorization", token)
            .accept(MediaType.APPLICATION_JSON);

    ResultActions actions = mvc.perform(request).andExpect(status().isOk());
    assertExecutionPayload(actions, "$");
  }

  @Test
  public void getExecutionByPage() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/execution")
            .header("Authorization", token)
            .param("page", "0")
            .param("limit", "1")
            .param("sort", "executionId,asc")
            .accept(MediaType.APPLICATION_JSON);

    ResultActions actions =
        mvc.perform(request)
            .andExpect(status().isOk())
            .andExpect(isPaginated())
            .andExpect(jsonPath("$.content", hasSize(1)));
    assertExecutionPayload(actions, "$.content[0]");
  }

  @Test
  public void createExecutionInvalidPayload() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.post("/api/execution")
            .header("Authorization", token)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{}");

    mvc.perform(request).andExpect(status().isBadRequest());
  }

  @Test
  public void createExecution() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.post("/api/execution")
            .header("Authorization", token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(
                "{\"name\":\"test\",\"quizId\":4,\"participants\":[5,12,9,14,10],\"startDate\":\"2018-05-04T10:21:10.356Z\",\"endDate\":\"2018-05-04T11:21:10.356Z\"}");

    mvc.perform(request).andExpect(status().isCreated());
  }

  @Test
  public void checkPaginationPayload() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/execution")
            .header("Authorization", token)
            .accept(MediaType.APPLICATION_JSON);

    mvc.perform(request)
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(isPaginated());
  }

  private static String[] participants = {
    "Andi H\u00f6rler",
    "Jonas Kugler",
    "Dolores Abernathy",
    "Maeve Millay",
    "John Reese",
    "Sameen Shaw",
    "Ernest Thornhill"
  };

  private static void assertExecutionPayload(ResultActions mvc, String object) throws Exception {
    mvc.andExpect(jsonPath(object + ".id").value(1))
        .andExpect(jsonPath(object + ".name").value("Geometrie"))
        .andExpect(jsonPath(object + ".startDate").value(IsNull.nullValue()))
        .andExpect(jsonPath(object + ".endDate").value(IsNull.nullValue()))
        .andExpect(jsonPath(object + ".participants").isArray())
        .andExpect(jsonPath(object + ".participants").isNotEmpty())
        .andExpect(jsonPath(object + ".participants", hasSize(7)));

    for (String participant : participants) {
      mvc.andExpect(jsonPath(object + ".participants", hasItem(participant)));
    }
  }
}
