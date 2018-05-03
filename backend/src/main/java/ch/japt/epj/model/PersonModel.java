package ch.japt.epj.model;

import ch.japt.epj.library.ListConverter;
import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.dto.PersonDto;
import ch.japt.epj.repository.PersonRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.List;

@Component
public class PersonModel {
    private final PersonRepository persons;
    private final ModelMapper mapper = new ModelMapper();

    public PersonModel(@Autowired PersonRepository persons) {
        this.persons = persons;
        mapper.createTypeMap(Person.class, PersonDto.class);
    }

    public List<PersonDto> getPeople(List<Integer> ids) {
        List<Long> longs = ListConverter.toLong(ids);
        Type dtoList = new TypeToken<List<PersonDto>>() {}.getType();
        return mapper.map(persons.findAll(longs), dtoList);
    }

    public Page<PersonDto> pagePeople(int page, int limit, Sort sort) {
        return persons.findAll(new PageRequest(page, limit, sort))
                .map(person -> mapper.map(person, PersonDto.class));
    }

    public PersonDto getPersonByEmail(String email){
        Person person = persons.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Unable to find person with email:" + email));
        return mapper.map(person, PersonDto.class);
    }
}

