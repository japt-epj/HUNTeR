package ch.japt.epj.model;

import ch.japt.epj.model.dto.ScoreDto;
import ch.japt.epj.repository.ExecutionRepository;
import ch.japt.epj.repository.data.ExecutionScore;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ScoreModel {

  private final ExecutionRepository executions;
  private final ModelMapper mapper = new ModelMapper();

  public ScoreModel(@Autowired ExecutionRepository executions) {
    this.executions = executions;
  }

  public ScoreDto getScore(Long executionId, Long personId) {
    Double questions =
        executions
            .findByExecutionId(executionId)
            .map(e -> (double) e.getQuiz().getTasks().size())
            .orElse(1D);

    Map<String, ExecutionScore> scores = makeMap(executions.allScores(executionId, personId));
    Map<String, ExecutionScore> aggregated =
        makeMap(executions.aggregateScores(executionId, personId, questions));

    scores.putAll(aggregated);
    return mapper.map(scores, ScoreDto.class);
  }

  private static Map<String, ExecutionScore> makeMap(List<ExecutionScore> scores) {
    return scores.stream().collect(Collectors.toMap(ExecutionScore::getId, p -> p));
  }
}
