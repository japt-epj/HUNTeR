package ch.japt.epj.repository;

import ch.japt.epj.model.data.Execution;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExecutionRepository extends PagingAndSortingRepository<Execution, Long> {
  Optional<Execution> findByExecutionId(long executionId);

  @Query(
      "SELECT p.personId, p.firstName, p.lastName, "
          + "SUM(CASE WHEN a.checked = true THEN 1 ELSE 0 END) / (SIZE(e.quiz.exercises) * 1.0) * 100 "
          + "FROM Response r "
          + "INNER JOIN r.person p "
          + "INNER JOIN r.answerFromPerson a "
          + "INNER JOIN Execution e ON r MEMBER OF e.responses AND e.executionId = ?1 "
          + "GROUP BY p.personId")
  List<?> getAggregatedScore(Long executionId);
}
