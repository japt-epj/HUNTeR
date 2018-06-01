package ch.japt.epj.library.pdf;

import ch.japt.epj.library.QrGenerator;
import ch.japt.epj.model.data.Coordinates;
import ch.japt.epj.model.data.Location;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.awt.geom.Point2D.Float;
import java.io.IOException;
import java.util.Collection;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.PDPageContentStream.AppendMode;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.slf4j.LoggerFactory;

public final class LocationPage implements AutoCloseable {
  private static final PDRectangle PAGE_FORMAT = PDRectangle.A4;

  private static final PDType1Font TITLE_FONT = PDType1Font.HELVETICA_BOLD;
  private static final int TITLE_FONT_SIZE = 36;

  private static final PDType1Font TEXT_FONT = PDType1Font.HELVETICA;
  private static final int TEXT_FONT_SIZE = 20;

  private static final int QR_SCALE = 10;
  private static final int TITLE_MARGIN_LINES = 1;
  private static final int TEXT_MARGIN_LINES = 4;

  private final PDDocument document;
  private final Location location;
  private final Long executionId;
  private final PDPage page;
  private final Float center;
  private final PDPageContentStream content;

  public LocationPage(PDDocument document, Location location, Long executionId) throws IOException {
    this.document = document;
    this.location = location;
    this.executionId = executionId;
    this.page = new PDPage(PAGE_FORMAT);
    this.center = Geometry.getCenter(page);
    this.content = new PDPageContentStream(document, page, AppendMode.APPEND, false, true);

    document.addPage(page);
  }

  public void addContent() throws IOException {
    addTitle();
    addQuestion();
    addImage();
  }

  private void addTitle() throws IOException {
    writeLines(location.getExercise().getName(), TITLE_MARGIN_LINES, TITLE_FONT, TITLE_FONT_SIZE);
  }

  private void addQuestion() throws IOException {
    writeLines(location.getExercise().getQuestion(), TEXT_MARGIN_LINES, TEXT_FONT, TEXT_FONT_SIZE);
  }

  /*
   * Ignored rule is for magic numbers, but division by two here is obvious.
   */
  @SuppressWarnings("squid:S109")
  private void writeLines(String text, int marginLines, PDFont font, int fontSize)
      throws IOException {
    int letters = Geometry.lettersPerLine(page, font, fontSize);
    Collection<String> lines = StringSplit.lines(text, letters);

    int lineCount = marginLines;

    for (String line : lines) {
      content.beginText();
      content.setFont(font, fontSize);
      content.newLineAtOffset(
          center.x - Geometry.getStringWidth(line, font, fontSize) / 2,
          page.getMediaBox().getHeight() - fontSize * lineCount);
      lineCount += 1;
      content.showText(line);
      content.endText();
    }
  }

  private void addImage() throws IOException {
    LocationPayload code =
        new LocationPayload(
            location.getExercise().getExerciseId(), executionId, location.getCoordinates());

    ObjectMapper mapper = new ObjectMapper();
    String value = mapper.writeValueAsString(code);

    QrGenerator.makeQr(value, QR_SCALE, 0).ifPresent(this::drawImage);
  }

  @SuppressWarnings("squid:S109")
  private void drawImage(byte[] qrcode) {
    try {
      PDImageXObject image = PDImageXObject.createFromByteArray(document, qrcode, null);
      content.drawImage(
          image,
          center.x - image.getWidth() / 2,
          center.y - image.getHeight() / 2,
          image.getWidth(),
          image.getHeight());
    } catch (IOException e) {
      LoggerFactory.getLogger(this.getClass()).warn(String.valueOf(e));
    }
  }

  @Override
  public void close() throws IOException {
    if (this.content != null) {
      this.content.close();
    }
  }

  private static final class LocationPayload {
    public final long exerciseId;
    public final long executionId;
    public final Coordinates coordinates;

    private LocationPayload(long exerciseId, long executionId, Coordinates coordinates) {
      this.exerciseId = exerciseId;
      this.executionId = executionId;
      this.coordinates = coordinates;
    }
  }
}
