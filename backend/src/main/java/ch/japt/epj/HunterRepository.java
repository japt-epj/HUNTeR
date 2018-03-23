package ch.japt.epj;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface HunterRepository extends CrudRepository<Hunter, Long> {
    Optional<Hunter> findByName(String name);
}
