package ch.japt.epj.model.data;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.*;

@Entity
public class Person {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long personId;

  private String firstName;

  private String lastName;

  private boolean isCreator;

  private String email;

  private String password;

  @ManyToMany(mappedBy = "persons", fetch = FetchType.EAGER)
  private Collection<School> schools = new ArrayList<>();

  @OneToMany private Collection<Quiz> quizzes = new ArrayList<>();

  @ManyToMany
  @JoinTable(
    name = "PersonRole",
    joinColumns = {@JoinColumn(name = "personId")},
    inverseJoinColumns = {@JoinColumn(name = "roleId")}
  )
  private Collection<Role> roles = new ArrayList<>();

  public Person() {}

  public Person(String firstName, String lastName, String email, String password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  public long getPersonId() {
    return personId;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  @Override
  public String toString() {
    return firstName + " " + lastName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public boolean isCreator() {
    return isCreator;
  }

  public void setCreator(boolean creator) {
    isCreator = creator;
  }

  public void addSchool(School school) {
    schools.add(school);
  }

  public void removeSchool(School school) {
    schools.remove(school);
  }

  public void addQuiz(Quiz quiz) {
    quizzes.add(quiz);
  }

  public void removeQuiz(Quiz quiz) {
    quizzes.remove(quiz);
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Collection<Role> getRoles() {
    return roles;
  }

  public void setRoles(Collection<Role> roles) {
    this.roles = roles;
  }
}
