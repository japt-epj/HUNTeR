package ch.japt.epj.models;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
public class Response {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long responseId;

    @ElementCollection
    private Collection<String> questions = new ArrayList<>();

    @ElementCollection
    private Collection<String> answers = new ArrayList<>();

    @ManyToOne
    private Task task;



    public Collection<String> getAnswers() {
        return answers;
    }

    public void setAnswers(Collection<String> answers) {
        this.answers = answers;
    }

    public Collection<String> getQuestions() {
        return questions;
    }

    public void setQuestions(Collection<String> questions) {
        this.questions = questions;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task department) {
        this.task = task;
    }

    public long getResponseId() {
        return responseId;
    }
}
