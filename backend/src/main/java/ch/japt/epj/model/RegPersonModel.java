package ch.japt.epj.model;

import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.data.Role;
import ch.japt.epj.model.data.RoleName;
import ch.japt.epj.model.dto.RegPersonDto;
import ch.japt.epj.repository.PersonRepository;
import ch.japt.epj.repository.RoleRepository;
import java.util.Collections;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class RegPersonModel {

  private final PersonRepository persons;
  private final RoleRepository roles;
  private final PasswordEncoder passwordEncoder;
  private final ModelMapper mapper = new ModelMapper();

  public RegPersonModel(
      @Autowired PersonRepository persons,
      @Autowired RoleRepository roles,
      @Autowired PasswordEncoder passwordEncoder) {
    this.persons = persons;
    this.roles = roles;
    this.passwordEncoder = passwordEncoder;
    mapper.createTypeMap(Person.class, RegPersonDto.class);
  }

  public void addPerson(RegPersonDto regPersonDto) {
    Person person = mapper.map(regPersonDto, Person.class);
    person.setPassword(passwordEncoder.encode(person.getFirstName().toLowerCase()));
    Role personRole =
        roles
            .findByName(RoleName.ROLE_STUDENT)
            .orElseThrow(
                () -> new IllegalArgumentException("Unable to assign student role to person."));
    person.setRoles(Collections.singleton(personRole));
    persons.save(person);
  }
}
