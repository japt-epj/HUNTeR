package ch.japt.epj.repository;

import ch.japt.epj.model.data.Execution;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExecutionRepository extends CrudRepository<Execution, Long> {
}