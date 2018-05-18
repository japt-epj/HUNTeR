package ch.japt.epj.library.pdf;

import ch.japt.epj.model.data.Exercise;
import java.awt.geom.Point2D.Float;
import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.PDPageContentStream.AppendMode;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.util.Matrix;

public final class ExercisePage {
  private ExercisePage() {}

  public static void addPage(Exercise exercise, PDDocument document, byte[] qrcode)
      throws IOException {
    PDPage page = new PDPage();
    document.addPage(page);

    try (PDPageContentStream content =
        new PDPageContentStream(document, page, AppendMode.APPEND, false, true)) {
      content.beginText();
      content.setFont(PDType1Font.HELVETICA_BOLD, 26);
      Float center = Geometry.getCenter(page);
      Matrix matrix =
          Matrix.getTranslateInstance(
              center.x
                  - Geometry.getStringWidth(exercise.getName(), PDType1Font.HELVETICA_BOLD, 26) / 2,
              page.getMediaBox().getHeight() - 26 - 10);
      content.setTextMatrix(matrix);
      content.showText(exercise.getName());
      content.endText();

      PDImageXObject image = PDImageXObject.createFromByteArray(document, qrcode, null);
      content.drawImage(
          image,
          center.x - image.getWidth() / 2,
          center.y - image.getHeight() / 2,
          image.getWidth(),
          image.getHeight());
    }
  }
}
