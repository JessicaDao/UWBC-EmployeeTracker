const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "password",
    database: "employee_db"
});

connection.connect(err =>{
    if(err) throw err;
    console.log("connected as id" + connection.threadId);
    start();

})

// the start
function start(){
    inquirer.prompt([
        {
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: [            
            "View All Department",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employees",
            "Update Employee Role",
            "Exit"
        ]
    }])
    .then((answer) => {
        switch(answer.start){
            case "View All Department":
                viewDepartment()
                break;
            case "View All Roles":
                viewRoles()
                break;
            case "View All Employees":
                viewEmployees()
                break;
            case "Add Department":
                addDepartment()
                break;
            case "Add Role":
                addRole()
                break;
            case "Add Employees":
                addEmployees()
                break;
            case "Update Employee Role":
                updateRole()
                break;
            case "Exit":
                connection.exit()
                break;
        }
    })
}

// view departments, roles, and employees
function viewDepartment() {
    connection.query(`SELECT name AS "Department List" FROM department`, function (err, res) {
        if (err) {
            throw err
        } else {
            console.table(res);
            start();
        }
    })
};

function viewRoles() {
    connection.query(`SELECT title AS "Role List" FROM roles`, function (err, res) {
        if (err) {
            throw err
        } else {
            console.table(res);
            start();
        }
    })
};

function viewEmployees() {
    connection.query(`SELECT employee.id, first_name, last_name, department.name AS department, roles.title AS position, salary, manager_id FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id`, function (err, res) {
        if (err) {
            throw err
        } else {
            console.table(res);
            start();
        }
    })
};