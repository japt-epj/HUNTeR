package ch.japt.epj;

import java.util.UUID;

public class Portfolio {
    private final UUID id;
    private int count;
    private static int counter = 0;
    String putValue;


    public Portfolio() {
        id = UUID.randomUUID();
        count = ++counter;
    }

    public void setValueFromPutCommand() {
        putValue = "Test";
    }

    public String getUuidString() {
        return id.toString();
    }

    @Override
    public String toString() {
        return "Portfolio{" +
                "id=" + id +
                ", count=" + count +
                ", Value putted=" + putValue +
                '}';
    }
}
