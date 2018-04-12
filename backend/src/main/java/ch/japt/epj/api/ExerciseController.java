package ch.japt.epj.api;

import ch.japt.epj.model.data.Answer;
import ch.japt.epj.model.data.Task;
import ch.japt.epj.model.dto.ExerciseDto;
import ch.japt.epj.model.dto.NewExerciseDto;
import ch.japt.epj.repository.AnswerRepository;
import ch.japt.epj.repository.ExerciseRepository;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

@Controller
@RequestMapping("/api")
public class ExerciseController implements ch.japt.epj.api.ExerciseApi {
    @Autowired
    private ExerciseRepository repository;

    @Autowired
    private AnswerRepository answerRepository;

    private ExerciseDto map(Task task) {
        ModelMapper mapper = new ModelMapper();
        TypeMap<Task, ExerciseDto> map = mapper.createTypeMap(Task.class, ExerciseDto.class);
        map.addMapping(Task::getName, ExerciseDto::setTitle);
        Converter<Collection<Answer>, List<String>> toString = answers -> {
            LinkedList<String> strings = new LinkedList<>();
            answers.getSource().forEach(a -> strings.add(a.getAnswer()));
            return strings;
        };
        ExerciseDto dto = mapper.map(task, ExerciseDto.class);

        return dto;
    }

    @Override
    public ResponseEntity<Void> addExercise(@RequestBody NewExerciseDto body) {
        Task task = new Task();
        task.setName(body.getTitle());
        task.setQuestion(body.getQuestion());

        body.getAnswers().forEach(newAnswer -> {
            Answer answer = new Answer();
            answer.setAnswer(newAnswer.getText());
            answer.setChecked(newAnswer.isChecked());
            task.addAnswerTemplate(answer);
            answerRepository.save(answer);
        });

        repository.save(task);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<ExerciseDto>> exerciseGet() {
        LinkedList<ExerciseDto> exercises = new LinkedList<>();
        repository.findAll().forEach(task -> exercises.add(map(task)));
        return new ResponseEntity<>(exercises, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ExerciseDto> exerciseIdGet(@PathVariable("id") Integer id) {
        Task task = repository.findOne(id.longValue());
        return new ResponseEntity<>(map(task), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> updateExercise(ExerciseDto body) {
        return null;
    }

    @Override
    public ResponseEntity<Void> updateExerciseWithForm(Long id) {
        return null;
    }
}
