package ch.japt.epj.helper;

import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.PathNotFoundException;
import java.util.stream.Stream;
import org.springframework.test.util.AssertionErrors;
import org.springframework.test.web.servlet.ResultMatcher;

public class PaginationChecker {
  private static String[] paginationElements =
      new String[] {
        "first", "last", "number", "numberOfElements", "size", "sort", "totalElements", "totalPages"
      };

  private static boolean assertExists(String content, String element) {
    try {
      JsonPath.read(content, element);
      return true;
    } catch (PathNotFoundException e) {
      return false;
    }
  }

  public static ResultMatcher isPaginated() {
    return mvcResult -> {
      String content = mvcResult.getResponse().getContentAsString();
      AssertionErrors.assertTrue("Root object does not exist", assertExists(content, "$"));

      Stream.of(paginationElements)
          .forEach(
              e ->
                  AssertionErrors.assertTrue(
                      String.format("Improper pagination entity, '%s' missing", e),
                      assertExists(content, "$." + e)));
    };
  }
}
