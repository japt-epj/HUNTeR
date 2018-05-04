package ch.japt.epj.repository;

import ch.japt.epj.model.data.Location;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends CrudRepository<Location, Long> {
  Optional<Location> findByLocationId(Long locationId);
}
