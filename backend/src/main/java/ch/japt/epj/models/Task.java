package ch.japt.epj.models;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long taskId;

    private String name;

    @ElementCollection
    private Collection<String> questions = new ArrayList<>();

    @OneToOne
    private Location location;

    @OneToMany(mappedBy="task")
    private List<Response> responses = new ArrayList<>();



    public void addResponse(Response response){
        responses.add(response);
    }

    public void removeResponse(String response){
        responses.remove(response);
    }
    public Collection<Response> getResponses() {
        return responses;
    }

    public void addQuestion(String question){
        questions.add(question);
    }

    public void removeQuestion(String question){
        questions.remove(question);
    }
    public Collection<String> getQuestions() {
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

    public long getTaskId() {
        return taskId;
    }
}
