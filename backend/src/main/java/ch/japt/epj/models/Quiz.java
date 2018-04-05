package ch.japt.epj.models;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;

@Entity
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private ArrayList<Execution> executions = new ArrayList<>();

    private ArrayList<Task> tasks = new ArrayList<>();

    private School school;

    public Quiz(String name, School school) {
        this.name = name;
        this.school = school;
    }

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
}
