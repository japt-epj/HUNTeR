package ch.japt.epj.model;

import ch.japt.epj.library.ListConverter;
import ch.japt.epj.model.data.Answer;
import ch.japt.epj.model.data.Exercise;
import ch.japt.epj.model.dto.ExerciseDto;
import ch.japt.epj.model.dto.NewExerciseDto;
import ch.japt.epj.model.mapping.Mappings;
import ch.japt.epj.repository.AnswerRepository;
import ch.japt.epj.repository.ExerciseRepository;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class ExerciseModel {
  private final ExerciseRepository exercises;
  private final AnswerRepository answers;
  private final ModelMapper mapper = Mappings.exerciseMapper();
  private final Type dtoList = new TypeToken<List<NewExerciseDto>>() {}.getType();

  public ExerciseModel(
      @Autowired ExerciseRepository exercises, @Autowired AnswerRepository answers) {
    this.exercises = exercises;
    this.answers = answers;
  }

  public Page<ExerciseDto> pageExercise(int page, int limit, Sort sort) {
    return exercises
        .findAll(new PageRequest(page, limit, sort))
        .map(exercise -> mapper.map(exercise, ExerciseDto.class));
  }

  /**
   * Meant to only be used for serving exercises to participants. This function makes sure that no
   * answers are ever sent to a client participating in a quiz, to keep them from cheating by using
   * a debugger.
   *
   * @param ids List of exercise ids
   * @return Details of an exercise, with all answers set to false
   */
  public List<NewExerciseDto> getExercises(List<Integer> ids) {
    Collection<Long> longs = ListConverter.toLong(ids);
    List<NewExerciseDto> dtos = mapper.map(this.exercises.findAll(longs), dtoList);
    dtos.forEach(dto -> dto.getAnswers().forEach(s -> s.setChecked(false)));
    return dtos;
  }

  public List<NewExerciseDto> getExercisesForTeacher(List<Integer> ids) {
    Collection<Long> longs = ListConverter.toLong(ids);
    return mapper.map(exercises.findAll(longs), dtoList);
  }

  public void addExercise(NewExerciseDto exerciseDto) {
    Exercise exercise = mapper.map(exerciseDto, Exercise.class);
    ArrayList<Answer> answers = new ArrayList<>(exercise.getAnswerTemplates());
    answers.get(exerciseDto.getCorrectAnswer()).setChecked(true);
    this.answers.save(exercise.getAnswerTemplates());
    exercises.save(exercise);
  }
}
