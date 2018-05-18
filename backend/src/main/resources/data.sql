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
  ('Besteigen', true),
  ('Flirten', false),
  ('anbaggern', false),
  ('Bräute aufreissen', false),
  ('Rum machen', true),
  ('Sonicht', false),
  ('Soja', true),
  ('Soschoneher', false),
  ('Sovielleicht', true),
  ('mit Schulden', false),
  ('knietief im Dispo', false),
  ('in der Kreide', true),
  ('auf Pump', false);


INSERT INTO exercise (name, question) VALUES
  ('Tiere', 'Seit jeher haben die meisten...'),
  ('Natur und Umwelt', 'Wenn das Wetter gut ist, wird der Brauer bestimmt den Eber, das Ferkel und...'),
  ('Natur und Umwelt', 'Mit dem Picknick im Grünen wird es meist nur dann etwas, wenn...'),
  ('Strassenverkehr', 'Auch ein Navi führt manchmal in die...?'),
  ('Kind und Kegel', 'Hält der Bengel im Kinderzimmer einfach keine Ordnung, darf er sich auch nicht wundern, wenn er ständig irgendein...?'),
  ('Zitate', 'Was steht zu erwarten, wenn eine Fernsehserie erfolgreich gestartet ist?'),
  ('Hygiene', '50 Euro! „Wer“ kommt häufig bei der Körperpflege zum Einsatz'),
  ('Anatomie', 'Wer sich durch einen unwegsamen Laubwald kämpft, der streift bestimmt auch mit der...?'),
  ('Arbeitswelt', 'Sind sie gute Kollegen, arbeiten auch die härtesten Machos..?'),
  ('Sexualkunde', 'Was machte Reinhold Messner mit dem Mount Everest?'),
  ('Kulturgüter', 'Eines muss man den Karibikbewohnern wirklich lassen: Sie können gut...'),
  ('Kulturgüter', 'Was kommt in Ostasien häufig auf den Tisch?'),
  ('Tiere', 'Die Dinosaurier lebten...?');

INSERT INTO location (lat, lng) VALUES
  (47.22375196850436, 8.817536830902101),
  (47.222367088752726, 8.81709158420563),
  (47.22379202212541, 8.816796541213991),
  (47.22363578331323, 8.815970420837404),
  (47.223621120092204, 8.81808400154114),
  (47.22324232605475, 8.818652629852297),
  (47.222367088752726, 8.81709158420563),
  (47.22313229775402, 8.816512227058412),
  (47.22272826099045, 8.817917704582216),
  (47.22386145792592, 8.815600275993349);

INSERT INTO quiz (name) VALUES
  ('Natur'),
  ('Tiere'),
  ('Kulturgüter'),
  ('Biologie'),
  ('Nahkampf'),
  ('StGB'),
  ('Informatik'),
  ('Geologie');

INSERT INTO person (email, first_name, last_name, is_creator, password) VALUES
   ('tobias.saladin@hsr.ch', 'Tobias', 'Saladin', true, '$2a$10$bX/vYIFp2BExRL6PkHTTq.3IKmFDLNHlcG0BdaxM/PHj1W.oF4MIO'),
   ('pascal.huerlimann@hsr.ch', 'Pascal', 'Hürlimann', true, '$2a$10$MwHE9md.qMTJwOe5H6eGW.NK5Rf7vuyMLgr6JTcICzfu7DJDAEPGu'),
   ('andi.hoerler@hsr.ch', 'Andi', 'Hörler', true, '$2a$10$7l.gQY32/wsh57CWMxqocOC5/VYhV1sgoIgpamm.6ddcF8TOReA5K'),
   ('jonas.kugler@hsr.ch', 'Jonas', 'Kugler', true, '$2a$10$jKbp1Nbr60qVcezROc/FV.29QWf8YJwzGc1WNpTr3LqyJAO8LH/62'),
   ('dolores.abernathy@host.westworld.com', 'Dolores','Abernathy', false, '$2a$10$xVKf.oFxw0f1QQLO2unmgOIUQUIPieRcJJCvCAmuFwdDSo3tofZ7.'),
   ('maeve.millay@host.westworld.com', 'Maeve','Millay', false, '$2a$10$2iKDV5glfo4DXcoIEY3laOIfhRkfj3jANSkibEgh9dQ9YEJuRSrs6'),
   ('bernard.lowe@host.westworld.com','Bernard','Lowe', false, '$2a$10$WRJZSpoIl7/mngWlEuhfPe4S4u4LG9OFU.JeVFZ.7QmNRGtV6YPQ2'),
   ('arnold.weber@creator.westworld.com','Arnold','Weber',false, '$2a$10$t1gmxCL.MzQqbJMttwRi4OPjdUd8HIT87ERUziNcQDEwytuCgqR/.'),
   ('robert.ford@creator.westworld.com','Robert','Ford', false, '$2a$10$gAshn0JiODtOi0fg84UNIuH0pfH8eqY6ViKOGMbo5uvk53iLPUB9i'),
   ('root@personOfInterest.com','Samantha','Grove',false,'$2a$10$gn78WzxfgdvSgnfv/euc/..6ZGCV5ueYkHrIUfUL364QheaS2jzKq'),
   ('john.reese@personOfInterest.com', 'John','Reese',false,'$2a$10$O5j15J4DxZPE/1kNx15ChuqmS/9A.ppdGe.7rv16RJQub1JYmYXP6'),
   ('harold.finch@personOfInterest.com','Harold','Finch',false,'$2a$10$54DvLjIurOVuDhonIRRc7OggyqEOCa28j1nmPI0ZYSTfLmGeaDYZu'),
   ('sameen.shaw@personOfInterest.com','Sameen','Shaw',false,'$2a$10$LxwyiGiVYDnxBpiBIPEoSOdx3pIepvpUUZ5aHx/RV7OlDcb78j7eW'),
   ('lionel.fusco@personOfInterest.com','Lionel','Fusco',false,'$2a$10$mZKhymmDF6CLq8sB.5lwo.sXj21n.n4lmADQO88A9fimldR0WFxsm'),
   ('machine@personOfInterest.com','Ernest','Thornhill',false,'$2a$10$iPhvq8dSQhEpj/AjrSxnpOVCzMimo4gumUeVTxFPFmGTjDlTZODQy');



-- something something table
INSERT INTO quiz_exercise (quiz_id, exercise_id) VALUES
  (1,2),
  (1,3),
  (2,1),
  (2,2),
  (2,13),
  (3,11),
  (3,12);

--INSERT INTO location_exercise (location_id, exercise_id) VALUES
--  (1,1),
--  (2,2),
--  (3,3),
--  (4,4),
--  (5,5),
--  (6,6),
--  (7,7),
--  (8,8),
--  (9,9),
--  (10,10),
--  (1,11),
--  (2,12),
--  (3,13);

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
  (40,10),
  (41,11),
  (42,11),
  (43,11),
  (44,11),
  (45,12),
  (46,12),
  (47,12),
  (48,12),
  (49,13),
  (50,13),
  (51,13),
  (52,13);

INSERT INTO role (name) VALUES
  ('ROLE_TEACHER'),
  ('ROLE_STUDENT');

INSERT INTO person_role (person_id, role_id) VALUES
  (1,1),
  (2,1),
  (3,2),
  (4,2);
