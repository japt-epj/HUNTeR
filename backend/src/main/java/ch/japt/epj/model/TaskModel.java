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
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.List;

@Component
public class TaskModel {
    @Autowired
    private ExerciseRepository exercises;
    @Autowired
    private AnswerRepository answers;
    private ModelMapper mapper = new ModelMapper();

    public TaskModel() {
        TypeMap<Task, ExerciseDto> taskToDto = mapper.createTypeMap(Task.class, ExerciseDto.class);
        taskToDto.addMapping(Task::getName, ExerciseDto::setTitle);
        taskToDto.addMapping(Task::getAnswerTemplates, ExerciseDto::setAnswers);

        TypeMap<NewAnswerDto, Answer> dtoToAnswer = mapper.createTypeMap(NewAnswerDto.class, Answer.class);
        dtoToAnswer.addMapping(NewAnswerDto::getText, Answer::setAnswer);

        TypeMap<NewExerciseDto, Task> dtoToTask = mapper.createTypeMap(NewExerciseDto.class, Task.class);
        dtoToTask.addMapping(NewExerciseDto::getTitle, Task::setName);
    }

    public List<ExerciseDto> allExercises() {
        Type type = new TypeToken<List<ExerciseDto>>() {}.getType();
        Iterable<Task> all = exercises.findAll();
        return mapper.map(all, type);
    }

    public ExerciseDto getExercise(Long id) {
        Task task = exercises.findOne(id);
        return mapper.map(task, ExerciseDto.class);
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
