package ch.japt.epj.api.controller;

import ch.japt.epj.model.RegPersonModel;
import ch.japt.epj.model.data.AuthenticationStatus;
import ch.japt.epj.model.data.RoleName;
import ch.japt.epj.model.dto.AuthPersonDto;
import ch.japt.epj.model.dto.JWTDto;
import ch.japt.epj.model.dto.RegPersonDto;
import ch.japt.epj.repository.PersonRepository;
import ch.japt.epj.security.JwtTokenProvider;
import io.swagger.annotations.Api;
import java.util.Comparator;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Api(tags = "Auth API")
@RequestMapping("/api")
public class AuthController implements ch.japt.epj.api.AuthApi {

  private final RegPersonModel regPersonModel;
  private final AuthenticationManager authenticationManager;
  private final PersonRepository personRepository;
  private final JwtTokenProvider tokenProvider;

  @Value("${app.jwtExpirationInMs}")
  private int jwtExpirationInMs;

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
    UsernamePasswordAuthenticationToken token =
        new UsernamePasswordAuthenticationToken(body.getEmail(), body.getPassword());
    Authentication authentication = authenticationManager.authenticate(token);
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = tokenProvider.generateToken(authentication);
    JWTDto dto = new JWTDto();
    dto.setToken(jwt);
    dto.setTokenType("Bearer");
    dto.setTokenLifetime(jwtExpirationInMs);
    return new ResponseEntity<>(dto, HttpStatus.OK);
  }

  @Override
  @Secured({"ROLE_TEACHER"})
  public ResponseEntity<Void> registerPerson(@Valid @RequestBody RegPersonDto body) {
    if (personRepository.existsByEmail(body.getEmail())) {
      return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    regPersonModel.addPerson(body);

    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  // Diamond operator cannot be used here, because type inference is broken inside a lambda.
  // This really is an issue with the sonar rule, and not with our code.
  @SuppressWarnings("squid:S2293")
  @Override
  public ResponseEntity<Void> getEntryPoint(@RequestHeader("X-HUNTeR-Frontend") Boolean hunter) {
    return SecurityContextHolder.getContext()
        .getAuthentication()
        .getAuthorities()
        .stream()
        .map(granted -> Enum.valueOf(RoleName.class, granted.getAuthority()))
        .sorted(Comparator.comparingInt(RoleName::getPriority))
        .findFirst()
        .map(
            role -> {
              AuthenticationStatus status = new AuthenticationStatus(hunter, role);
              return new ResponseEntity<Void>(status.getHeaders(), status.getStatus());
            })
        .orElse(new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
  }
}
