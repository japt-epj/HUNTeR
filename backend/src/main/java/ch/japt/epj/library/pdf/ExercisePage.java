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
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;

public final class ExercisePage implements AutoCloseable {

  // this can probably be extracted to a configuration enum...
  private static final PDRectangle PAGE_FORMAT = PDRectangle.A4;

  private static final PDType1Font TITLE_FONT = PDType1Font.HELVETICA_BOLD;
  private static final int TITLE_FONT_SIZE = 36;

  private static final PDType1Font TEXT_FONT = PDType1Font.HELVETICA;
  private static final int TEXT_FONT_SIZE = 20;

  private static final int QR_SCALE = 20;
  private static final int TITLE_MARGIN = 20;
  private static final int TEXT_MARGIN_LINES = 5;
  private static final float EM_APPROXIMATION_FACTOR = 1.5F;

  private final Exercise exercise;
  private final PDDocument document;
  private final PDPage page;
  private final Float center;
  private final PDPageContentStream content;

  public ExercisePage(PDDocument document, Exercise exercise) throws IOException {
    this.exercise = exercise;
    this.document = document;
    this.page = new PDPage((PAGE_FORMAT));
    this.center = Geometry.getCenter(page);
    this.content = new PDPageContentStream(document, page, AppendMode.APPEND, false, true);

    document.addPage(page);
  }

  public void make() throws IOException {
    PDPage page = new PDPage(PDRectangle.A4);
    document.addPage(page);
    addTitle();
    addQuestion();
    addImage();
  }

  private void addTitle() throws IOException {
    content.beginText();
    content.setFont(TITLE_FONT, TITLE_FONT_SIZE);
    content.newLineAtOffset(
        center.x - Geometry.getStringWidth(exercise.getName(), TITLE_FONT, TITLE_FONT_SIZE) / 2,
        page.getMediaBox().getHeight() - TITLE_FONT_SIZE - TITLE_MARGIN);
    content.showText(exercise.getName());
    content.endText();
  }

  private void addQuestion() throws IOException {
    float em = Geometry.getStringWidth("M", TEXT_FONT, TEXT_FONT_SIZE) / EM_APPROXIMATION_FACTOR;
    float letters = page.getMediaBox().getWidth() / em;

    Collection<String> lines = StringSplit.lines(exercise.getQuestion(), Math.round(letters));

    // set initial line to start bellow the title
    int lineCount = TEXT_MARGIN_LINES;

    for (String line : lines) {
      content.beginText();
      content.setFont(TEXT_FONT, TEXT_FONT_SIZE);
      content.newLineAtOffset(
          center.x - Geometry.getStringWidth(line, TEXT_FONT, TEXT_FONT_SIZE) / 2,
          page.getMediaBox().getHeight() - TEXT_FONT_SIZE * lineCount);
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
  public void close() throws Exception {
    if (this.content != null) {
      this.content.close();
    }
  }
}
