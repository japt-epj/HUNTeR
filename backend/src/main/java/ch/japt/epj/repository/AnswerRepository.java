package ch.japt.epj.repository;

import ch.japt.epj.model.data.Answer;
import org.springframework.data.repository.CrudRepository;

public interface AnswerRepository extends CrudRepository<Answer, Long> {
}
