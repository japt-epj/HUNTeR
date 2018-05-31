package ch.japt.epj.model;

import ch.japt.epj.model.data.Execution;
import ch.japt.epj.model.dto.ExecutionDto;
import ch.japt.epj.model.dto.NewExecutionDto;
import ch.japt.epj.model.mapping.Mappings;
import ch.japt.epj.repository.ExecutionRepository;
import ch.japt.epj.repository.PersonRepository;
import ch.japt.epj.repository.QuizRepository;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class ExecutionModel {

  private final ExecutionRepository executions;
  private final PersonRepository persons;
  private final QuizRepository quizzes;
  private final ModelMapper mapper = Mappings.executionMapper();

  public ExecutionModel(
      @Autowired ExecutionRepository executions,
      @Autowired QuizRepository quizzes,
      @Autowired PersonRepository persons) {
    this.executions = executions;
    this.persons = persons;
    this.quizzes = quizzes;
  }

  public Page<ExecutionDto> pageExecution(int page, int limit, Sort sort) {
    return executions
        .findAll(new PageRequest(page, limit, sort))
        .map(execution -> mapper.map(execution, ExecutionDto.class));
  }

  public Optional<ExecutionDto> getExecution(Long id) {
    return executions.findByExecutionId(id).map(e -> mapper.map(e, ExecutionDto.class));
  }

  public void addExecution(NewExecutionDto executionDto) {
    Execution execution = mapper.map(executionDto, Execution.class);
    persons.findAll(executionDto.getParticipants()).forEach(execution::addParticipant);
    quizzes.findQuizByQuizId(executionDto.getQuizId()).ifPresent(execution::setQuiz);
    executions.save(execution);
  }
}
