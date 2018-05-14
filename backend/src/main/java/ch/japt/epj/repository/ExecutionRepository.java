package ch.japt.epj.repository;

import ch.japt.epj.model.data.Execution;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExecutionRepository extends CrudRepository<Execution, Long> {
  Optional<Execution> findByExecutionId(long executionId);
}
