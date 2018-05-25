package ch.japt.epj.api.controller;

import ch.japt.epj.model.ScoreModel;
import ch.japt.epj.model.dto.ScoreDto;
import ch.japt.epj.security.CustomUserDetails;
import io.swagger.annotations.Api;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Api
@RequestMapping("/api")
public class ScoreController implements ch.japt.epj.api.ScoreApi {

  private final ScoreModel scoreModel;

  public ScoreController(@Autowired ScoreModel scoreModel) {
    this.scoreModel = scoreModel;
  }

  @Override
  public ResponseEntity<ScoreDto> getScore(@Valid @PathVariable("id") Long id) {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    Long personId = ((CustomUserDetails) authentication.getPrincipal()).getPersonId();
    return new ResponseEntity<>(scoreModel.getScore(id, personId), HttpStatus.OK);
  }
}
