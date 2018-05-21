package ch.japt.epj.library.pdf;

import ch.japt.epj.model.data.Execution;
import ch.japt.epj.model.data.Location;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExecutionDocumentFactory implements AutoCloseable {
  private final PDDocument document;
  private final Execution execution;
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  public ExecutionDocumentFactory(Execution execution) {
    this.execution = execution;
    this.document = new PDDocument();
  }

  private void make() throws IOException {
    for (Location location : execution.getQuiz().getLocations()) {
      try (LocationPage page = new LocationPage(document, location, execution.getExecutionId())) {
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
      logger.warn(e.getMessage());
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
