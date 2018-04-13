package ch.japt.epj.api;

import io.nayuki.qrcodegen.QrCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Controller
@RequestMapping("/api")
public class QrController implements QrCodeApi {
    @Override
    public ResponseEntity<byte[]> getQRCode(@PathVariable("id") Integer id) {
        QrCode code = QrCode.encodeText(String.valueOf(id), QrCode.Ecc.MEDIUM);
        BufferedImage image = code.toImage(20, 2);
        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        try {
            ImageIO.write(image, "png", stream);
            return new ResponseEntity<>(stream.toByteArray(), HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(new byte[0], HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
