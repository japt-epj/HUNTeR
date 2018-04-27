package ch.japt.epj.model;
import ch.japt.epj.model.data.Quiz;
import ch.japt.epj.model.dto.ExecutionDto;
import ch.japt.epj.model.dto.NewExecutionDto;
import ch.japt.epj.model.dto.NewQuizDto;
import ch.japt.epj.repository.ExecutionRepository;
import ch.japt.epj.repository.PersonRepository;
import ch.japt.epj.repository.QuizRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import ch.japt.epj.model.data.Execution;
import org.springframework.format.datetime.joda.DateTimeParser;
import org.springframework.stereotype.Component;
import java.lang.reflect.Type;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Component
public class ExecutionModel {
    private final ExecutionRepository executions;
    private final PersonRepository users;
    private final QuizRepository quizzes;
    private final ModelMapper mapper = new ModelMapper();

    public ExecutionModel(
            @Autowired ExecutionRepository executions,
            @Autowired QuizRepository quizzes,
            @Autowired PersonRepository users

    ) {
        this.executions = executions;
        this.users = users;
        this.quizzes = quizzes;
    }

    public List<ExecutionDto> allExecutions() {
        Type type = new TypeToken<List<ExecutionDto>>() {}.getType();
        Iterable<Execution> all = executions.findAll();
        return mapper.map(all, type);
    }

    public ExecutionDto getExecution(Long id) {
        Execution execution = executions.findOne(id);
        return mapper.map(execution, ExecutionDto.class);
    }

    public void addExecution(NewExecutionDto executionDto) {
        Execution execution = mapper.map(executionDto, Execution.class);
        executionDto.getParticipants().forEach(personId ->
                execution.addParticipant(users.findByPersonId(personId).get())
        );
        execution.setStartDate(LocalDateTime.ofInstant(Instant.parse(executionDto.getStartDate()), ZoneId.of(ZoneOffset.UTC.getId())));
        execution.setEndDate(LocalDateTime.ofInstant(Instant.parse(executionDto.getEndDate()), ZoneId.of(ZoneOffset.UTC.getId())));
        execution.setName(executionDto.getName());
        Quiz quiz = quizzes.findOne(executionDto.getQuizId());
        users.save(execution.getParticipants());
        quiz.addExecution(execution);
        executions.save(quiz.getExecutions());
        quizzes.save(quiz);
    }

}
