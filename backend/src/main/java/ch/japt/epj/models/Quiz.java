package ch.japt.epj.models;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long quizId;

    private String name;

    @OneToMany
    private Collection<Execution> executions = new ArrayList<>();
    @OneToMany
    private Collection<Task> tasks = new ArrayList<>();

    private School school;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void addExecution(Execution execution){
        executions.add(execution);
    }

    public void removeExecution(Execution execution){
        executions.remove(execution);
    }

    public void addTask(Task task){
        tasks.add(task);
    }

    public void removeTask(Task task){
        tasks.remove(task);
    }

    public School getSchool() {
        return school;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    public long getQuizId() {
        return quizId;
    }
}
