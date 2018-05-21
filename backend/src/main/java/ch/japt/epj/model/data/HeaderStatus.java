package ch.japt.epj.model.data;

import org.springframework.http.HttpStatus;

// rename this to authentication status and have routings in here?
public class HeaderStatus {

  private final String header;
  private final HttpStatus status;
  private final RoleName role;

  public HeaderStatus(Boolean hunter, RoleName role) {
    this.header = hunter ? "X-HUNTeR-Redirect" : "Location";
    this.status = hunter ? HttpStatus.OK : HttpStatus.FOUND;
    this.role = role;
  }

  public String getHeader() {
    return header;
  }

  public HttpStatus getStatus() {
    return status;
  }

  public String getPath() {
    return role.getPath();
  }
}
