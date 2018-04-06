package ch.japt.epj.model;


import javax.persistence.*;
import java.util.*;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long taskId;

    private String name;

    @OneToOne
    private Location location;

    @OneToMany
    private Collection<Answer> answers = new ArrayList<>();

    private String question;

    public void addAnswer(Answer answer){
        answers.add(answer);
    }

    public void removeAnswer(Answer answer){
        answers.remove(answer);
    }

    public Collection<Answer> getAnswers() {
        return answers;
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

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
