package ch.japt.epj.repository;

import ch.japt.epj.model.data.Role;
import ch.japt.epj.model.data.RoleName;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
