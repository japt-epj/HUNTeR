package ch.japt.epj.repository;

import ch.japt.epj.model.data.Response;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseRepository {
  Optional<Response> findByResponseId(Long responseId);
}
