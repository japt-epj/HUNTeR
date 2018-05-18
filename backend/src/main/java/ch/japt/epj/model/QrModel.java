package ch.japt.epj.model;

import ch.japt.epj.library.pdf.Geometry;
import ch.japt.epj.model.data.Quiz;
import ch.japt.epj.repository.ExerciseRepository;
import ch.japt.epj.repository.QuizRepository;
import io.nayuki.qrcodegen.QrCode;
import java.awt.geom.Point2D.Float;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import javax.imageio.ImageIO;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.util.Matrix;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QrModel {
  private static final String OUTPUT_TYPE = "png";

  private final Logger log = LoggerFactory.getLogger(this.getClass());
  private final ExerciseRepository exercises;
  private final QuizRepository quizzes;

  public QrModel(@Autowired ExerciseRepository exercises, @Autowired QuizRepository quizzes) {
    this.exercises = exercises;
    this.quizzes = quizzes;
  }

  public Optional<byte[]> generateCode(Integer id, Integer scale, Integer border) {
    return exercises
        .findByExerciseId(id.longValue())
        .flatMap(t -> makeQr(t.getExerciseId(), scale, border));
  }

  public Optional<byte[]> generatePdf(Long id) {
    Quiz quiz = quizzes.findQuizByQuizId(id).get();

    try (PDDocument document = new PDDocument()) {
      PDPage page = new PDPage();
      document.addPage(page);

      try (PDPageContentStream content = new PDPageContentStream(document, page)) {
        content.beginText();
        content.setFont(PDType1Font.HELVETICA_BOLD, 26);
        Float center = Geometry.getCenter(page);
        content.setTextMatrix(
            Matrix.getTranslateInstance(
                center.x
                    - Geometry.getStringWidth(quiz.getName(), PDType1Font.HELVETICA_BOLD, 26) / 2,
                page.getMediaBox().getHeight() - 26 - 10));
        content.showText(quiz.getName());
        content.endText();

        byte[] bytes = makeQr(quiz.getQuizId(), 20, 0).get();
        PDImageXObject image = PDImageXObject.createFromByteArray(document, bytes, null);
        content.drawImage(
            image,
            center.x - image.getWidth() / 2,
            center.y - image.getHeight() / 2,
            image.getWidth(),
            image.getHeight());
      }

      ByteArrayOutputStream stream = new ByteArrayOutputStream();
      document.save(stream);
      return Optional.of(stream.toByteArray());
    } catch (IOException e) {
      e.printStackTrace();
    }

    return Optional.empty();
  }

  private Optional<byte[]> makeQr(Long id, Integer scale, Integer border) {
    try {
      QrCode code = QrCode.encodeText(String.valueOf(id), QrCode.Ecc.MEDIUM);
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
