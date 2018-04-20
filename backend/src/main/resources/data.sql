INSERT INTO answer (answer, checked) VALUES
  ('Dober Männer', false),
  ('Cocker Spaniels', false),
  ('Schäfer Hunde', true),
  ('Riesen Schnauzer', false),
  ('...einen draufmachen', false),
  ('...die Nacht durchzechen', false),
  ('...die Sau rauslassen', true),
  ('...auf die Kacke hauen', false),
  ('der Regen zuschaut', false),
  ('das Klima auf der Bank sitzt', false),
  ('der Schnee dabei ist', false),
  ('das Wetter mitspielt', true),
  ('Verpeilte', false),
  ('Durchgeknallte', false),
  ('Wahnsinnige', false),
  ('Irre', true),
	('Kauf rausch', false),
  ('Wasch zwang', false),
  ('Spiel sucht', true),
  ('Alkohol abhängigkeit', false),
  ('Das gibt Ärger!', false),
  ('Das wird Folgen haben!', true),
  ('Wir sprechen uns noch!', false),
  ('Das wirst du bereuen!', false),
  ('Weichei', false),
  ('Heulsuse', false),
  ('Waschlappen', true),
  ('Schlappschwanz', false),
  ('Schien Beine', false),
  ('Knie Scheiben', false),
  ('Hüft Gelenke', false),
  ('Schulter Blätter', true),
  ('zärtlich verschmust', false),
  ('auf Wolke 7', false),
  ('Hand in Hand', true),
  ('wild knutschend', false),
  ('Anbaggern', false),
  ('Rumkriegen', false),
  ('Flachlegen', false),
  ('Besteigen', true);



INSERT INTO exercise (name, question) VALUES
  ('Tiere', 'Seit jeher haben die meisten...'),
  ('Natur und Umwelt', 'Wenn das Wetter gut ist, wird der Brauer bestimmt den Eber, das Ferkel und...'),
  ('Natur und Umwelt', 'Mit dem Picknick im Grünen wird es meist nur dann etwas, wenn...'),
  ('Strassenverkehr.', 'Auch ein Navi führt manchmal in die...?'),
  ('Kind und Kegel', 'Hält der Bengel im Kinderzimmer einfach keine Ordnung, darf er sich auch nicht wundern, wenn er ständig irgendein...?'),
  ('Zitate', 'Was steht zu erwarten, wenn eine Fernsehserie erfolgreich gestartet ist?'),
  ('Hygiene', '50 Euro! „Wer“ kommt häufig bei der Körperpflege zum Einsatz'),
  ('Anatomie', 'Wer sich durch einen unwegsamen Laubwald kämpft, der streift bestimmt auch mit der...?'),
  ('Arbeitswelt', 'Sind sie gute Kollegen, arbeiten auch die härtesten Machos..?'),
  ('Sexualkunde', 'Was machte Reinhold Messner mit dem Mount Everest?');

 INSERT INTO person (email, first_name, is_creator, last_name) VALUES
   ('tobias.saladin@hsr.ch', 'Tobias', true, 'Saladin'),
   ('pascal.huerlimann@hsr.ch', 'Pascal', true, 'Hürlimann'),
   ('andi.hoerler@hsr.ch', 'Andi', true, 'Hörler'),
   ('jonas.kugler@hsr.ch', 'Jonas', true, 'Kugler');


-- something something table
INSERT INTO exercise_answer_templates (answer_templates_answer_id, exercise_exercise_id) VALUES
  (1,1),
  (2,1),
  (3,1),
  (4,1),
  (5,2),
  (6,2),
  (7,2),
  (8,2),
  (9,3),
  (10,3),
  (11,3),
  (12,3),
  (13,4),
  (14,4),
  (15,4),
  (16,4),
  (17,5),
  (18,5),
  (19,5),
  (20,5),
  (21,6),
  (22,6),
  (23,6),
  (24,6),
  (25,7),
  (26,7),
  (27,7),
  (28,7),
  (29,8),
  (30,8),
  (31,8),
  (32,8),
  (33,9),
  (34,9),
  (35,9),
  (36,9),
  (37,10),
  (38,10),
  (39,10),
  (40,10);

;

INSERT INTO role (name) VALUES
  ('ROLE_TEACHER'),
  ('ROLE_STUDENT');

INSERT INTO person_role (person_id, role_id) VALUES
  (1,1),
  (2,1),
  (3,2),
  (4,2);