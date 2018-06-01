package ch.japt.epj.model.mapping;

import ch.japt.epj.model.data.Answer;
import ch.japt.epj.model.data.Execution;
import ch.japt.epj.model.data.Exercise;
import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.data.Quiz;
import ch.japt.epj.model.dto.ExerciseDto;
import ch.japt.epj.model.dto.NewAnswerDto;
import ch.japt.epj.model.dto.NewExecutionDto;
import ch.japt.epj.model.dto.NewExerciseDto;
import ch.japt.epj.model.dto.PersonDto;
import ch.japt.epj.model.dto.QuizDto;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;

public final class Mappings {
  private Mappings() {}

  public static ModelMapper exerciseMapper() {
    ModelMapper mapper = new ModelMapper();

    Converter<List<NewAnswerDto>, Collection<Answer>> answerDtoToAnswer =
        ctx ->
            ctx.getSource()
                .stream()
                .map(dto -> mapper.map(dto, Answer.class))
                .collect(Collectors.toList());

    mapper
        .createTypeMap(Exercise.class, ExerciseDto.class)
        .addMapping(Exercise::getName, ExerciseDto::setName)
        .addMapping(Exercise::getAnswerTemplates, ExerciseDto::setAnswers)
        .addMapping(Exercise::getAnswerIds, ExerciseDto::setAnswerIds);
    mapper
        .createTypeMap(NewAnswerDto.class, Answer.class)
        .addMapping(NewAnswerDto::getText, Answer::setText);
    mapper
        .createTypeMap(NewExerciseDto.class, Exercise.class)
        .addMapping(NewExerciseDto::getName, Exercise::setName)
        .addMappings(
            m -> m.using(answerDtoToAnswer).map(NewExerciseDto::getAnswers, Exercise::setAnswers));
    mapper
        .createTypeMap(Exercise.class, NewExerciseDto.class)
        .addMapping(Exercise::getName, NewExerciseDto::setName)
        .addMapping(Exercise::getQuestion, NewExerciseDto::setQuestion)
        .addMapping(Exercise::getAnswerTemplates, NewExerciseDto::setAnswers);
    mapper
        .createTypeMap(Answer.class, NewAnswerDto.class)
        .addMapping(Answer::getText, NewAnswerDto::setText)
        .addMapping(Answer::getAnswerId, NewAnswerDto::setAnswerId);

    return mapper;
  }

  public static ModelMapper personMapper() {
    ModelMapper mapper = new ModelMapper();
    mapper
        .createTypeMap(Person.class, PersonDto.class)
        .addMapping(Person::getSchools, PersonDto::addSchoolsItem)
        .addMappings(m -> m.skip(PersonDto::setPassword));
    return mapper;
  }

  public static ModelMapper quizMapper() {
    ModelMapper mapper = new ModelMapper();

    Converter<Collection<Exercise>, List<Long>> exerciseToDto =
        context ->
            context.getSource().stream().map(Exercise::getExerciseId).collect(Collectors.toList());

    mapper
        .createTypeMap(Quiz.class, QuizDto.class)
        .addMappings(m -> m.using(exerciseToDto).map(Quiz::getTasks, QuizDto::setExercises));
    return mapper;
  }

  public static ModelMapper executionMapper() {
    ModelMapper mapper = new ModelMapper();
    Converter<String, LocalDateTime> dateTimeConverter =
        context ->
            LocalDateTime.ofInstant(
                Instant.parse(context.getSource()), ZoneId.of(ZoneOffset.UTC.getId()));

    mapper
        .createTypeMap(NewExecutionDto.class, Execution.class)
        .addMappings(
            m ->
                m.using(dateTimeConverter)
                    .map(NewExecutionDto::getStartDate, Execution::setStartDate))
        .addMappings(
            m ->
                m.using(dateTimeConverter).map(NewExecutionDto::getEndDate, Execution::setEndDate));

    return mapper;
  }
}
