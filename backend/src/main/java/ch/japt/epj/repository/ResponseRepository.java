package ch.japt.epj.repository;

import ch.japt.epj.model.data.Response;
import java.util.Optional;
import java.util.stream.Stream;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseRepository extends CrudRepository<Response, Long> {
  Optional<Response> findByResponseId(Long responseId);

  @Query("select r from Response r")
  Stream<Response> getAllResponses();

  @Query(
      "select r from Response r "
          + "where r.exercise.exerciseId = ?2 "
          + "and r.person.personId = ?1")
  Optional<Response> answerExists(Long person, Long exercise);
}
