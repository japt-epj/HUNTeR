package ch.japt.epj.library.pdf;

import java.util.ArrayList;
import java.util.Collection;

public final class StringSplit {
  private StringSplit() {}

  /**
   * Splits input into lines that are shorter than length. Only splits on words delimited by spaces,
   * meaning that resulting lines aren't just split anywhere.
   *
   * @param input String to split into block of text
   * @param length Maximum length of individual lines
   * @return Collection of lines, maximum length per line is length
   */
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
