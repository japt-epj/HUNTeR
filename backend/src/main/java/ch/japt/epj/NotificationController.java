package ch.japt.epj;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Profile("dev")
public class NotificationController {

    @RequestMapping("/")
    public String index() {
        return "Running Local configuration. Run react separately!";
    }
}