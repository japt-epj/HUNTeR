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
    public void getExerciseSuccess() throws Exception {
        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                .get("/api/exercise/2")
                .accept(MediaType.APPLICATION_JSON);

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name").value("Natur und Umwelt"))
                .andExpect(jsonPath("$[0].question").value("Wenn das Wetter gut ist, wird der Brauer bestimmt den Eber, das Ferkel und..."))
                .andExpect(jsonPath("$[0].answers[0]").value("...einen draufmachen"))
                .andExpect(jsonPath("$[0].answers[1]").value("...die Nacht durchzechen"))
                .andExpect(jsonPath("$[0].answers[2]").value("...die Sau rauslassen"))
                .andExpect(jsonPath("$[0].answers[3]").value("...auf die Kacke hauen"));
    }

    @Test
    public void checkPageInformationDefaultQuery() throws Exception {
        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                .get("/api/exercise")
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
        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                .get("/api/exercise?page=100&limit=2")
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
        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                .get("/api/exercise/?sort=blabla")
                .accept(MediaType.APPLICATION_JSON);

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().string(""));
    }

    @Test
    public void getExerciseNotFound() throws Exception {
        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                .get("/api/exercise/100000")
                .accept(MediaType.APPLICATION_JSON);

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(content().string("[]"));
    }

    @Test
    public void makeExerciseSuccess() throws Exception {
        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                .post("/api/exercise")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"name\": \"This is a test question\", \"question\": \"What is 42?\", \"answers\": [ { \"text\": \"A number\", \"checked\": \"false\" }, { \"text\": \"The answer to everything\", \"checked\": \"true\" } ] }");

        mvc.perform(request)
                // this should be set and needs to be fixed on the api level
//                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    public void makeExerciseFailure() throws Exception {
        MockHttpServletRequestBuilder request = MockMvcRequestBuilders
                .post("/api/exercise")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}");

        mvc.perform(request)
                .andExpect(status().isBadRequest());
    }
}
