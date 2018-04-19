package ch.japt.epj.model;

import ch.japt.epj.model.data.Answer;
import ch.japt.epj.model.data.Exercise;
import ch.japt.epj.model.dto.ExerciseDto;
import ch.japt.epj.model.dto.NewAnswerDto;
import ch.japt.epj.model.dto.NewExerciseDto;
import ch.japt.epj.repository.AnswerRepository;
import ch.japt.epj.repository.ExerciseRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class ExerciseModel {
    private final ExerciseRepository exercises;
    private final AnswerRepository answers;
    private final ModelMapper mapper = new ModelMapper();

    public ExerciseModel(
            @Autowired ExerciseRepository exercises,
            @Autowired AnswerRepository answers
    ) {
        this.exercises = exercises;
        this.answers = answers;
        TypeMap<Exercise, ExerciseDto> taskToDto = mapper.createTypeMap(Exercise.class, ExerciseDto.class);
        taskToDto.addMapping(Exercise::getName, ExerciseDto::setTitle);
        taskToDto.addMapping(Exercise::getAnswerTemplates, ExerciseDto::setAnswers);

        TypeMap<NewAnswerDto, Answer> dtoToAnswer = mapper.createTypeMap(NewAnswerDto.class, Answer.class);
        dtoToAnswer.addMapping(NewAnswerDto::getText, Answer::setAnswer);

        TypeMap<NewExerciseDto, Exercise> dtoToTask = mapper.createTypeMap(NewExerciseDto.class, Exercise.class);
        dtoToTask.addMapping(NewExerciseDto::getTitle, Exercise::setName);
    }

    @Transactional(readOnly = true)
    public List<ExerciseDto> allExercises() {
        try (Stream<Exercise> exercisesStream = exercises.getAll()) {
            return exercisesStream
                    .map(t -> mapper.map(t, ExerciseDto.class))
                    .collect(Collectors.toList());
        }
    }

    public Optional<ExerciseDto> getExercise(Long id) {
        return exercises.findByExerciseId(id)
                .map(t -> Optional.of(mapper.map(t, ExerciseDto.class)))
                .orElse(Optional.empty());
    }

    public void addExercise(NewExerciseDto exerciseDto) {
        Exercise exercise = mapper.map(exerciseDto, Exercise.class);
        exerciseDto.getAnswers().forEach(newAnswerDto -> {
            Answer answer = mapper.map(newAnswerDto, Answer.class);
            exercise.addAnswerTemplate(answer);
        });
        answers.save(exercise.getAnswerTemplates());
        exercises.save(exercise);
    }
}
