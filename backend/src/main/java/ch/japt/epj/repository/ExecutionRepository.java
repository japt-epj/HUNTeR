package ch.japt.epj.repository;

import ch.japt.epj.model.data.Execution;
import ch.japt.epj.repository.data.ExecutionScore;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExecutionRepository extends PagingAndSortingRepository<Execution, Long> {
  Optional<Execution> findByExecutionId(long executionId);

  @Query(
      "SELECT NEW ch.japt.epj.repository.data.ExecutionScore(p.personId, p.firstName, p.lastName, "
          + "SUM(CASE WHEN r.answerFromPerson.checked = true THEN 1 ELSE 0 END) "
          + "/ (SIZE(e.quiz.exercises) * 1.0), "
          + "CASE WHEN p.personId = ?2 THEN true ELSE false END) "
          + "FROM Person p "
          + "INNER JOIN Execution e ON p MEMBER OF e.participants AND e.executionId = ?1 "
          + "INNER JOIN Response r ON r MEMBER OF e.responses AND r.person.personId = p.personId "
          + "GROUP BY p.personId")
  List<ExecutionScore> aggregateScores(Long executionId, Long personId);

  @Query(
      "SELECT NEW ch.japt.epj.repository.data.ExecutionScore(p.personId, p.firstName, p.lastName, "
          + "0.0,"
          + "CASE WHEN p.personId = ?2 THEN true ELSE false END) "
          + "FROM Person p "
          + "INNER JOIN Execution e ON p MEMBER OF e.participants AND e.executionId = ?1 "
          + "GROUP BY p.personId")
  List<ExecutionScore> allScores(Long executionId, Long personId);
}
