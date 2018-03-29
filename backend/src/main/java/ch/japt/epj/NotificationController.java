package ch.japt.epj;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {

    @RequestMapping("/")
    @Profile("dev")
    public String index() {
        return "Running Local configuration. Run react separately!";
    }
}