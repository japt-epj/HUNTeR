package ch.japt.epj.model;

import ch.japt.epj.repository.ExerciseRepository;
import io.nayuki.qrcodegen.QrCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;

@Component
public class QrModel {
    private static final String OUTPUT_TYPE = "png";

    private final ExerciseRepository exercises;

    public QrModel(@Autowired ExerciseRepository exercises) {
        this.exercises = exercises;
    }

    public Optional<byte[]> generateCode(Integer id, Integer scale, Integer border) {
        return exercises.findByExerciseId(id.longValue())
                .map(t -> makeQr(t.getExerciseId(), scale, border))
                .orElse(Optional.empty());
    }

    private static Optional<byte[]> makeQr(Long id, Integer scale, Integer border) {
        try {
            QrCode code = QrCode.encodeText(String.valueOf(id), QrCode.Ecc.MEDIUM);
            BufferedImage image = code.toImage(scale, border);
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            ImageIO.write(image, OUTPUT_TYPE, stream);
            return Optional.of(stream.toByteArray());
        } catch (IOException e) {
            // TODO: Log qr creation somewhere
            return Optional.empty();
        }
    }
}
