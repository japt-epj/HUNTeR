package ch.japt.epj.model.mapping;

import ch.japt.epj.model.data.Answer;
import ch.japt.epj.model.data.Execution;
import ch.japt.epj.model.data.Exercise;
import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.dto.ExerciseDto;
import ch.japt.epj.model.dto.NewAnswerDto;
import ch.japt.epj.model.dto.NewExecutionDto;
import ch.japt.epj.model.dto.NewExerciseDto;
import ch.japt.epj.model.dto.PersonDto;
import org.modelmapper.ModelMapper;

public final class Mappings {
  private Mappings() {}

  public static ModelMapper exerciseMapper() {
    ModelMapper mapper = new ModelMapper();

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
        .addMapping(NewExerciseDto::getName, Exercise::setName);
    mapper
        .createTypeMap(Exercise.class, NewExerciseDto.class)
        .addMapping(Exercise::getName, NewExerciseDto::setName)
        .addMapping(Exercise::getQuestion, NewExerciseDto::setQuestion)
        .addMapping(Exercise::getAnswerTemplates, NewExerciseDto::setAnswers);
    mapper
        .createTypeMap(Answer.class, NewAnswerDto.class)
        .addMapping(Answer::getAnswer, NewAnswerDto::setText)
        .addMapping(Answer::getAnswerId, NewAnswerDto::setAnswerId);

    return mapper;
  }

  public static ModelMapper responseMapper() {
    ModelMapper mapper = new ModelMapper();
    mapper
        .createTypeMap(NewAnswerDto.class, Answer.class)
        .addMapping(NewAnswerDto::getText, Answer::setText);

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

    mapper
        .createTypeMap(Execution.class, NewExecutionDto.class)
        .addMappings(m -> m.skip(NewExecutionDto::setParticipants));

    return mapper;
  }
}
