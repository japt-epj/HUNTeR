package ch.japt.epj.api.controller;

import ch.japt.epj.api.PaginatedPerson;
import ch.japt.epj.api.PersonApi;
import ch.japt.epj.library.SortParameterHandler;
import ch.japt.epj.model.PersonModel;
import ch.japt.epj.model.dto.PersonDto;
import ch.japt.epj.model.dto.RegPersonDto;
import io.swagger.annotations.Api;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@Api(tags = "Person API")
@RequestMapping("/api")
public class PersonController implements PersonApi, PaginatedPerson {

  private final PersonModel personModel;

  public PersonController(@Autowired PersonModel personModel) {
    this.personModel = personModel;
  }

  @Override
  public ResponseEntity<Page<PersonDto>> personGet(
      @Valid @RequestParam(value = "page", defaultValue = "0") int page,
      @Valid @RequestParam(value = "limit", defaultValue = "5") int limit,
      @Valid @RequestParam(value = "sort", defaultValue = "lastName") String sortOptions) {
    return new ResponseEntity<>(
        personModel.pagePeople(page, limit, SortParameterHandler.makeSort(sortOptions)),
        HttpStatus.OK);
  }

  @Override
  public ResponseEntity<List<PersonDto>> getPersonById(
      @Valid @PathVariable("id") List<Integer> id) {
    return new ResponseEntity<>(personModel.getPeople(id), HttpStatus.OK);
  }

  @Override
  public ResponseEntity<Void> updatePerson(@Valid @RequestBody RegPersonDto body) {
    personModel.updatePeople(body);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }
}
