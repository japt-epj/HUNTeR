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
}
