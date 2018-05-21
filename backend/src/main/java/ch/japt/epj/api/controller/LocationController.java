package ch.japt.epj.api.controller;

import ch.japt.epj.api.LocationApi;
import ch.japt.epj.model.LocationModel;
import ch.japt.epj.model.dto.NextExerciseLocationDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Api(tags = "Location API")
@RequestMapping("/api")
public class LocationController implements LocationApi {
  private final LocationModel locationModel;

  public LocationController(@Autowired LocationModel locationModel) {
    this.locationModel = locationModel;
  }

  //  @Override
  //  public ResponseEntity<NextExerciseLocationDto> locationGet() {
  //    return null;
  //  }

  @Override
  public ResponseEntity<NextExerciseLocationDto> locationIdGet(@PathVariable("id") Integer id) {
    return new ResponseEntity<>(locationModel.getExerciseLocation(id), HttpStatus.OK);
  }
}
