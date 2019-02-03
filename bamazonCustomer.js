var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
var productArray = [];
var purchase;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'M@ryp0ppins',
    database: 'bamazon'
});



function displayResults() {
    connection.query("SELECT product_name FROM products", function (error, results) {
        if (error) throw error;
        for (i = 0; i < results.length; i++) {
            productArray.push(results[i].product_name);
        }
        
        inquirer.prompt([{
            type: "list",
            name: "product",
            message: "What would you like to buy?",
            choices: productArray},
            {
            type: "input",
            name: "quantity",
            message: "How many would you like?"
            }
            
        ]).then(answers => {
            var product = answers.product;
            var quantity = answers.quantity;
            console.log(product);
            console.log(quantity);

        })

        
    });
    connection.end();

}

displayResults();