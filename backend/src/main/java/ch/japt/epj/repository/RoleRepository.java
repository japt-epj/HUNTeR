package ch.japt.epj.repository;

import ch.japt.epj.model.data.Role;
import ch.japt.epj.model.data.RoleName;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository {
    Optional<Role> findByName(RoleName name);
}
