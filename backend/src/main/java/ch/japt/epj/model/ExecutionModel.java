package ch.japt.epj.model;

import ch.japt.epj.model.data.Execution;
import ch.japt.epj.model.dto.ExecutionDto;
import ch.japt.epj.model.dto.NewExecutionDto;
import ch.japt.epj.model.mapping.Mappings;
import ch.japt.epj.repository.ExecutionRepository;
import ch.japt.epj.repository.PersonRepository;
import ch.japt.epj.repository.QuizRepository;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
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
  private final ModelMapper mapper = Mappings.exerciseMapper();

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

  public ExecutionDto getExecution(Long id) {
    Execution execution = executions.findOne(id);
    return mapper.map(execution, ExecutionDto.class);
  }

  public void addExecution(NewExecutionDto executionDto) {
    Execution execution = mapper.map(executionDto, Execution.class);
    executionDto
        .getParticipants()
        .forEach(personId -> persons.findByPersonId(personId).ifPresent(execution::addParticipant));
    persons.save(execution.getParticipants());
    // TODO: Use modelmapper for this!
    execution.setStartDate(
        LocalDateTime.ofInstant(
            Instant.parse(executionDto.getStartDate()), ZoneId.of(ZoneOffset.UTC.getId())));
    execution.setEndDate(
        LocalDateTime.ofInstant(
            Instant.parse(executionDto.getEndDate()), ZoneId.of(ZoneOffset.UTC.getId())));
    execution.setName(executionDto.getName());
    quizzes.findQuizByQuizId(executionDto.getQuizId()).ifPresent(execution::setQuiz);
    executions.save(execution);
  }
}
