package ch.japt.epj.models;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Response {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private List<String> questions;

    private List<String> answers;

    @ManyToOne
    private Task task;


    public Response(ArrayList<String> questions, ArrayList<String> Answers) {
        this.questions = questions;
        this.answers = Answers;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }

    public List<String> getQuestions() {
        return questions;
    }

    public void setQuestions(List<String> questions) {
        this.questions = questions;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task department) {
        this.task = task;
    }
}
