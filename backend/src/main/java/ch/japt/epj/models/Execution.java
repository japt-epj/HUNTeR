package ch.japt.epj.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;

//@Entity
public class Execution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Date date;

    private Time time;

    private ArrayList<Person> participants = new ArrayList<>();


    public Execution(Date date, Time time) {
        this.date = date;
        this.time = time;
    }

    public void addParticipant(Person person){
        participants.add(person);
    }

    public void removeParticipant(Person person){
        participants.remove(person);
    }

    public ArrayList<Person> getParticipants(){
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
}