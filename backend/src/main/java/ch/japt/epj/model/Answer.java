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

    public long getAnswerId() {
        return AnswerId;
    }

    public void setAnswerId(long answerId) {
        AnswerId = answerId;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}
