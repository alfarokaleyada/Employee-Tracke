var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "gw2019gw",
  database: "employees"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});



// function which prompts the user for what action they should take
function start() {
  inquirer
  .prompt({
    name: "employees",
    type: "list",
    message: "Welcome to our employee database! What would you like to do?",
    choices: [
          "View all employees",
          "View all departments",
          "View all roles",
          "Add an employee",
          "Add department",
          "Add a role",
          "Update departemnt",
          "EXIT"
    ]
    })
    .then(function(answer) {

      // based on their answer, either call the bid or the post functions

      switch (answer.employees) {
        case "View all employees":
           viewEmployees();
           break;
        case "View all departments":
           viewDepartments();
           break;
        case "View all roles":
           viewRoles();
           break;
        case "Add an employee":
           addEmployee();
           break;
        case "Add department":
           addDepartment();
           break;
        case "Add a role":
           addRole();
           break;

           case "Update departemnt":
           updateDepartment()
           break;

        case "EXIT":
           endApp();
           break;
        default:
           break;
      }
    });
}

// View all

function viewEmployees(){
  connection.query("SELECT * FROM employe", function(err, res) {
    if (err) throw err;


     console.log(res.length + " employees found!");
     console.table("All Employees:", res);
     start();
  })
}

function viewDepartments(){
  connection.query("SELECT * FROM department", function(err, res) {

     if (err) throw err;


     console.log(res.length + " departments found!");
     console.table("All departments:", res);
     start();
  })
}


function viewRoles(){
  connection.query("SELECT * FROM role", function(err, res) {
     if (err) throw err;


     console.log(res.length + " roles found!");
     console.table("All roles:", res);
     start();
  })
}



// addEmployee() => {
  //    connection.query("SELECT * FROM role", (err, res) => {
  //       if (err) throw err;
  //       inquirer
  //          .prompt([
  //             {
  //                name: "first_name",
  //                type: "input",
  //                message: "Employee’s fist name: ",
  //             },
  //             {
  //                name: "last_name",
  //                type: "input",
  //                message: "Employee’s last name: "
  //             },
  //             {
  //                name: "choice",
  //                type: "rawlist",
  //                choices:() => {
  //                   let roleArray = [];
  //                   for (let i = 0; i < res.length; i++) {
  //                      roleArray.push(res[i].title);
  //                   }
  //                   return roleArray;
  //                },
  //                message: "What is this employee’s role? "
  //             },
  //             ]). then( (answer)=>  {
  //             })
  //    })
  // }


// function to handle posting new items up for 
function addEmployee() {
  // prompt for info about the item being put up for auction

  connection.query("SELECT * FROM role", function(err, res) {
   if (err) throw err;

  inquirer
    .prompt([
        {
            name: "first_name",
            type: "input",
            message: "Employee’s fist name: ",
        },
        {
            name: "last_name",
            type: "input",
            message: "Employee’s last name: "
        },
{
    name: "roles",
    type: "list",
    message: "What is this employee’s role?",
    choices: [
          "Sale",
          "Engineering",

    ]
    } 
      // {
      //   name: "role_id",
      //   type: "input",
      //   message: "What is this employee’s role?",
      //   choices:() => {
      //     let roleArray = [];
      //     for (let i = 0; i < res.length; i++) {
      //        roleArray.push(res[i].title);
      //     }
      //     return roleArray;
      //  },
      // }
    ])


    .then(function(answer) {
      console.log(answer.roles)
      
      // when finished prompting, insert a new item into the db with that info
      connection.query("INSERT INTO employe SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: 1,
          manager_id: 1,

        }),
      
          console.log("Your auction was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        
      });
  });
  
}


function addRole() {
  // prompt for info about the item being put up for auction

  connection.query("SELECT * FROM role", function(err, res) {
   if (err) throw err;
  inquirer
    .prompt([
        {
            name: "title",
            type: "input",
            message: "Employee’s title: ",
        },
        {
            name: "salary",
            type: "input",
            message: "Employee’s salary: "
        },
        {
            name: "department_id",
            type: "list",
            message: "What is this employee’s role?",
            choices: [
                  "1",
                  "2",

            ]
    } 
   
    ])


    .then(function(answer) {
      connection.query("INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: 1,

        }),
      
          console.log("Your auction was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        
      });
  });
  
}


function addDepartment() {
  // prompt for info about the item being put up for auction

  connection.query("SELECT * FROM department", function(err, res) {
   if (err) throw err;
  inquirer
    .prompt([
        {
            name: "name",
            type: "input",
            message: "department's title: ",
        }
    ])

    .then(function(answer) {
      connection.query("INSERT INTO department SET ?",
        {
          name: answer.name,
         
        }),
      
          console.log("Your auction was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        
      });
  });
  
}




function updateDepartment() {

   inquirer
     .prompt([
         {
             name: "name",
             type: "input",
             message: "Update department's title: ",
         },
         {
          id: "id",
          type: "input",
          message: "Update by department's id: ",
      }
     ])
 
     .then(function(answer) {
       connection.query("UPDATE department SET ? WHERE  ?",
        [ {
           name: answer.name,
        },
        {
          id: answer.id
         } ],
         )
        
           console.log("Your auction was created successfully!");
           start();
         
       });
   
   
}


