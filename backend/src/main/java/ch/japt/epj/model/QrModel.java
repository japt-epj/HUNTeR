package ch.japt.epj.model;

import ch.japt.epj.library.QrGenerator;
import ch.japt.epj.library.pdf.ExerciseDocumentFactory;
import ch.japt.epj.repository.ExerciseRepository;
import ch.japt.epj.repository.QuizRepository;
import java.util.Optional;
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
    return quizzes
        .findQuizByQuizId(id)
        .flatMap(q -> Optional.of(new ExerciseDocumentFactory(q).asArray()));
  }
}
