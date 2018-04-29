package ch.japt.epj.library;

import java.util.List;
import java.util.stream.Collectors;

public class ListConverter {
    private ListConverter(){}

    public static List<Long> toLong(List<Integer> list) {
        return list.stream()
                .map(Integer::longValue)
                .collect(Collectors.toList());
    }
}
