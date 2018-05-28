package ch.japt.epj.model;

import ch.japt.epj.model.dto.ScoreDto;
import ch.japt.epj.repository.ExecutionRepository;
import ch.japt.epj.repository.data.ExecutionScore;
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
    Map<String, ExecutionScore> scores =
        executions
            .allScores(executionId, personId)
            .stream()
            .collect(Collectors.toMap(ExecutionScore::getId, p -> p));
    Map<String, ExecutionScore> aggregated =
        executions
            .aggregateScores(executionId, personId)
            .stream()
            .collect(Collectors.toMap(ExecutionScore::getId, p -> p));

    scores.putAll(aggregated);

    ScoreDto map = mapper.map(scores, ScoreDto.class);
    return map;
  }
}
