package ch.japt.epj.repository;

import ch.japt.epj.model.data.Quiz;
import java.util.Optional;
import java.util.stream.Stream;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends PagingAndSortingRepository<Quiz, Long> {
  Optional<Quiz> findQuizByQuizId(Long quizId);

  @Query("select q from Quiz q")
  Stream<Quiz> getAll();
}
