package ch.japt.epj.model;

import ch.japt.epj.library.ListConverter;
import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.dto.PersonDto;
import ch.japt.epj.repository.PersonRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class PersonModel {
    private final PersonRepository persons;
    private final ModelMapper mapper = new ModelMapper();

    public PersonModel(@Autowired PersonRepository persons) {
        this.persons = persons;
        mapper.createTypeMap(Person.class, PersonDto.class);
    }

    @Deprecated
    @Transactional(readOnly = true)
    public List<PersonDto> allPersons() {
        try (Stream<Person> personsStream = persons.getAll()) {
            return personsStream
                    .map(p -> mapper.map(p, PersonDto.class))
                    .collect(Collectors.toList());
        }
    }

    public List<PersonDto> getPeople(List<Integer> ids) {
        List<Long> longs = ListConverter.toLong(ids);
        Type dtoList = new TypeToken<List<PersonDto>>() {
        }.getType();
        return mapper.map(persons.findAll(longs), dtoList);
    }

    public Page<PersonDto> pagePeople(int page, int limit, Sort sort) {
        return persons.findAll(new PageRequest(page, limit, sort))
                .map(person -> mapper.map(person, PersonDto.class));
    }
}

