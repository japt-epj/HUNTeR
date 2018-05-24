package ch.japt.epj.library.pdf;

import java.util.ArrayList;
import java.util.Collection;

public final class StringSplit {
  private StringSplit() {}

  public static Collection<String> lines(String input, int length) {
    ArrayList<String> lines = new ArrayList<>();
    StringBuilder current = new StringBuilder();

    for (String in : input.split(" ")) {
      if (current.length() + in.length() > length) {
        lines.add(current.toString());
        current = new StringBuilder();
      }
      current.append(in);
      current.append(" ");
    }

    lines.add(current.toString());
    return lines;
  }
}
