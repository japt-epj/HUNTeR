package ch.japt.epj.api;

import ch.japt.epj.model.Answer;
import ch.japt.epj.model.Task;
import ch.japt.epj.model.dto.ExerciseDto;
import ch.japt.epj.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

@Controller
@RequestMapping("/api")
public class ExerciseController implements ExerciseApi {
    @Autowired
    private ExerciseRepository repository;

    private ExerciseDto map(Task task) {
        ExerciseDto dto = new ExerciseDto();
        dto.setTitle(task.getName());
        dto.setQuestion(task.getQuestion());
        task.getAnswers().forEach(answer -> dto.addAnswersItem(answer.getAnswer()));
        return dto;
    }

    @Override
    public ResponseEntity<Void> addExercise(ExerciseDto body) {
        return null;
    }

    @Override
    public ResponseEntity<List<ExerciseDto>> exerciseGet() {
        LinkedList<ExerciseDto> exercises = new LinkedList<>();
        repository.findAll().forEach(task -> exercises.add(map(task)));
        return new ResponseEntity<>(exercises, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ExerciseDto> exerciseIdGet(Integer id) {
        ExerciseDto exercise = new ExerciseDto();
        exercise.setId(1337l);
        exercise.setTitle("Bauernfrage");
        exercise.setQuestion("Wenn das Wetter gut ist, wird der Brauer bestimmt den Eber, das Ferkel und...");

        List<String> answers = new LinkedList<>();
        answers.add("...einen draufmachen");
        answers.add("...die Nacht durchzechen");
        answers.add("...die Sau rauslassen");
        answers.add("...auf die Kacke hauen");
        exercise.setAnswers(answers);

        return new ResponseEntity<>(exercise, HttpStatus.OK);
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
