package ch.japt.epj.repository;

import ch.japt.epj.model.data.Exercise;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.stream.Stream;

public interface ExerciseRepository extends CrudRepository<Exercise, Long> {
    Optional<Exercise> findByExerciseId(Long exerciseId);

    @Query("select t from Exercise t")
    Stream<Exercise> getAll();
}
