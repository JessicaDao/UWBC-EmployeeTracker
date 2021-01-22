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

function start(){
    inquirer.prompt({
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Roles",
            "Add Employees",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "Exit"
        ]
    })
    .then(answer => {
        switch(answer){
            case "View All Employees":
                viewEmployees()
                break;
            case "View All Department":
                viewDepartment()
                break;
            case "View All Roles":
                viewRoles()
                break;
            case "Add Employees":
                addEmployees()
                break;
            case "Add Department":
                addDepartment()
                break;
            case "Add Role":
                addRole()
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

function viewEmployees(){
        
}
function viewDepartment(){

}
function viewRoles(){

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
function updateRole(){
    
}