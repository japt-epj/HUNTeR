package ch.japt.epj.api;

import ch.japt.epj.model.TaskModel;
import ch.japt.epj.model.dto.ExerciseDto;
import ch.japt.epj.model.dto.NewExerciseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api")
public class ExerciseController implements ch.japt.epj.api.ExerciseApi {
    private final TaskModel taskModel;

    public ExerciseController(@Autowired TaskModel taskModel){
        this.taskModel = taskModel;
    }

    @Override
    public ResponseEntity<Void> addExercise(@RequestBody NewExerciseDto body) {
        taskModel.addExercise(body);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<ExerciseDto>> exerciseGet() {
        return new ResponseEntity<>(taskModel.allExercises(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ExerciseDto> exerciseIdGet(@PathVariable("id") Integer id) {
        return taskModel.getExercise(id.longValue())
                .map(t -> new ResponseEntity<>(t, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
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
