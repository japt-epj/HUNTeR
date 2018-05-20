package ch.japt.epj.library.pdf;

import ch.japt.epj.library.QrGenerator;
import ch.japt.epj.model.data.Exercise;
import java.awt.geom.Point2D;
import java.io.IOException;
import java.util.Collection;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.PDPageContentStream.AppendMode;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.util.Matrix;

public final class ExercisePage {
  private ExercisePage() {}

  private static void addTitle(String title, PDPageContentStream content, PDPage page)
      throws IOException {
    Point2D.Float center = Geometry.getCenter(page);
    content.beginText();
    content.setFont(PDType1Font.HELVETICA_BOLD, 36);
    Matrix matrix =
        Matrix.getTranslateInstance(
            center.x - Geometry.getStringWidth(title, PDType1Font.HELVETICA_BOLD, 36) / 2,
            page.getMediaBox().getHeight() - 36 - 20);
    content.setTextMatrix(matrix);
    content.showText(title);
    content.endText();
  }

  private static void addQuestion(String question, PDPageContentStream content, PDPage page)
      throws IOException {
    Point2D.Float center = Geometry.getCenter(page);
    float em = Geometry.getStringWidth("M", PDType1Font.HELVETICA, 20);
    float letters = page.getMediaBox().getWidth() / em * 1.5F;

    Collection<String> lines = StringSplit.lines(question, Math.round(letters));

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

  private static void addImage(
      Exercise exercise, PDDocument document, PDPageContentStream content, PDPage page)
      throws IOException {
    Point2D.Float center = Geometry.getCenter(page);
    byte[] qrcode = QrGenerator.makeQr(String.valueOf(exercise.getExerciseId()), 20, 0).get();
    PDImageXObject image = PDImageXObject.createFromByteArray(document, qrcode, null);
    content.drawImage(
        image,
        center.x - image.getWidth() / 2,
        center.y - image.getHeight() / 2,
        image.getWidth(),
        image.getHeight());
  }

  public static void addPage(Exercise exercise, PDDocument document) throws IOException {
    PDPage page = new PDPage(PDRectangle.A4);
    document.addPage(page);

    try (PDPageContentStream content =
        new PDPageContentStream(document, page, AppendMode.APPEND, false, true)) {
      addTitle(exercise.getName(), content, page);
      addQuestion(exercise.getQuestion(), content, page);
      addImage(exercise, document, content, page);
    }
  }
}
