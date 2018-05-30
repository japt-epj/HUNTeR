package ch.japt.epj.Helper;

import com.jayway.jsonpath.JsonPath;
import java.util.stream.Stream;
import org.springframework.test.util.AssertionErrors;
import org.springframework.test.web.servlet.ResultMatcher;

public class PaginationChecker {
  private static String[] paginationElements =
      new String[] {
        "first", "last", "number", "numberOfElements", "size", "sort", "totalElements", "totalPages"
      };

  public static ResultMatcher paginated() {

    return mvcResult -> {
      String content = mvcResult.getResponse().getContentAsString();
      AssertionErrors.assertTrue("Root element exists", JsonPath.read(content, "$") != null);
      Stream.of(paginationElements)
          .forEach(
              e -> AssertionErrors.assertTrue(e + "existss", JsonPath.read(content, e) != null));
    };
  }
}
