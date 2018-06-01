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

  @Query(
      "select new Response(p, e, a) "
          + "from Person p "
          + "inner join Exercise e on e.exerciseId = ?2 "
          + "inner join Answer a on a.answerId = ?3 "
          + "where p.personId = ?1")
  Response fromDtoData(Long personId, Long exerciseId, Long answerId);
}
