var mysql = require("mysql");
var inquirer = require("inquirer");
var ctable = require("console.table")
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'M@ryp0ppins',
    database: 'bamazon'
});



function displayResults() {
    connection.query("SELECT * FROM products", function (error, results) {
        if (error) throw error;
        // console.log(results.length);
        for (i = 0; i < results.length; i++) {
            // console.log("ID: " + results[i].item_id + " - " + results[i].product_name + " - Price: " + results[i].price);
            var table = ctable.getTable(results);
            console.log(table);
        }
        
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
            var id = (answers.product);
            //stores the quantity that the user selects
            var quantity = answers.quantity;
            //stores the new value that will update the SQL table with a SET 
            var reduction = (results[id].stock_quantity) - quantity;
            //Tests the database to see if there is enough of the item to purchase from the database
            if (results[id].stock_quantity >= quantity) {
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?;",[reduction,id]); 
                    console.log("\nCongratulations! Your purchase was succesful! \n");
                    console.log("Your total is: " + parseFloat(quantity * results[id].price).toFixed(2) );
                    // console.log(table);
                    connection.end();             
            }   
            else {
                console.log("Sorry, there is insufficient stock for your order.");
                connection.end();
            }
        })

        
    });

}

displayResults();

//Why isn't my 2nd table printing an updated balance?
//why when i run the same purchase through the console does it not reduce the item by the same amount?
//why is my total not summing correctly row 46
