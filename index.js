const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const db = require('./server.js');
// const inquirer = require("inquirer-promise");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mainOption = [
  {
    type: "list",
    name: "choice",
    message: "Choose one of the following:",
    choices: ["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"
    ],
  }
]

const newDepartment = [
  {
    type: "input",
    name: "nameDepartment",
    message: "Type in the new department: "
  }
]

const newRole = [
  {
    type: "input",
    name: "title",
    message: "Type in the name of the role: "
  },
  {
    type: "input",
    name: "salary",
    message: "Type in the salary of the role: "
  },
  {
    type: "input",
    name: "department",
    message: "Type in the id of the department for the role: "
  }
]

const newEmployee = [
  {
    type: "input",
    name: "first_name",
    message: "Type in the first name of the employee: "
  },
  {
    type: "input",
    name: "last_name",
    message: "Type in the last name of the employee: "
  },
  {
    type: "input",
    name: "role_id",
    message: "Type in the role id of the employee: "
  },
  {
    type: "input",
    name: "manager_id",
    message: "Type in the manager id of the employee: "
  }
]

const updateEmployeeQuest = [
  {
    type: "input",
    name: "first_name",
    message: "Type in the first name of the employee that you want to update: "
  },
  {
    type: "input",
    name: "last_name",
    message: "Type in the last name of the employee that you want to update: "
  },
  {
    type: "input",
    name: "role_id",
    message: "Type in the role id: "
  },
  {
    type: "input",
    name: "manager_id",
    message: "Type in the manager_id: "
  }
]

// function chosenChoice(choice) {
//   switch (choice) {
//     case "View all Departments":
//       viewDepartment();
//       break;
//     case "View all Roles":
//       viewRoles();
//       break;
//     case "View all Employees":
//       viewEmployees();
//       break;
//     case "Add a Department":
//       addDepartment();
//       break;
//     case "Add a Role":
//       addRole();
//       break;
//     case "Add an Employee":
//       addEmployee();
//       break;
//     case "Update an Employee Role":
//       updateEmployee();
//       break;
//   }
//   // start();
//   main();
// }

const chosenChoice = (choice) => {
  if (choice == "View all Departments") {
    viewDepartment();
  }
  else if (choice == "View all Roles") {
    viewRoles();
  }
  else if (choice == "View all Employees") {
    viewEmployees();
  }
  else if (choice == "Add a Department") {
    addDepartment();
  }
  else if (choice == "Add a Role") {
    addRole();
  }
  else if (choice == "Add an Employee") {
    addEmployee();
  }
  else if (choice == "Update an Employee Role") {
    updateEmployee();
  }
}

const viewDepartment = async() => {
  console.log('viewDepartment');

  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    main();
  })
}

const viewRoles = async() => {
  console.log('viewRoles');

  db.query('SELECT * FROM role', function (err, results) {
    console.table(results);
    main();
  })
}

const viewEmployees = async() => {
  console.log('viewEmployees');

  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
    main();
  })
}

const addDepartment = async () => {
  console.log('addDepartment');

  await inquirer.prompt(newDepartment).then(data => {
    let answer = data.nameDepartment;

    db.query(`INSERT INTO company_db.department (name) VALUES (?)`, `${answer}`, (err, result) => {
      if (err) {
        console.log(err);
        main();
      }
      console.log(`Added ${answer} into DB`);
      main();
    });
  })
}

const addRole = async() => {
  console.log('addRole');

  await inquirer.prompt(newRole).then(data => {
    console.log(data);
    let title = data.title;
    let salary = data.salary;
    let department_id = data.department;

    db.query(`INSERT INTO company_db.role (title, salary, department_id) VALUES ('${title}', ${salary}, ${department_id})`, (err, result) => {
      if (err) {
        console.log(err);
        main();
      }
      console.log(`Added ${title} into DB`);
      main();
    })
  })
}

const addEmployee = async() => {
  console.log('addEmployee');

  await inquirer.prompt(newEmployee).then(data => {
    console.log(data);
    let first_name = data.first_name;
    let last_name = data.last_name;
    let role_id = data.role_id;
    let manager_id = data.manager_id;

    db.query(`INSERT INTO company_db.employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id})`, (err, result) => {
      if (err) {
        console.log(err);
        main();
      }
      console.log(`Added ${first_name} ${last_name} into DB`);
      main();
    })
  }
)}

const updateEmployee = async() => {
  console.log('UpdateEmployee');

  await inquirer.prompt(updateEmployeeQuest).then(data => {
    let first_name = data.first_name;
    let last_name = data.last_name;
    let role_id = data.role_id;
    let manager_id = data.manager_id;

    db.query(`UPDATE company_db.employee SET role_id = '${role_id}', manager_id = '${manager_id}' WHERE first_name = '${first_name}' AND last_name = '${last_name}'`), (err, result) => {
      if (err) {
        console.log(err);
        main();
      }
      console.log('Updated data.');
      main();
    }
  }
  )
}

// async function start() {
//   await inquirer.prompt(mainOption).then(data => {
//     console.log(data.choice);
//     let answer = data.choice;

//     chosenChoice(answer);

//   })
// }

// start();

const main = async() => {
  await inquirer.prompt(mainOption).then(data => {
    console.log(data.choice);
    let answer = data.choice;

    chosenChoice(answer);
  })
}

main();