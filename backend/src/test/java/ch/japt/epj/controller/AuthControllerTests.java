package ch.japt.epj.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
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
public class AuthControllerTests extends AuthenticatedControllerTest {

  @Autowired private MockMvc mvc;

  @Test
  public void shouldLoginPerson() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.post("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"email\": \"tobias.saladin@hsr.ch\",\"password\": \"tobias\"}");

    mvc.perform(request).andExpect(status().isOk());
  }

  @Test
  public void shouldRegisterPerson() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.post("/api/auth/register")
            .header("Authorization", completeToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(
                "{\"id\":1,\"firstname\":\"Donald\",\"lastname\":\"Duck\",\"email\":\"donald.duck@disney.ch\"}");

    mvc.perform(request).andExpect(status().isCreated());
  }

  @Test
  public void shouldReturnConflictOnRegisterPerson() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.post("/api/auth/register")
            .header("Authorization", completeToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(
                "{\"id\":1,\"firstname\":\"Tobias\",\"lastname\":\"Saladin\",\"email\":\"tobias.saladin@hsr.ch\",\"password\":\"tobias\"}");

    mvc.perform(request).andExpect(status().isConflict());
  }

  @Test
  public void shouldReturnStudentEntryPointHunter() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/auth/entryPoint")
            .header("Authorization", completeToken)
            .header("X-HUNTeR-Frontend", true)
            .contentType(MediaType.APPLICATION_JSON);

    mvc.perform(request)
        .andExpect(status().isOk())
        .andExpect(header().stringValues("X-HUNTeR-Redirect", "/teacher"));
  }
}
