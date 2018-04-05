package ch.japt.epj.models;

import org.hibernate.validator.constraints.Email;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;

//@Entity
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;

    private String lastName;

    private boolean isCreator;

    private Email email;

    private ArrayList<School> schools = new ArrayList<>();

    private ArrayList<Quiz> quizes = new ArrayList<>();

    protected Person() {
    }

    public Person(String firstName, String lastName, boolean isCreator, Email email) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.isCreator = isCreator;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastName() {
        return lastName;
    }

    @Override
    public String toString() {
        return firstName + " " + lastName;
    }


    public Email getEmail() {
        return email;
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public boolean isCreator() {
        return isCreator;
    }

    public void setCreator(boolean creator) {
        isCreator = creator;
    }

    public void addSchool(School school){
        schools.add(school);
    }

    public void removeSchool(School school){
        schools.remove(school);
    }

    public void addQuizes(Quiz quiz){
        quizes.add(quiz);
    }

    public void removeQuizes(Quiz quiz){
        quizes.remove(quiz);
    }
}
