package ch.japt.epj.library.pdf;

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
import org.apache.pdfbox.util.Matrix;

public final class ExercisePage {
  private ExercisePage() {}

  public static void addPage(Exercise exercise, PDDocument document, byte[] qrcode)
      throws IOException {
    PDPage page = new PDPage(PDRectangle.A4);
    document.addPage(page);

    try (PDPageContentStream content =
        new PDPageContentStream(document, page, AppendMode.APPEND, false, true)) {
      content.beginText();
      content.setFont(PDType1Font.HELVETICA_BOLD, 36);
      Point2D.Float center = Geometry.getCenter(page);
      Matrix matrix =
          Matrix.getTranslateInstance(
              center.x
                  - Geometry.getStringWidth(exercise.getName(), PDType1Font.HELVETICA_BOLD, 36) / 2,
              page.getMediaBox().getHeight() - 36 - 20);
      content.setTextMatrix(matrix);
      content.showText(exercise.getName());
      content.endText();

      float em = Geometry.getStringWidth("M", PDType1Font.HELVETICA, 20) * 0.75F;
      float letters = page.getMediaBox().getWidth() / em;

      Collection<String> lines = StringSplit.lines(exercise.getQuestion(), Math.round(letters));

      int lineCount = 2;

      for (String line : lines) {
        content.beginText();
        content.setFont(PDType1Font.HELVETICA, 20);
        content.newLineAtOffset(0, page.getMediaBox().getHeight() - 20 * lineCount);
        lineCount += 1;
        content.showText(line);
        content.endText();
      }

      //      PDImageXObject image = PDImageXObject.createFromByteArray(document, qrcode, null);
      //      content.drawImage(
      //          image,
      //          center.x - image.getWidth() / 2,
      //          center.y - image.getHeight() / 2,
      //          image.getWidth(),
      //          image.getHeight());
    }
  }
}
