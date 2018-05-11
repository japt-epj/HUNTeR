package ch.japt.epj.controller;

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
public class PersonControllerTests {
  @Autowired private MockMvc mvc;

  @Test
  public void getExistingPersonById() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/person/1").contentType(MediaType.APPLICATION_JSON);

    mvc.perform(request)
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$[0]").exists())
        .andExpect(jsonPath("$[0].firstName").value("Tobias"))
        .andExpect(jsonPath("$[0].lastName").value("Saladin"))
        .andExpect(jsonPath("$[0].email").value("tobias.saladin@hsr.ch"));
    // this needs to be uncommented, we really shouldn't be sending passwords!
    //                .andExpect(jsonPath("$[0].password").doesNotExist());

  }
}
