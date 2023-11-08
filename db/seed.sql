USE company_db;

INSERT INTO department (name)
	VALUES ("Human Resources"),
		   ("Finance"),
           ("Sales"),
           ("Marketing"),
           ("Engineering"),
           ("Management"),
           ("Quality Assurance"),
           ("Operations Management"),
           ("Resarch and Development"),
           ("Business Development"),
           ("Product Management"),
           ("Risk Management"),
           ("Asset Management"),
           ("Inventory/Merchandise");
           
INSERT INTO role(title, salary, department_id)
	VALUES ("Marketing Manager", 85000, 4),
		   ("Product Manager", 70000, 11),
           ("Finance Manager", 80000, 2),
           ("Human Resources Manager", 80000, 1),
           ("Marketing Specialist", 65000, 4),
           ("Busniess Analyst", 67000, 10),
           ("Human Resource Personnel", 60000, 1),
           ("Accountant", 55000, 3),
           ("Customer Service Represent", 45000, 14);
           
SET FOREIGN_KEY_CHECKS = 0;
           
INSERT INTO employee(first_name, last_name, role_id, manager_id)
	VALUE ("Walter", "Hemmington", 1, null),
		  ("Henry", "Smith", 2, null),
          ("John", "Waller", 3, null),
          ("Mary", "Johnson", 4, null),
          ("Tom", "Albertson", 5, 1),
          ("Stan", "Yeller", 6, null),
          ("Luke", "Shiny", 7, 4),
          ("Lisa", "Wells", 8, 3),
          ("Ronald", "Haber", 9, 2),
          ("Joe", "King", 4, null),
          ("Sam", "Warring", 1, null),
          ("Tim", "Quake", 5, 1),
          ("Zack", "Rover", 6, 3);