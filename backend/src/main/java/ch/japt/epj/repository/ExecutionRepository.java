package ch.japt.epj.repository;

import ch.japt.epj.model.data.Execution;
import java.util.Optional;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExecutionRepository extends PagingAndSortingRepository<Execution, Long> {
  Optional<Execution> findByExecutionId(long executionId);
}
