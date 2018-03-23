package ch.japt.epj;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class HunterController {
    @Autowired
    HunterRepository repository;

    @RequestMapping(path = "/user/{name}", method = RequestMethod.GET)
    public @ResponseBody Hunter getUser(@PathVariable String name) {
        return repository
                .findByName(name)
                .orElse(new Hunter("empty"));
    }

    @RequestMapping(path = "/user/{name}", method = RequestMethod.POST)
    public void addUser(@PathVariable String name) {
        Hunter hunter = new Hunter(name);
        repository.save(hunter);
    }

    @RequestMapping("/user")
    public @ResponseBody List<Hunter> getAll() {
        ArrayList<Hunter> hunters = new ArrayList<>();
        repository.findAll().forEach(hunters::add);
        return hunters;
    }
}
