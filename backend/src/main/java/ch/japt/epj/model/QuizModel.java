package ch.japt.epj.model;

import ch.japt.epj.library.ListConverter;
import ch.japt.epj.model.data.Location;
import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.data.Quiz;
import ch.japt.epj.model.dto.ExerciseLocationDto;
import ch.japt.epj.model.dto.NewQuizDto;
import ch.japt.epj.model.mapping.Mappings;
import ch.japt.epj.repository.ExerciseRepository;
import ch.japt.epj.repository.LocationRepository;
import ch.japt.epj.repository.PersonRepository;
import ch.japt.epj.repository.QuizRepository;
import java.lang.reflect.Type;
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
public class QuizModel {
  private static final Type QUIZ_DTO_LIST = new TypeToken<List<NewQuizDto>>() {}.getType();

  private final QuizRepository quizzes;
  private final ExerciseRepository exercises;
  private final PersonRepository persons;
  private final LocationRepository locations;
  private final ModelMapper mapper = Mappings.quizMapper();

  public QuizModel(
      @Autowired QuizRepository quizzes,
      @Autowired ExerciseRepository exercises,
      @Autowired PersonRepository persons,
      @Autowired LocationRepository locations) {
    this.quizzes = quizzes;
    this.exercises = exercises;
    this.persons = persons;
    this.locations = locations;
  }

  public Page<NewQuizDto> pageQuiz(int page, int limit, Sort sort) {
    return quizzes
        .findAll(new PageRequest(page, limit, sort))
        .map(quiz -> mapper.map(quiz, NewQuizDto.class));
  }

  public NewQuizDto getQuiz(long id) {
    Quiz quiz = quizzes.findOne(id);
    return mapper.map(quiz, NewQuizDto.class);
  }

  public void addQuiz(NewQuizDto quizDto) {
    Quiz quiz = mapper.map(quizDto, Quiz.class);
    quiz.setName(quizDto.getName());
    for (ExerciseLocationDto entry : quizDto.getExercises()) {
      Location location = new Location();
      exercises
          .findByExerciseId(entry.getExerciseId())
          .ifPresent(
              exercise -> {
                location.setCoordinates(entry.getLat(), entry.getLng());
                location.setExercise(exercise);
                locations.save(location);
                quiz.addLocation(location);
                quiz.addTask(exercise);
              });
    }
    quizzes.save(quiz);
    Person creator = persons.findOne(quizDto.getCreator());
    creator.addQuiz(quiz);
    persons.save(creator);
  }

  public List<NewQuizDto> getQuizzes(List<Integer> ids) {
    Collection<Long> longs = ListConverter.toLong(ids);
    return mapper.map(quizzes.findAll(longs), QUIZ_DTO_LIST);
  }
}
