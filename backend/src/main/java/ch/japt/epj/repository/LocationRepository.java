package ch.japt.epj.repository;

import ch.japt.epj.model.data.Location;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends CrudRepository<Location, Long> {
  Optional<Location> findByLocationId(Long locationId);
}
