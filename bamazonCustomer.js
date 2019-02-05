require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
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
            console.table(results);
    
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
            var price = results[idx].price;

            //Tests the database to see if there is enough of the item to purchase from the database
            if (results[idx].stock_quantity >= quantity) {
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?;", [reduction, id], function (error, results) {
                    if (error) throw error;
                    console.log("\nCongratulations! Your purchase was succesful! \n");
                    console.log("\n Your total is: " + parseFloat((quantity * price),2) + "\n");
                    loadTable();

                });

            }
            else {
                console.log("Sorry, there is insufficient stock for your order.");

            }
        })
    })
}

