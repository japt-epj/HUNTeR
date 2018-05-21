package ch.japt.epj.library.pdf;

import ch.japt.epj.model.data.Execution;
import ch.japt.epj.model.data.Exercise;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDDocument;

public class ExecutionDocumentFactory implements AutoCloseable {
  private final PDDocument document;
  private final Execution execution;

  public ExecutionDocumentFactory(Execution execution) {
    this.execution = execution;
    this.document = new PDDocument();
  }

  private void make() throws IOException {
    for (Exercise exercise : execution.getQuiz().getTasks()) {
      try (ExercisePage page = new ExercisePage(document, exercise)) {
        page.addContent();
      }
    }
  }

  public byte[] asArray() {
    try {
      ByteArrayOutputStream stream = new ByteArrayOutputStream();
      make();
      document.save(stream);
      return stream.toByteArray();
    } catch (IOException e) {
      return new byte[0];
    }
  }

  @Override
  public void close() throws Exception {
    if (document != null) {
      document.close();
    }
  }
}
