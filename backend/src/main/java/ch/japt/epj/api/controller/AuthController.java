package ch.japt.epj.api.controller;

import ch.japt.epj.model.RegPersonModel;
import ch.japt.epj.model.dto.AuthPersonDto;
import ch.japt.epj.model.dto.JWTDto;
import ch.japt.epj.model.dto.RegPersonDto;
import ch.japt.epj.repository.PersonRepository;
import ch.japt.epj.security.JwtTokenProvider;
import io.swagger.annotations.Api;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import javax.validation.Valid;
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
    UsernamePasswordAuthenticationToken token =
        new UsernamePasswordAuthenticationToken(body.getEmail(), body.getPassword());
    Authentication authentication = authenticationManager.authenticate(token);
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

    Map<Boolean, String> headerMap = new HashMap<>();
    headerMap.put(true, "X-HUNTeR-Redirect");
    headerMap.put(false, "Location");

    Map<String, String> roleMap = new HashMap<>();
    roleMap.put("ROLE_TEACHER", "/teacher");
    roleMap.put("ROLE_STUDENT", "/participant");

    Map<Boolean, HttpStatus> statusMap = new HashMap<>();
    statusMap.put(true, HttpStatus.OK);
    statusMap.put(false, HttpStatus.FOUND);

    for (GrantedAuthority grantedAuthority : authorities) {
      if ("ROLE_TEACHER".equals(grantedAuthority.getAuthority())) {
        isTeacher = true;
      } else if ("ROLE_STUDENT".equals(grantedAuthority.getAuthority())) {
        isStudent = true;
      }
    }

    if (isTeacher) {
      headers.add(headerMap.get(hunter), roleMap.get("ROLE_TEACHER"));
    } else if (isStudent) {
      headers.add(headerMap.get(hunter), roleMap.get("ROLE_STUDENT"));
    } else {
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    return new ResponseEntity<>(headers, statusMap.get(hunter));
  }
}
