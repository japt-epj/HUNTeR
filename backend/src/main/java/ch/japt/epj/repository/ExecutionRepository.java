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
    nativeQuery = true,
    value =
        "select person_person_id, person.first_name, person.last_name,"
            + "count(*) filter (where answer.checked = true) / CAST(count(answer) as float) * 100 as score "
            + "from response "
            + "inner join person on response.person_person_id = person.person_id "
            + "inner join answer on response.answer_from_person_answer_id = answer.answer_id "
            + "inner join execution_responses on execution_responses.responses_response_id = response_id "
            + "where execution_responses.execution_execution_id = ?1 "
            + "group by person_person_id, person.first_name, person.last_name;"
  )
  List<?> getAggregatedScore(Long executionId);

  @Query(
      "SELECT p.personId, p.firstName, p.lastName, "
          + "SUM(CASE WHEN a.checked = true THEN 1 ELSE 0 END) / COUNT(es) * 100 "
          + "FROM Response r "
          + "INNER JOIN r.person p "
          + "INNER JOIN r.answerFromPerson a "
          + "INNER JOIN Execution e ON r MEMBER OF e.responses AND e.executionId = ?1 "
          + "INNER JOIN e.quiz q "
          + "INNER JOIN q.exercises es "
          + "GROUP BY p.personId")
  List<?> getAggregatedScore2(Long executionId);
}
