package ch.japt.epj.api.controller;
import ch.japt.epj.api.PaginatedPerson;
import ch.japt.epj.library.SortParameterHandler;
import ch.japt.epj.model.PersonModel;
import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.data.Role;
import ch.japt.epj.model.data.RoleName;
import ch.japt.epj.model.dto.PersonDto;
import ch.japt.epj.repository.PersonRepository;
import ch.japt.epj.repository.RoleRepository;
import ch.japt.epj.security.JwtTokenProvider;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.Collections;
import org.springframework.web.bind.annotation.RequestParam;
import javax.validation.Valid;


@Controller
@Api(tags = "Person API")
@RequestMapping("/api")
public class PersonController implements ch.japt.epj.api.PersonApi, PaginatedPerson{

    private final PersonModel personModel;

    public PersonController(
            @Autowired PersonModel personModel
    ) {
        this.personModel = personModel;
    }



//
//    @Override
//    public ResponseEntity<Void> deletePerson(String email) {
//        return null;
//    }

    @Override
    public ResponseEntity<PersonDto> getPersonByEmail(String email) {
        return null;
    }




    @Override
    public ResponseEntity<Void> updatePerson(String personname, PersonDto body) {
        return null;
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
}
