package ch.japt.epj.library.pdf;

import ch.japt.epj.library.QrGenerator;
import ch.japt.epj.model.data.Exercise;
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

public final class ExercisePage implements AutoCloseable {
  private static final PDRectangle PAGE_FORMAT = PDRectangle.A4;

  private static final PDType1Font TITLE_FONT = PDType1Font.HELVETICA_BOLD;
  private static final int TITLE_FONT_SIZE = 36;

  private static final PDType1Font TEXT_FONT = PDType1Font.HELVETICA;
  private static final int TEXT_FONT_SIZE = 20;

  private static final int QR_SCALE = 20;
  private static final int TITLE_MARGIN_LINES = 1;
  private static final int TEXT_MARGIN_LINES = 4;

  private final Exercise exercise;
  private final PDDocument document;
  private final PDPage page;
  private final Float center;
  private final PDPageContentStream content;

  public ExercisePage(PDDocument document, Exercise exercise) throws IOException {
    this.exercise = exercise;
    this.document = document;
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
    writeLines(exercise.getName(), TITLE_MARGIN_LINES, TITLE_FONT, TITLE_FONT_SIZE);
  }

  private void addQuestion() throws IOException {
    writeLines(exercise.getQuestion(), TEXT_MARGIN_LINES, TEXT_FONT, TEXT_FONT_SIZE);
  }

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
    byte[] qrcode = QrGenerator.makeQr(String.valueOf(exercise.getExerciseId()), QR_SCALE, 0).get();
    PDImageXObject image = PDImageXObject.createFromByteArray(document, qrcode, null);
    content.drawImage(
        image,
        center.x - image.getWidth() / 2,
        center.y - image.getHeight() / 2,
        image.getWidth(),
        image.getHeight());
  }

  @Override
  public void close() throws IOException {
    if (this.content != null) {
      this.content.close();
    }
  }
}
