package ch.japt.epj.repository;

import ch.japt.epj.model.data.Exercise;
import ch.japt.epj.model.data.Quiz;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.stream.Stream;

public interface QuizRepository extends CrudRepository<Quiz, Long> {
    Optional<Quiz> findQuizById(Long quizId);

    @Query("select q from Quiz q")
    Stream<Quiz> getAll();
}
