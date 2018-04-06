package ch.japt.epj.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Answer
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long AnswerId;

    private String answer;

    private boolean checked;


    public void set_answer(String answer) {
        this.answer = answer;
    }

    public String get_answer() {
        return answer;
    }

    public boolean is_checked() {
        return checked;
    }

    public void set_checked(boolean checked) {
        this.checked = checked;
    }
}
