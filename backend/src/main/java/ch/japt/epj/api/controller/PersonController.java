package ch.japt.epj.api.controller;
import ch.japt.epj.api.PaginatedPerson;
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

@Controller
@Api(tags = "Person API")
@RequestMapping("/api")
public class PersonController implements ch.japt.epj.api.PersonApi, PaginatedPerson{

    private final PersonModel personModel;
    private final AuthenticationManager authenticationManager;
    private final PersonRepository personRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;


    public PersonController(
            @Autowired PersonModel personModel,
            @Autowired AuthenticationManager authenticationManager,
            @Autowired PersonRepository personRepository,
            @Autowired RoleRepository roleRepository,
            @Autowired PasswordEncoder passwordEncoder,
            @Autowired JwtTokenProvider tokenProvider
            ) {
            this.personModel = personModel;
            this.authenticationManager = authenticationManager;
            this.personRepository = personRepository;
            this.roleRepository = roleRepository;
            this.passwordEncoder = passwordEncoder;
            this.tokenProvider = tokenProvider;
            }


    @Override
    public ResponseEntity<Void> createPerson(@Validated @RequestBody PersonDto body) {

        if (personRepository.existsByEmail(body.getEmail())) {
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Person person = new Person(body.getFirstName(), body.getLastName(), body.getEmail(), passwordEncoder.encode(body.getPassword()) );

        Role personRole = roleRepository.findByName(RoleName.ROLE_TEACHER).orElseThrow(() -> new IllegalArgumentException("Unable to assign teacher role to person."));

        person.setRoles(Collections.singleton(personRole));

        Person result = personRepository.save(person);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/person/{personname}")
                .buildAndExpand(result.getEmail()).toUri();

        return ResponseEntity.created(location).build();

//        return null;
    }

    @Override
    public ResponseEntity<Void> deletePerson(String personname) {
        return null;
    }

    @Override
    public ResponseEntity<PersonDto> getPersonByEmail(String personname) {
        return null;
    }

    @Override
    public ResponseEntity<String> authenticatePerson(@Validated String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(jwt);
    }

    @Override
    public ResponseEntity<Void> logoutPerson() {
        return null;
    }

    @Override
    public ResponseEntity<Void> updatePerson(String personname, PersonDto body) {
        return null;
    }

    @Override
    public ResponseEntity<Page<PersonDto>> personGet(Integer page, Integer limit) {
        return new ResponseEntity<>(personModel.pagePeople(page, limit), HttpStatus.OK);
    }
}
