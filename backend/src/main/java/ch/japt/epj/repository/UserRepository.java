package ch.japt.epj.repository;

import ch.japt.epj.model.data.Person;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<Person, Long> {
}
