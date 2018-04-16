package ch.japt.epj.repository;

import ch.japt.epj.model.data.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.stream.Stream;

public interface ExerciseRepository extends CrudRepository<Task, Long> {
    Optional<Task> findByTaskId(Long taskId);

    @Query("select t from Task t")
    Stream<Task> getAll();
}
