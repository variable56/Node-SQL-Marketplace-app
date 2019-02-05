require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var ctable = require("console.table");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: process.env.password,
    database: 'bamazon'
});
// console.log(process);



loadTable();




function loadTable() {
    connection.query("SELECT * FROM products", function (error, results) {
        if (error) throw error;
        // console.log(results);
        // for (i = 0; i < results.length; i++) {
        //     var table = ctable.getTable(results);
            console.table(results);
        // }
        //begins the user prompts using the inquirer package (Object of questions)
        inquirer.prompt([{
            type: "input",
            name: "product",
            message: "What is the Id of the product you would you like to buy?",
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like?"
        }

        ]).then(answers => {
            //stores the variable for the product that the user selects
            var id = parseInt(answers.product);
            var idx = id-1
            //stores the quantity that the user selects
            var quantity = answers.quantity;

            //stores the new value that will update the SQL table with a SET 
            var reduction = (results[idx].stock_quantity) - quantity;

            //Tests the database to see if there is enough of the item to purchase from the database
            if (results[idx].stock_quantity >= quantity) {
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?;", [reduction, id], function (error, results) {
                    if (error) throw error;
                    console.log("\nCongratulations! Your purchase was succesful! \n");
                    // console.log("Your total is: " + parseFloat(quantity * results[4].price).toFixed(2) + "\n");
                    // console.log(results);
                    loadTable();

                });

            }
            else {
                console.log("Sorry, there is insufficient stock for your order.");

            }
        })
    })
}

// displayResults();

//Why isn't my 2nd table printing an updated balance?
//why when I run the same purchase through the console does it not reduce the item by the same amount?
//why is my total not summing correctly row 46? It's like it is deducting another id from the table.
