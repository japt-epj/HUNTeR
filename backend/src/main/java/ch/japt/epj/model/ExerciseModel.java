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
import java.util.Collection;
import java.util.List;
import java.util.Optional;
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

  public List<NewExerciseDto> getExercises(List<Integer> ids) {
    Collection<Long> longs = ListConverter.toLong(ids);
    return mapper.map(this.exercises.findAll(longs), dtoList);
  }

  public Optional<ExerciseDto> getExercise(Long id) {
    return exercises.findByExerciseId(id).map(t -> mapper.map(t, ExerciseDto.class));
  }

  public List<NewExerciseDto> getExercisesForTeacher(List<Integer> ids) {
    Collection<Long> longs = ListConverter.toLong(ids);
    return mapper.map(exercises.findAll(longs), dtoList);
  }

  public void addExercise(NewExerciseDto exerciseDto) {
    Exercise exercise = mapper.map(exerciseDto, Exercise.class);
    // this should be possible to put in a typemapping. I'm pretty sure others
    // are too, but this doesn't make any new db calls
    exerciseDto
        .getAnswers()
        .forEach(
            newAnswerDto -> {
              Answer answer = mapper.map(newAnswerDto, Answer.class);
              // probably just reomve this and do a deep mapping
              exercise.addAnswerTemplate(answer);
            });
    answers.save(exercise.getAnswerTemplates());
    exercises.save(exercise);
  }
}
