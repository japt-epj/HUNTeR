package ch.japt.epj.model.mapping;

import ch.japt.epj.model.data.Answer;
import ch.japt.epj.model.data.Execution;
import ch.japt.epj.model.data.Exercise;
import ch.japt.epj.model.data.Quiz;
import ch.japt.epj.model.dto.ExecutionDto;
import ch.japt.epj.model.dto.ExerciseDto;
import ch.japt.epj.model.dto.NewAnswerDto;
import ch.japt.epj.model.dto.NewExecutionDto;
import ch.japt.epj.model.dto.NewExerciseDto;
import ch.japt.epj.model.dto.NewQuizDto;
import java.lang.reflect.Type;
import java.util.Collection;
import java.util.List;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;

public class Mappings {
  private Mappings() {}

  public static ModelMapper exerciseMapper() {
    ModelMapper mapper = new ModelMapper();

    mapper
        .createTypeMap(Exercise.class, ExerciseDto.class)
        .addMapping(Exercise::getName, ExerciseDto::setName)
        .addMapping(Exercise::getAnswerTemplates, ExerciseDto::setAnswers);
    mapper
        .createTypeMap(NewAnswerDto.class, Answer.class)
        .addMapping(NewAnswerDto::getText, Answer::setAnswer);
    mapper
        .createTypeMap(NewExerciseDto.class, Exercise.class)
        .addMapping(NewExerciseDto::getName, Exercise::setName);

    return mapper;
  }

  public static ModelMapper quizMapper() {
    ModelMapper mapper = new ModelMapper();

    Type executionDtos = new TypeToken<List<NewExecutionDto>>() {}.getType();

    Converter<Collection<Execution>, List<ExecutionDto>> converter =
        context -> mapper.map(context.getSource(), executionDtos);

    mapper
        .createTypeMap(Quiz.class, NewQuizDto.class)
        .addMappings(m -> m.using(converter).map(Quiz::getExecutions, NewQuizDto::setExecutions));

    mapper
        .createTypeMap(Execution.class, NewExecutionDto.class)
        .addMappings(m -> m.skip(NewExecutionDto::setParticipants));

    return mapper;
  }
}
