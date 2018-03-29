package ch.japt.epj.api;

public class TestPayload {
    public final double random;

    public TestPayload() {
        this.random = Math.random();
    }

    public TestPayload(double random) {
        this.random = random;
    }
}
