package ch.japt.epj.api.controller;

import ch.japt.epj.api.QrCodeApi;
import ch.japt.epj.model.QrModel;
import io.swagger.annotations.Api;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@Api(tags = "QR API")
@RequestMapping("/api")
public class QrController implements QrCodeApi {
  private final QrModel model;

  public QrController(@Autowired QrModel model) {
    this.model = model;
  }

  @Override
  public ResponseEntity<byte[]> getQRCode(
      @Valid @PathVariable("id") Integer id,
      @Valid @RequestParam(value = "scale", defaultValue = "20") Integer scale,
      @Valid @RequestParam(value = "border", defaultValue = "2") Integer border) {

    return model
        .generateCode(id, scale, border)
        .map(b -> new ResponseEntity<>(b, HttpStatus.OK))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }
}
