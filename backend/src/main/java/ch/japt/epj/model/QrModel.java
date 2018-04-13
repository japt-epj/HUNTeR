package ch.japt.epj.model;

import ch.japt.epj.model.data.Task;
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
    private final ExerciseRepository exercises;

    public QrModel(@Autowired ExerciseRepository exercises) {
        this.exercises = exercises;
    }

    public Optional<byte[]> generateCode(Integer id) {
        Optional<Task> task = exercises.findByTaskId(id.longValue());

        if (task.isPresent()) {
            try {
                QrCode code = QrCode.encodeText(String.valueOf(id), QrCode.Ecc.MEDIUM);
                BufferedImage image = code.toImage(20, 2);
                ByteArrayOutputStream stream = new ByteArrayOutputStream();
                ImageIO.write(image, "png", stream);
                return Optional.of(stream.toByteArray());
            } catch (IOException e) {
                // TODO: Log qr creation somewhere
                return Optional.empty();
            }
        }

        return Optional.empty();
    }
}
