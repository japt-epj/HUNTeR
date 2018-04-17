package ch.japt.epj.model;

import ch.japt.epj.model.data.Answer;
import ch.japt.epj.model.data.Task;
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
public class TaskModel {
    private final ExerciseRepository exercises;
    private final AnswerRepository answers;
    private final ModelMapper mapper = new ModelMapper();

    public TaskModel(
            @Autowired ExerciseRepository exercises,
            @Autowired AnswerRepository answers
    ) {
        this.exercises = exercises;
        this.answers = answers;

        // TODO: These should probably be pulled out because we need them in more than one place.
        mapper.createTypeMap(Task.class, ExerciseDto.class)
                .addMapping(Task::getName, ExerciseDto::setTitle)
                .addMapping(Task::getAnswerTemplates, ExerciseDto::setAnswers);

        mapper.createTypeMap(NewAnswerDto.class, Answer.class)
                .addMapping(NewAnswerDto::getText, Answer::setAnswer);

        mapper.createTypeMap(NewExerciseDto.class, Task.class)
                .addMapping(NewExerciseDto::getTitle, Task::setName);
    }

    @Transactional(readOnly = true)
    public List<ExerciseDto> allExercises() {
        try (Stream<Task> tasks = exercises.getAll()) {
            return tasks
                    .map(t -> mapper.map(t, ExerciseDto.class))
                    .collect(Collectors.toList());
        }
    }

    public Optional<ExerciseDto> getExercise(Long id) {
        return exercises.findByTaskId(id)
                .map(t -> Optional.of(mapper.map(t, ExerciseDto.class)))
                .orElse(Optional.empty());
    }

    public void addExercise(NewExerciseDto exerciseDto) {
        Task task = mapper.map(exerciseDto, Task.class);
        exerciseDto.getAnswers().forEach(newAnswerDto -> {
            Answer answer = mapper.map(newAnswerDto, Answer.class);
            task.addAnswerTemplate(answer);
        });
        answers.save(task.getAnswerTemplates());
        exercises.save(task);
    }
}
