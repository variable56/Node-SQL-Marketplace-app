var mysql = require("mysql");
var inquirer = require("inquirer");

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
            console.log("ID: " + results[i].item_id + " - " + results[i].product_name + " - Price: " + results[i].price);
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
            var id = (answers.product);
            var quantity = answers.quantity;
            if (results[id].stock_quantity >= quantity) {
                connection.query("UPDATE products SET stock_quantity = (stock_quantity - ?) WHERE item_id = ?", [quantity,id] , function(err, results2) {
                    // if (err) throw err;
                    console.log("Congratulations! Your purchase is succesful!");
                    console.log(results2[id]);
                    connection.end();
                })
            }
            else {
                console.log("Sorry, there is insufficient stock for your order.");
            }
        })

        
    });
    connection.end();

}

displayResults();