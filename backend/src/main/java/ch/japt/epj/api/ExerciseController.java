package ch.japt.epj.api;

import ch.japt.epj.model.dto.ExerciseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.LinkedList;
import java.util.List;

@Controller
@RequestMapping("/api")
public class ExerciseController implements ExerciseApi {
    @Override
    public ResponseEntity<Void> addExercise(ExerciseDto body) {
        return null;
    }

    @Override
    public ResponseEntity<List<ExerciseDto>> exerciseGet() {
        return null;
    }

    @Override
    public ResponseEntity<ExerciseDto> exerciseIdGet(Integer id) {
        ExerciseDto exercise = new ExerciseDto();
        exercise.setId(1337l);
        exercise.setTitle("This is an Exercise!");
        exercise.setQuestion("The blue or the red pill?");

        List<String> answers = new LinkedList<>();
        answers.add("Yes");
        answers.add("No");
        answers.add("Maybe");
        answers.add("Watman");
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
