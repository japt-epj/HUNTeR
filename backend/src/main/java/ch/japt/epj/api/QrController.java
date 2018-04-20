package ch.japt.epj.api;

import ch.japt.epj.model.QrModel;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Api(tags = "QR API")
@RequestMapping("/api")
public class QrController implements QrCodeApi {
    private final QrModel model;

    public QrController(@Autowired QrModel model) {
        this.model = model;
    }

    @Override
    public ResponseEntity<byte[]> getQRCode(@PathVariable("id") Integer id) {
        return model.generateCode(id)
                .map(b -> new ResponseEntity<>(b, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
