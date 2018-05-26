package ch.japt.epj.library;

import ch.japt.epj.security.CustomUserDetails;
import org.springframework.security.core.context.SecurityContextHolder;

public final class PersonHandler {
  private PersonHandler() {}

  public static Long getCurrentPersonId() {
    return ((CustomUserDetails)
            SecurityContextHolder.getContext().getAuthentication().getPrincipal())
        .getPersonId();
  }
}
