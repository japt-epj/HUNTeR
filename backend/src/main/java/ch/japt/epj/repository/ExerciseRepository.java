package ch.japt.epj.repository;

import ch.japt.epj.model.data.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ExerciseRepository extends CrudRepository<Task, Long> {
    Optional<Task> findByTaskId(Long taskId);
}
