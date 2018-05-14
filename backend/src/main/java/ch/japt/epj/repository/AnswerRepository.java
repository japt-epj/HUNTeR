package ch.japt.epj.repository;

import ch.japt.epj.model.data.Answer;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends CrudRepository<Answer, Long> {
  Optional<Answer> findByAnswerId(Long answerId);
}
