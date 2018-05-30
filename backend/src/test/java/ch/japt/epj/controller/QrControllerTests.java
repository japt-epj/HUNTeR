package ch.japt.epj.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
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

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class QrControllerTests extends AuthenticatedControllerTest {

  @Autowired private MockMvc mvc;

  @Test
  public void invalidExerciseId() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/execution/20000/print")
            .header("Authorization", completeToken)
            .accept(MediaType.APPLICATION_PDF);

    mvc.perform(request).andExpect(status().isNotFound());
  }

  @Test
  public void pdfStringsTest() throws Exception {
    MockHttpServletRequestBuilder request =
        MockMvcRequestBuilders.get("/api/execution/6/print")
            .header("Authorization", completeToken)
            .accept(MediaType.APPLICATION_PDF);

    byte[] responseData =
        mvc.perform(request)
            .andExpect(status().isOk())
            .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PDF))
            .andReturn()
            .getResponse()
            .getContentAsByteArray();

    PDDocument document = PDDocument.load(responseData);

    String[] searchStrings = {
      "Sexualkunde",
      "Zweisamkeit",
      "Was machte Reinhold Messner mit dem Mount Everest?",
      "Eines muss man den Karibikbewohnern wirklich lassen:"
    };

    searchText(document, searchStrings);
  }

  private void searchText(PDDocument document, String[] searchStrings) throws IOException {
    String pdfText = "";
    try {
      pdfText = new PDFTextStripper().getText(document);
    } catch (IOException e) {
      System.out.println(e.getMessage());
    }
    for (String searchString : searchStrings) {
      assertThat(pdfText.contains(searchString)).isTrue();
    }
  }
}
