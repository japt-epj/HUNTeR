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
    List<ExecutionScore> aggregation = executions.getAggregatedScore(executionId, personId);

    Map<String, ExecutionScore> map =
        aggregation.stream().collect(Collectors.toMap(ExecutionScore::getParticipantName, p -> p));

    ScoreDto result = mapper.map(map, ScoreDto.class);
    return result;
  }
}
