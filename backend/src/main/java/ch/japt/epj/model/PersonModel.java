package ch.japt.epj.model;

import ch.japt.epj.library.ListConverter;
import ch.japt.epj.model.dto.PersonDto;
import ch.japt.epj.model.dto.UpdatePersonDto;
import ch.japt.epj.model.mapping.Mappings;
import ch.japt.epj.repository.PersonRepository;
import java.lang.reflect.Type;
import java.util.Collection;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class PersonModel {
  private final PersonRepository persons;
  private final ModelMapper mapper = Mappings.personMapper();

  public PersonModel(@Autowired PersonRepository persons) {
    this.persons = persons;
  }

  public List<PersonDto> getPeople(List<Integer> ids) {
    Collection<Long> longs = ListConverter.toLong(ids);
    Type dtoList = new TypeToken<List<PersonDto>>() {}.getType();
    return mapper.map(persons.findAll(longs), dtoList);
  }

  public Page<PersonDto> pagePeople(int page, int limit, Sort sort) {
    return persons
        .findAll(new PageRequest(page, limit, sort))
        .map(person -> mapper.map(person, PersonDto.class));
  }

  public void updatePeople(UpdatePersonDto body, Long personId) {
    persons
        .findByPersonId(personId)
        .ifPresent(
            person -> {
              // this should check for missing values...
              person.setFirstName(body.getFirstName());
              person.setLastName(body.getLastName());
              person.setEmail(body.getEmail());
              persons.save(person);
            });
  }

  public PersonDto getPerson(Long id) {
    return persons
        .findByPersonId(id)
        .map(person -> mapper.map(person, PersonDto.class))
        .orElseThrow(() -> new IllegalArgumentException("Unable to find current person."));
  }
}
