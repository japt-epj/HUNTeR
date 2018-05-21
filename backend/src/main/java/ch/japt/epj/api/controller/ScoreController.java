package ch.japt.epj.api.controller;

import ch.japt.epj.model.ScoreModel;
import ch.japt.epj.model.dto.ScoreDto;
import io.swagger.annotations.Api;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
  public ResponseEntity<ScoreDto> getScore(@Valid Long id) {
    //    scoreModel.getScore(id);
    return new ResponseEntity<>(scoreModel.getScore(id), HttpStatus.OK);
  }
}
