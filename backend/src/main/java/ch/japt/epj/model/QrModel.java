package ch.japt.epj.model;

import ch.japt.epj.library.QrGenerator;
import ch.japt.epj.library.pdf.ExecutionDocumentFactory;
import ch.japt.epj.repository.ExecutionRepository;
import ch.japt.epj.repository.ExerciseRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QrModel {

  private final ExerciseRepository exercises;
  private final ExecutionRepository executions;

  public QrModel(
      @Autowired ExerciseRepository exercises, @Autowired ExecutionRepository executions) {
    this.exercises = exercises;
    this.executions = executions;
  }

  public Optional<byte[]> generateCode(Integer id, Integer scale, Integer border) {
    return exercises
        .findByExerciseId(id.longValue())
        .flatMap(t -> QrGenerator.makeQr(String.valueOf(t.getExerciseId()), scale, border));
  }

  public Optional<byte[]> generatePdf(Long id) {
    return executions
        .findByExecutionId(id)
        .flatMap(execution -> Optional.of(new ExecutionDocumentFactory(execution).asArray()));
  }
}
