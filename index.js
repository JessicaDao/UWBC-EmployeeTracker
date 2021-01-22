const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "password",
    database: "employees_db"
});

connection.connect(err =>{
    if(err) thorw err;
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
        switch(answer){
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
// view employees, departments, and roles
function viewDepartment(){

}
function viewRoles(){

}
function viewEmployees(){
connection.query(
    "SELECT employee, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager_id from employee JOIN role ON employee.role_id"
)
}
// adds employees, departments and roles
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
        message: "Choose a department for the role."
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