package ch.japt.epj;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class PortfolioModel {
    private static ConcurrentHashMap<String, Portfolio> map =
            new ConcurrentHashMap<String, Portfolio>();

    public Portfolio create() {
        Portfolio portfolio = new Portfolio();
        map.put(portfolio.getUuidString(), portfolio);
        return portfolio;
    }

    public Portfolio get(String uuid) {
        return map.get(uuid);
    }

    public static Map<String, Portfolio> getMap() {
        return map;
    }

    public static void set(String uuid) {
        map.get(uuid).setValueFromPutCommand();
    }
}
