package ch.japt.epj.repository;

import ch.japt.epj.model.data.Exercise;
import ch.japt.epj.repository.custom.ExerciseRepositoryCustom;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;
import java.util.stream.Stream;

public interface ExerciseRepository
        extends PagingAndSortingRepository<Exercise, Long>, ExerciseRepositoryCustom {
    Optional<Exercise> findByExerciseId(Long exerciseId);

    @Query("select t from Exercise t")
    Stream<Exercise> getAll();
}
