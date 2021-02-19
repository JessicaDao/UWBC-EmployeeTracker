USE employee_db;

INSERT INTO department (name)
VALUES ("HR"),
("Accounting"),
("IT")

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 80000, 1),
("HR", 70000, 2),
("IT", 90000, 3),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 1),
("Jane", "Doe", 2, 2);
