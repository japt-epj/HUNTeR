package ch.japt.epj.repository;

import ch.japt.epj.model.data.Task;
import org.springframework.data.repository.CrudRepository;

public interface ExerciseRepository extends CrudRepository<Task, Long> {
}
