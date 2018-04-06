package ch.japt.epj.model;

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

    private Date date;

    private Time time;

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

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getExecutionId() {
        return executionId;
    }
}
