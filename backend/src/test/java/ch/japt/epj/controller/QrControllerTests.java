package ch.japt.epj.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
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

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class QrControllerTests extends AuthenticatedControllerTest {

  @Autowired private MockMvc mvc;

  @Test
  public void invalidExerciseId() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/qrCode/20000")
            .header("Authorization", completeToken)
            .accept(MediaType.APPLICATION_PDF);

    mvc.perform(request).andExpect(status().isNotFound());
  }

  @Test
  public void getQrCodeInPdf() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/execution/2/print")
            .header("Authorization", completeToken)
            .accept(MediaType.APPLICATION_PDF);

    byte[] expected = null;
    try {
      Path filePath = Paths.get("src/main/resources/test-files/qrCodes-execution2.pdf");
      expected = Files.readAllBytes(filePath);
    } catch (Exception e){
      System.out.println(e.getMessage());
    }

    mvc.perform(request)
        .andExpect(status().isOk())
        .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PDF));
    // Not possible to test because of an generated random value inside the pdf file.
    // .andExpect(content().string(new String(expected, "ISO-8859-1")));
  }
}
