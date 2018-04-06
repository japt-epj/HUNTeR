INSERT INTO answer (answer, checked) VALUES
  ('42 is a number', true),
  ('Something else', false);

INSERT INTO task (name, question) VALUES
  ('Question 1', 'What is 42?');

-- something something table
INSERT INTO task_answers (answers_answer_id, task_task_id) VALUES
  (1, 1),
  (2, 1);
