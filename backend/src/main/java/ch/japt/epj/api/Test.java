package ch.japt.epj.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {
    @RequestMapping(path = "/api/test", method = RequestMethod.GET)
    public @ResponseBody
    TestPayload test() {
        return new TestPayload();
//        return new TestPayload(1);
    }
}
