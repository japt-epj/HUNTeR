package ch.japt.epj.api.controller;
import ch.japt.epj.model.PersonModel;
import ch.japt.epj.model.dto.PersonDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@Api(tags = "Person API")
@RequestMapping("/api")
public class PersonController implements ch.japt.epj.api.PersonApi{
    private final PersonModel   personModel;

    public PersonController(@Autowired PersonModel personModel) { this.personModel = personModel; }


    @Override
    public ResponseEntity<Void> createperson(PersonDto body) {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteperson(String personname) {
        return null;
    }

    @Override
    public ResponseEntity<PersonDto> getpersonByName(String personname) {
        return null;
    }

    @Override
    public ResponseEntity<String> loginperson(String personname, String password) {
        return null;
    }

    @Override
    public ResponseEntity<Void> logoutperson() {
        return null;
    }

    @Override
    public ResponseEntity<List<PersonDto>> personGet() {
        return new ResponseEntity<>(personModel.allPersons(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> updateperson(String personname, PersonDto body) {
        return null;
    }
}
