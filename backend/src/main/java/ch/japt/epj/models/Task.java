package ch.japt.epj.models;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    
    private ArrayList<String> questions = new ArrayList<>();

    private Location location;

    @OneToMany
    private ArrayList<Response> responses = new ArrayList<>();


    public Task(String name, Location location) {
        this.name = name;
        this.location = location;
    }


    public void addResponse(Response response){
        responses.add(response);
    }

    public void removeResponse(String response){
        responses.remove(response);
    }
    public ArrayList<Response> getResponses() {
        return responses;
    }

    public void addQuestion(String question){
        questions.add(question);
    }

    public void removeQuestion(String question){
        questions.remove(question);
    }
    public ArrayList<String> getQuestions() {
        return questions;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
