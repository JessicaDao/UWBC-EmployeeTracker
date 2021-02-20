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

// adds departments, roles, and employees
function addDepartment(){
    inquirer.prompt([{
        name: "dName",
        type:"input",
        message: "Enter new department title:"
    }
]).then((ans) => {
    connection.query("INSERT INTO department (name) VALUES (?)", [ans.dName], 
    function (err, res) {
        if (err) {
            throw err
        } else {
            console.log(`${ans.dName} added to departments`);
            start();
        }
    })
})
};

function addRole(){
    const dArr = [];
    connection.query("SELECT id, name FROM department", 
    function (err, res) {
        if (err) {
            throw err
        } else {
            for (let i = 0; i < res.length; i++) {
                const inqObj = {
                    id: res[i].id,
                    name: res[i].name
                }
                dArr.push(inqObj);
            }
    inquirer.prompt([{
        name: "newRole",
        type:"input",
        message: "Enter new role title:"
    },
    {
        name: "newSal",
        type: "input",
        message: "Enter role's salary:"
    },
    {
        name: "dName",
        type: "list",
        message: "Choose a department for the role:",
        choices: dArr
    }
].then((ans) => {
    let dId;
    for (let i = 0; i < res.length; i++) {
        if (dArr[i].name === ans.dName) {
            dId = dArr[i].id;
        }
    }
    connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [ans.newRole, ans.newSal, dId], function (err, res) {
        if (err) {
            throw err
        } else {
            console.log("New role added.");
            start();
        }
    })
})
)}
});

function addEmployees(){
    const rTitle = [];
    const rData = [];
    connection.query("SELECT id, title FROM roles", 
    function (err, res) {
        if (err) {
            throw err
        } else {
            for (let i = 0; i < res.length; i++) {
                const rObj = {};
                rObj.id = res[i].id;
                rObj.title = res[i].title;
                rData.push(rObj);
                rTitle.push(res[i].title);
            }

    const eNames = [];
    const eData = [];
    connection.query("SELECT id, first_name, last_name FROM employee", function (err, res) {
        if (err) {
            throw err
        } else {
            for (let i = 0; i < res.length; i++) {
                const eObj = {};
                eObj.id = res[i].id;
                const firstLastName = `${res[i].first_name} ${res[i].last_name}`;
                eObj.name = firstLastName;
                eData.push(eObj);
                eNames.push(firstLastName);
            }

    inquirer.prompt([{
        name: "first",
        type:"input",
        message: "Employee's first name"
    },
    {
        name: "last",
        type: "input",
        message: "Employee's last name:"
    },
    {
        name: "role",
        type: "list",
        choices: "rTitle",
        message: "Employee's role:"
    },
    {
        name: "manager",
        type: "confirm",
        message: "Work under manager?"
    },
    {
        name: "mName",
        type: "list",
        message: "Select manager's name:",
        choices: eNames,
        when: function (ans) {
            if (ans.manager === true) {
                return true;
            } else {
                return false;
            }
        }
    }
]).then((ans) => {
    let mId;
    for (let i = 0; i < eData.length; i++) {
        if (eData[i].name === ans.mName) {
            mId = eData[i].id;
        }
    }

    let rId;
    for (let i = 0; i < rData.length; i++) {
        if (ans.role === rData[i].title) {
            rId = rData[i].id;
        }
    }

    if (ans.manager = true) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [ans.first, ans.last, rId, mId], function (err, res) {
            if (err) {
                throw err;
            } else {
                console.log("Employee added.")
                start();
            }
        })
    } else {
            connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)", [ans.first, ans.last, rId], function (err, res) {
            if (err) {
                throw err;
            } else {
                console.log("Employee added.");
                start();
            }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
}

// Update Role
function updateRole() {
    const rTitle = [];
    let rData;

    connection.query("SELECT id, title FROM roles", function (err, data) {
        if (err) {
            throw err
        } else {
            for (let i = 0; i < data.length; i++) {
                rTitle.push(data[i].title);
            }
        }

        const eNames = [];
        let eData;
        connection.query("SELECT id, first_name, last_name FROM employee", function (err, res) {
            if (err) {
                throw err
            } else {
                for (let i = 0; i < res.length; i++) {
                    eData = res;
                    const firstLast = `${res[i].first_name} ${res[i].last_name}`;
                    eNames.push(firstLast);
                    rData = res;
                }

                inquirer.prompt([
                    {
                        type: "list",
                        message: "Employee to update:",
                        choices: eNames,
                        name: "employee"
                    },
                    {
                        type: "list",
                        message: "Employee's new role:",
                        choices: rTitle,
                        name: "role"
                    }
                ]).then((ans) => {
                    let rId;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].title === ans.role) {
                            rId = data[i].id;
                        } 

                    }
                    connection.query(`UPDATE employee SET role_id = ? WHERE CONCAT(first_name, " ", last_name) = ?`, [rId, ans.employee], function (err, res) {
                        if (err) {
                            throw err
                        } else {
                            console.log("Employee role updated.");
                            track();
                        }
                    })
                })
            }
        })
    })
};