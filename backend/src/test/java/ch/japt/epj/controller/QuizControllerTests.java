package ch.japt.epj.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class QuizControllerTests extends AuthenticatedControllerTest {
  @Test
  public void getQuizById() throws Exception {}

  private static void assertQuizPayload(ResultActions mvc, String object) throws Exception {}
}
