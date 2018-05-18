package ch.japt.epj.library.pdf;

import java.awt.geom.Point2D;
import java.awt.geom.Point2D.Float;
import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;

public final class Geometry {
  private Geometry() {}

  /**
   * Returns the center of the page. Only works for portrait oriented pages.
   *
   * @param page Portrait oriented page to find center for
   * @return Point in the Center of the page
   */
  public static Point2D.Float getCenter(PDPage page) {
    PDRectangle box = page.getMediaBox();
    return new Float(box.getWidth() / 2F, box.getHeight() / 2F);
  }

  public static float getStringWidth(String text, PDFont font, int size) throws IOException {
    return font.getStringWidth(text) * size / 1000;
  }
}
