package ch.japt.epj;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class PortfolioController {

    @GetMapping("/portfolio")
    public String portfolio() {
        PortfolioModel portfolioModel = new PortfolioModel();
        Portfolio portfolio = portfolioModel.create();
        return portfolio.getUuidString();
    }

    @GetMapping("/portfolio/{uuid}")
    public String portfolio(@PathVariable String uuid) {
        return new PortfolioModel()
                .get(uuid)
                .toString();
    }

    @GetMapping("/portfolio/stats")
    public String stats() {
        Map<String, Portfolio> map = PortfolioModel.getMap();

        StringBuilder builder = new StringBuilder();
        map.forEach((key, val) ->
                builder.append(String.format("<div>%s</div>", val.getUuidString())));

        return builder.toString();
    }

    @RequestMapping(value = "/portfolio/{uuid}", method = RequestMethod.POST)
    public void setValuePortFolio(@PathVariable String uuid) {
        PortfolioModel.set(uuid);
    }
}
