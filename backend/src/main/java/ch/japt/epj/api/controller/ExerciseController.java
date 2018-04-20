package ch.japt.epj.api.controller;
import ch.japt.epj.api.PaginatedExercise;
import ch.japt.epj.model.ExerciseModel;
import ch.japt.epj.model.dto.ExerciseDto;
import ch.japt.epj.model.dto.NewExerciseDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Api(tags = "Exercise API")
@RequestMapping("/api")
public class ExerciseController implements ch.japt.epj.api.ExerciseApi, PaginatedExercise {
    private final ExerciseModel exerciseModel;

    public ExerciseController(@Autowired ExerciseModel exerciseModel){
        this.exerciseModel = exerciseModel;
    }

    @Override
    public ResponseEntity<Void> addExercise(@Validated @RequestBody NewExerciseDto body) {
        exerciseModel.addExercise(body);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ExerciseDto> exerciseIdGet(@PathVariable("id") Integer id) {
        return exerciseModel.getExercise(id.longValue())
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

    @Override
    public ResponseEntity<Page<ExerciseDto>> exerciseGet(Integer page, Integer limit) {
        return new ResponseEntity<>(exerciseModel.pageExercise(page, limit), HttpStatus.OK);
    }
}
