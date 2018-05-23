package ch.japt.epj.model.data;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

public class AuthenticationStatus {

  private final String header;
  private final HttpStatus status;
  private final RoleName role;

  public AuthenticationStatus(Boolean hunter, RoleName role) {
    this.header = hunter ? "X-HUNTeR-Redirect" : "Location";
    this.status = hunter ? HttpStatus.OK : HttpStatus.FOUND;
    this.role = role;
  }

  public HttpStatus getStatus() {
    return status;
  }

  public HttpHeaders getHeaders() {
    HttpHeaders headers = new HttpHeaders();
    headers.add(header, role.getPath());
    return headers;
  }
}
