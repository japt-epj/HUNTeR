package ch.japt.epj.library;

import javax.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Sort;

public final class SortParameterHandler {
  private SortParameterHandler() {}

  /**
   * Parses sort parameter, and implicitly throws an IllegalArgumentException if the parameter
   * cannot be parsed properly. The provided name has to correspond to the property name in the
   * actual model class, and not in the DTO provided to the front-end.
   *
   * <p>Allowed sort direction values are "asc" and "desc". Examples: {@code
   * "?sort=exerciseId,desc"} {@code "?sort=name"} {@code "?sort=question,asc"}
   *
   * @param parameter Sort options
   * @return Parsed Sort object for use when fetching data
   * @see ch.japt.epj.advice.ControllerExceptionHandler#handleInvalidArgument(HttpServletRequest,
   *     IllegalArgumentException) for information on the error handler if parameter parsing throws
   *     an exception.
   */
  public static Sort makeSort(String parameter) {
    String[] split = parameter.split(",");
    Sort.Direction direction = Sort.DEFAULT_DIRECTION;

    if (split.length > 1) {
      direction = Sort.Direction.fromString(split[1]);
    }

    return new Sort(direction, split[0]);
  }
}
