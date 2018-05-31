package ch.japt.epj.api.controller;

import ch.japt.epj.api.ResponseApi;
import ch.japt.epj.model.ResponseModel;
import ch.japt.epj.model.dto.ResponseDto;
import io.swagger.annotations.Api;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Api(tags = "Response API")
@RequestMapping("/api")
public class ResponseController implements ResponseApi {
  private final ResponseModel responseModel;

  public ResponseController(@Autowired ResponseModel responseModel) {
    this.responseModel = responseModel;
  }

  @Override
  public ResponseEntity<Void> addResponse(@Valid @RequestBody ResponseDto body) {
    responseModel.addResponse(body);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }
}
