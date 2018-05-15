package ch.japt.epj.api.controller;

import ch.japt.epj.model.RegPersonModel;
import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.data.Role;
import ch.japt.epj.model.data.RoleName;
import ch.japt.epj.model.dto.AuthPersonDto;
import ch.japt.epj.model.dto.JWTDto;
import ch.japt.epj.model.dto.RegPersonDto;
import ch.japt.epj.repository.PersonRepository;
import ch.japt.epj.security.JwtTokenProvider;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Collection;

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
      @Autowired JwtTokenProvider tokenProvider
  ) {
    this.regPersonModel = regPersonModel;
    this.authenticationManager = authenticationManager;
    this.personRepository = personRepository;
    this.tokenProvider = tokenProvider;
  }

  @Override
  public ResponseEntity<JWTDto> loginPerson(@Valid @RequestBody AuthPersonDto body) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(body.getEmail(), body.getPassword())
    );
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
      return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    regPersonModel.addPerson(body);

    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @Override
  public ResponseEntity<Void> getEntryPoint(@RequestHeader("X-HUNTeR-Frontend") Boolean hunter) {
    HttpHeaders headers = new HttpHeaders();
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
    boolean isStudent = false;
    boolean isTeacher = false;

    for (GrantedAuthority grantedAuthority : authorities) {
      if (grantedAuthority.getAuthority().equals("ROLE_TEACHER")) {
        isTeacher = true;
      } else if (grantedAuthority.getAuthority().equals("ROLE_STUDENT")) {
        isStudent = true;
      }
    }

    if (hunter) {
      if (isTeacher) {
        headers.add("X-HUNTeR-Redirect", "/teacher");
      } else if (isStudent) {
        headers.add("X-HUNTeR-Redirect", "/participant");
      } else {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
      }
      return new ResponseEntity<>(headers, HttpStatus.OK);
    } else {
      if (isTeacher) {
        headers.add("Location", "/teacher");
      } else if (isStudent) {
        headers.add("Location", "/participant");
      } else {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
      }
                      return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }
  }
}
