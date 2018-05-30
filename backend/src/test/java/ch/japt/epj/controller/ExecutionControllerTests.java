package ch.japt.epj.controller;

import static ch.japt.epj.Helper.PaginationChecker.isPaginated;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
public class ExecutionControllerTests extends AuthenticatedControllerTest {

  @Autowired private MockMvc mvc;

  @Test
  public void getExecutionById() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/execution/1")
            .header("Authorization", completeToken)
            .contentType(MediaType.APPLICATION_JSON);

    mvc.perform(request)
        .andExpect(status().isOk())
        .andExpect(isPaginated())
        .andExpect(
            content()
                .string(
                    "{\"id\":1,\"name\":\"Testy McTestface\",\"startDate\":\"2018-05-11T09:03:06.008\",\"endDate\":\"2018-05-31T10:03:06.010\",\"participants\":[\"Dolores Abernathy\",\"Harold Finch\",\"Robert Ford\"]}"));
  }

  @Test
  public void createExecutionInvalidPayload() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.post("/api/execution")
            .header("Authorization", completeToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{}");

    mvc.perform(request).andExpect(status().isBadRequest());
  }

  @Test
  public void createExecution() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.post("/api/execution")
            .header("Authorization", completeToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(
                "{\"name\":\"test\",\"quizId\":4,\"participants\":[5,12,9,14,10],\"startDate\":\"2018-05-04T10:21:10.356Z\",\"endDate\":\"2018-05-04T11:21:10.356Z\"}");

    mvc.perform(request).andExpect(status().isCreated());
  }

  @Test
  public void checkPaginationPayload() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/execution")
            .header("Authorization", completeToken)
            .contentType(MediaType.APPLICATION_JSON);

    mvc.perform(request)
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(isPaginated());
  }
}
