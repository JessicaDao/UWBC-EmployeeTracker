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
    inquirer.prompt({
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
    })
    .then(answer => {
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
            track();
        }
    })
};

function viewRoles() {
    connection.query(`SELECT title AS "Role List" FROM roles`, function (err, res) {
        if (err) {
            throw err
        } else {
            console.table(res);
            track();
        }
    })
};

function viewEmployees() {
    connection.query(`SELECT employee.id, first_name, last_name, department.name AS department, roles.title AS position, salary, manager_id FROM employee JOIN roles ON employee.roles_id = roles.id JOIN department ON roles.department_id = department.id`, function (err, res) {
        if (err) {
            throw err
        } else {
            console.table(res);
            track();
        }
    })
};



// adds departments, roles, and employees
function addDepartment(){
    inquirer.prompt([{
        name: "department",
        type:"input",
        message: "Enter new department title:"
    }
])
}
function addRole(){
    inquirer.prompt([{
        name: "title",
        type:"input",
        message: "Enter new role title:"
    },
    {
        name: "salary",
        type: "input",
        message: "Enter role's salary:"
    },
    {
        name: "Department",
        type: "list",
        message: "Choose a department for the role.",
        choices: ""
    }
])
}
function addEmployees(){
    inquirer.prompt([{
        name: "firstName",
        type:"input",
        message: "What is the emmployee's first name?"
    },
    {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
    },
    {
        name: "role",
        type: "input",
        message: "What is the employee's role?"
    }
])
}
// role update
function updateRole(){
    
}