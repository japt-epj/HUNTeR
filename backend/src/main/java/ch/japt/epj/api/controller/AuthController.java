package ch.japt.epj.api.controller;

import ch.japt.epj.model.RegPersonModel;
import ch.japt.epj.model.dto.AuthPersonDto;
import ch.japt.epj.model.dto.JWTDto;
import ch.japt.epj.model.dto.RegPersonDto;
import ch.japt.epj.repository.PersonRepository;
import ch.japt.epj.security.JwtTokenProvider;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller
@Api(tags = "Auth API")
@RequestMapping("/api")
public class AuthController implements ch.japt.epj.api.AuthApi {

  private final RegPersonModel regPersonModel;
  private final AuthenticationManager authenticationManager;
  private final PersonRepository personRepository;
  private final JwtTokenProvider tokenProvider;

  public AuthController(
      @Autowired RegPersonModel regPersonModel,
      @Autowired AuthenticationManager authenticationManager,
      @Autowired PersonRepository personRepository,
      @Autowired JwtTokenProvider tokenProvider) {
    this.regPersonModel = regPersonModel;
    this.authenticationManager = authenticationManager;
    this.personRepository = personRepository;
    this.tokenProvider = tokenProvider;
  }

  @Override
  public ResponseEntity<JWTDto> loginPerson(@Valid @RequestBody AuthPersonDto body) {
    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(body.getEmail(), body.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = tokenProvider.generateToken(authentication);
    JWTDto dto = new JWTDto();
    dto.setToken(jwt);
    dto.setTokenType("Bearer");
    return new ResponseEntity<>(dto, HttpStatus.OK);
  }

  @Override
  public ResponseEntity<Void> registerPerson(@Valid @RequestBody RegPersonDto body) {

    if (personRepository.existsByEmail(body.getEmail())) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    regPersonModel.addPerson(body);

    return new ResponseEntity<>(HttpStatus.OK);
  }
}
