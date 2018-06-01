package ch.japt.epj.library.pdf;

import java.awt.geom.Point2D;
import java.awt.geom.Point2D.Float;
import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;

public final class Geometry {
  private static final float EM_APPROXIMATION_FACTOR = 1.5F;
  private static final int PDFONT_FACTOR = 1000;

  private Geometry() {}

  /**
   * Returns the center of the page. <em>Only works for portrait oriented pages.</em>
   *
   * <p>Ignored sonar warning is for magic numbers, but dividing by two should be obvious.
   *
   * @param page Portrait oriented page to find center for
   * @return Point in the Center of the page
   */
  @SuppressWarnings("squid:S109")
  public static Point2D.Float getCenter(PDPage page) {
    PDRectangle box = page.getMediaBox();
    return new Float(box.getWidth() / 2F, box.getHeight() / 2F);
  }

  public static float getStringWidth(String text, PDFont font, int size) throws IOException {
    return font.getStringWidth(text) * size / PDFONT_FACTOR;
  }

  public static int lettersPerLine(PDPage page, PDFont font, int fontSize) throws IOException {
    float em = getStringWidth("M", font, fontSize) / EM_APPROXIMATION_FACTOR;
    float letters = page.getMediaBox().getWidth() / em;
    return Math.round(letters);
  }
}
