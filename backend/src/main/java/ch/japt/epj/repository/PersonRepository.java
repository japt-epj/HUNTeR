package ch.japt.epj.repository;

import ch.japt.epj.model.data.Person;
import java.util.Optional;
import java.util.stream.Stream;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {
  Optional<Person> findByPersonId(Long personId);

  Optional<Person> findByEmail(String email);

  Boolean existsByEmail(String email);

  @Query("select p from Person p")
  Stream<Person> getAll();
}
