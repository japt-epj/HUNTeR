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

  public List<ExerciseDto> getExercises(List<Integer> ids) {
    List<Long> longs = ListConverter.toLong(ids);
    Type dtoList = new TypeToken<List<ExerciseDto>>() {}.getType();
    return mapper.map(exercises.findAll(longs), dtoList);
  }

  public Optional<ExerciseDto> getExercise(Long id) {
    return exercises.findByExerciseId(id).map(t -> mapper.map(t, ExerciseDto.class));
  }

  public void addExercise(NewExerciseDto exerciseDto) {
    Exercise exercise = mapper.map(exerciseDto, Exercise.class);
    exerciseDto
        .getAnswers()
        .forEach(
            newAnswerDto -> {
              Answer answer = mapper.map(newAnswerDto, Answer.class);
              exercise.addAnswerTemplate(answer);
            });
    answers.save(exercise.getAnswerTemplates());
    exercises.save(exercise);
  }
}
