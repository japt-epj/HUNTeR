package ch.japt.epj.model.data;

import javax.persistence.*;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Entity
public class Execution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long executionId;

    private String name;

    private Date startDate;

    private Date endDate;

    @OneToMany
    private Collection<Person> participants = new ArrayList<>();


    public void addParticipant(Person person){
        participants.add(person);
    }

    public void removeParticipant(Person person){
        participants.remove(person);
    }

    public Collection<Person> getParticipants(){
        return participants;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Time endDate) {
        this.endDate = endDate;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public long getExecutionId() {
        return executionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
