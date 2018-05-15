package ch.japt.epj.advice;

public class ExceptionInformation {
  public final String message;
  public final String url;
  public final String queryString;
  public final String method;

  public ExceptionInformation(String message, String url, String queryString, String method) {
    this.message = message;
    this.url = url;
    this.queryString = queryString;
    this.method = method;
  }
}
