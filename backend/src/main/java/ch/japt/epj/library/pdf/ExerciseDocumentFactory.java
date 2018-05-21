package ch.japt.epj.library.pdf;

import ch.japt.epj.model.data.Exercise;
import ch.japt.epj.model.data.Quiz;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDDocument;

public class ExerciseDocumentFactory implements AutoCloseable {
  private final Quiz quiz;
  private final PDDocument document;

  public ExerciseDocumentFactory(Quiz quiz) {
    this.quiz = quiz;
    this.document = new PDDocument();
  }

  private void make() throws IOException {
    for (Exercise exercise : quiz.getTasks()) {
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
