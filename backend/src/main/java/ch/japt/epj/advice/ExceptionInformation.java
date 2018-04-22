package ch.japt.epj.advice;

public class ExceptionInformation {
    public final String message;
    public final String url;

    public ExceptionInformation(String message, String url) {
        this.message = message;
        this.url = url;
    }
}
