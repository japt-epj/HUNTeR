package ch.japt.epj.repository;

import ch.japt.epj.model.data.Execution;
import org.springframework.data.repository.CrudRepository;

public interface ExecutionRepository extends CrudRepository<Execution, Long> {
}