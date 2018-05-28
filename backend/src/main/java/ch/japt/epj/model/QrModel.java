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

  private final ExecutionRepository executions;

  public QrModel(@Autowired ExecutionRepository executions) {
    this.executions = executions;
  }

  public Optional<byte[]> generatePdf(Number id) {
    return executions
        .findByExecutionId(id.longValue())
        .flatMap(execution -> Optional.of(new ExecutionDocumentFactory(execution).asArray()));
  }
}
