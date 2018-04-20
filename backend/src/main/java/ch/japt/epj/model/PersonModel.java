package ch.japt.epj.model;

import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.dto.PersonDto;
import ch.japt.epj.repository.PersonRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class PersonModel {
    private final PersonRepository persons;
    private final ModelMapper mapper = new ModelMapper();

    public PersonModel(
            @Autowired PersonRepository persons
    ){
        this.persons = persons;
        mapper.createTypeMap(Person.class, PersonDto.class);
    }

    @Deprecated
    @Transactional(readOnly = true)
    public List<PersonDto> allPersons() {
        try (Stream<Person> personsStream = persons.getAll()) {
            return personsStream
                    .map(p -> mapper.map(p, PersonDto.class ))
                    .collect(Collectors.toList());
        }
    }

    public Page<PersonDto> pagePeople(Integer page, Integer limit) {
        if (page == null) page = Integer.valueOf(0);
        if (limit == null) limit = Long.valueOf(persons.count()).intValue();

        return persons.findAll(new PageRequest(page, limit))
                .map(person -> mapper.map(person, PersonDto.class));
    }
}

