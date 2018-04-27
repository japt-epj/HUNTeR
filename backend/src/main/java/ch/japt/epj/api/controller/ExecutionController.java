package ch.japt.epj.api.controller;
import ch.japt.epj.model.ExecutionModel;
import ch.japt.epj.model.ExerciseModel;
import ch.japt.epj.model.PersonModel;
import ch.japt.epj.model.QuizModel;
import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.data.Quiz;
import ch.japt.epj.model.dto.ExecutionDto;
import ch.japt.epj.model.dto.NewExecutionDto;
import ch.japt.epj.model.dto.NewQuizDto;
import ch.japt.epj.model.dto.PersonDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.Console;
import java.util.Date;
import java.util.List;

@Controller
@Api(tags = "Execution API")
@RequestMapping("/api")
public class ExecutionController implements ch.japt.epj.api.ExecutionApi {
    private final ExecutionModel executionModel;
    private final QuizModel quizModel;
    private final ExerciseModel exerciseModel;
    private final PersonModel personModel;

    public ExecutionController(@Autowired ExecutionModel executionModel,
                               @Autowired QuizModel quizModel,
                               @Autowired ExerciseModel exerciseModel,
                               @Autowired PersonModel personModel) {
        this.executionModel = executionModel;
        this.quizModel = quizModel;
        this.exerciseModel = exerciseModel;
        this.personModel = personModel;
    }

    @Override
    public ResponseEntity<Void> addExecution(NewExecutionDto body) {
        NewQuizDto quiz = quizModel.getQuiz(body.getQuizId());
        NewExecutionDto execution = new NewExecutionDto();

        body.getParticipants().forEach(personId -> {
            execution.addParticipantsItem(personId);
        });
        execution.setStartDate(body.getStartDate());
        execution.setEndDate(body.getEndDate());
        quiz.addExecutionsItem(execution);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<ExecutionDto>> executionGet() {
        return new ResponseEntity<>(executionModel.allExecutions(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ExecutionDto> executionIdGet(Integer id) {
        return new ResponseEntity<>(executionModel.getExecution(id.longValue()), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> updateExecution(NewExecutionDto body) {
        return null;
    }

    @Override
    public ResponseEntity<Void> updateExecutionWithForm(Long id) {
        return null;
    }
}
