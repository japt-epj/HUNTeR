package ch.japt.epj.library;

import io.nayuki.qrcodegen.QrCode;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import javax.imageio.ImageIO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class QrGenerator {
  private static final String OUTPUT_TYPE = "png";
  private static final Logger log = LoggerFactory.getLogger("QrGenerator");

  private QrGenerator() {}

  // ID will have to be replaced with a bytearray or a string or something
  public static Optional<byte[]> makeQr(String data, Integer scale, Integer border) {
    try {
      QrCode code = QrCode.encodeText(data, QrCode.Ecc.MEDIUM);
      BufferedImage image = code.toImage(scale, border);
      ByteArrayOutputStream stream = new ByteArrayOutputStream();
      ImageIO.write(image, OUTPUT_TYPE, stream);
      return Optional.of(stream.toByteArray());
    } catch (IOException e) {
      log.error("Creating qr code failed", e);
      return Optional.empty();
    }
  }
}
