package ch.japt.epj.library;

import java.util.Collection;
import java.util.stream.Collectors;

public final class ListConverter {
  private ListConverter() {}

  public static Collection<Long> toLong(Collection<Integer> list) {
    return list.stream().map(Integer::longValue).collect(Collectors.toList());
  }
}
