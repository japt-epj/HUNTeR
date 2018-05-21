package ch.japt.epj.model;

import ch.japt.epj.library.QrGenerator;
import ch.japt.epj.library.pdf.ExercisePage;
import ch.japt.epj.model.data.Exercise;
import ch.japt.epj.model.data.Quiz;
import ch.japt.epj.repository.ExerciseRepository;
import ch.japt.epj.repository.QuizRepository;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QrModel {

  private final ExerciseRepository exercises;
  private final QuizRepository quizzes;

  public QrModel(@Autowired ExerciseRepository exercises, @Autowired QuizRepository quizzes) {
    this.exercises = exercises;
    this.quizzes = quizzes;
  }

  public Optional<byte[]> generateCode(Integer id, Integer scale, Integer border) {
    return exercises
        .findByExerciseId(id.longValue())
        .flatMap(t -> QrGenerator.makeQr(String.valueOf(t.getExerciseId()), scale, border));
  }

  public Optional<byte[]> generatePdf(Long id) {
    Quiz quiz = quizzes.findQuizByQuizId(id).get();

    // compact these tries into one. Maybe make ExerciseDocument
    try (PDDocument document = new PDDocument()) {
      for (Exercise exercise : quiz.getTasks()) {
        try (ExercisePage page = new ExercisePage(document, exercise)) {
          page.make();
        } catch (Exception e) {
          // this needs to become a lot nicer
          e.printStackTrace();
        }
      }

      ByteArrayOutputStream stream = new ByteArrayOutputStream();
      document.save(stream);
      return Optional.of(stream.toByteArray());
    } catch (IOException e) {
      // log this
      e.printStackTrace();
      return Optional.empty();
    }
  }
}
