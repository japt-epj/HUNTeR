package ch.japt.epj.repository;

import ch.japt.epj.model.data.Person;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;
import java.util.stream.Stream;

public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {
    Optional<Person> findByPersonId(Long personId);

    Optional<Person> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query("select p from Person p")
    Stream<Person> getAll();
}
