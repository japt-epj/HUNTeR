package ch.japt.epj.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Answer
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long AnwerId;

    private String _answer;

    private boolean _checked;


    public void set_answer(String _answer) {
        this._answer = _answer;
    }

    public String get_answer() {
        return _answer;
    }

    public boolean is_checked() {
        return _checked;
    }

    public void set_checked(boolean _checked) {
        this._checked = _checked;
    }
}
