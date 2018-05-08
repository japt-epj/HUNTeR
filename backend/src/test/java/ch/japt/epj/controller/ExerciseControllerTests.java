package ch.japt.epj.controller;

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

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ExerciseControllerTests {
    @Autowired
    private MockMvc mvc;

    @Test
    public void emptyTest() throws Exception {
    }

//    @Test
    public void getExerciseSuccess() throws Exception {
        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                .get("/api/exercise/2")
                .accept(MediaType.APPLICATION_JSON);

        mvc.perform(request)
                .andExpect(status().is4xxClientError())
                /*.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name").value("Natur und Umwelt"))
                .andExpect(jsonPath("$[0].question").value("Wenn das Wetter gut ist, wird der Brauer bestimmt den Eber, das Ferkel und..."))
                .andExpect(jsonPath("$[0].answers[0]").value("...einen draufmachen"))
                .andExpect(jsonPath("$[0].answers[1]").value("...die Nacht durchzechen"))
                .andExpect(jsonPath("$[0].answers[2]").value("...die Sau rauslassen"))
                .andExpect(jsonPath("$[0].answers[3]").value("...auf die Kacke hauen"))*/;
    }

//    @Test
    public void getExerciseNotFound() throws Exception {
        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                .get("/api/exercise/100000")
                .accept(MediaType.APPLICATION_JSON);

        mvc.perform(request)
                .andExpect(status().is4xxClientError())
                /*.andExpect(content().string("[]"))*/;
    }
}
