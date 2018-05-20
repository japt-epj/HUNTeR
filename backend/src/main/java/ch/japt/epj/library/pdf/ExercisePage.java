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

  private final Exercise exercise;
  private final PDDocument document;
  private final PDPage page;
  private final Float center;
  private final PDPageContentStream content;

  public ExercisePage(PDDocument document, Exercise exercise) throws IOException {
    this.exercise = exercise;
    this.document = document;
    this.page = new PDPage((PDRectangle.A4));
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
    content.setFont(PDType1Font.HELVETICA_BOLD, 36);
    content.newLineAtOffset(
        center.x - Geometry.getStringWidth(exercise.getName(), PDType1Font.HELVETICA_BOLD, 36) / 2,
        page.getMediaBox().getHeight() - 36 - 20);
    content.showText(exercise.getName());
    content.endText();
  }

  private void addQuestion() throws IOException {
    float em = Geometry.getStringWidth("M", PDType1Font.HELVETICA, 20);
    float letters = page.getMediaBox().getWidth() / em * 1.5F;

    Collection<String> lines = StringSplit.lines(exercise.getQuestion(), Math.round(letters));

    // set initial line to start bellow the title
    int lineCount = 5;

    for (String line : lines) {
      content.beginText();
      content.setFont(PDType1Font.HELVETICA, 20);
      content.newLineAtOffset(
          center.x - Geometry.getStringWidth(line, PDType1Font.HELVETICA, 20) / 2,
          page.getMediaBox().getHeight() - 20 * lineCount);
      lineCount += 1;
      content.showText(line);
      content.endText();
    }
  }

  private void addImage() throws IOException {
    byte[] qrcode = QrGenerator.makeQr(String.valueOf(exercise.getExerciseId()), 20, 0).get();
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
