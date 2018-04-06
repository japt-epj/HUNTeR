INSERT INTO answer (answer, checked) VALUES
  ('42 is a number', true),
  ('Something else', false),
  ('Dober Männer', false),
  ('Cocker Spaniels', false),
  ('Schäfer Hunde', true),
  ('Riesen Schnauzer', false),
  ('...einen draufmachen', false),
  ('...die Nacht durchzechen', false),
  ('...die Sau rauslassen', true),
  ('...auf die Kacke hauen', false);



INSERT INTO task (name, question) VALUES
  ('Question 1', 'What is 42?'),
  ('Question 2', 'Seit jeher haben die meisten...'),
  ('Question 3', 'Wenn das Wetter gut ist, wird der Brauer bestimmt den Eber, das Ferkel und...');

-- something something table
INSERT INTO task_answers (answers_answer_id, task_task_id) VALUES
  (1, 1),
  (2, 1),
  (3, 2),
  (4, 2),
  (5, 2),
  (6, 2),
  (7, 3),
  (8, 3),
  (9, 3),
  (10, 3);
