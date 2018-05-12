package ch.japt.epj.api.controller;

import ch.japt.epj.api.ResponseApi;
import ch.japt.epj.model.ResponseModel;
import ch.japt.epj.model.dto.ResponseDto;
import io.swagger.annotations.Api;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Api(tags = "Response API")
@RequestMapping("/Api")
public class ResponseController implements ResponseApi {
  private final ResponseModel responseModel;

  public ResponseController(@Autowired ResponseModel responseModel) {
    this.responseModel = responseModel;
  }

  @Override
  public ResponseEntity<Void> addResponse(@Valid @RequestBody ResponseDto body) {
    responseModel.addResponse(body);
    return null;
  }

  @Override
  public ResponseEntity<List<ResponseDto>> responseIdGet(@PathVariable("id") List<Integer> id) {
    return null;
  }
}
