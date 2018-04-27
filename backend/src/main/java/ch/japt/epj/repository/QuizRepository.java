package ch.japt.epj.repository;

import ch.japt.epj.model.data.Quiz;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;
import java.util.stream.Stream;

public interface QuizRepository extends PagingAndSortingRepository<Quiz, Long> {
    Optional<Quiz> findQuizByQuizId(Long quizId);

    @Query("select q from Quiz q")
    Stream<Quiz> getAll();
}
