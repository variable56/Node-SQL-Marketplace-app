# Node-SQL-Marketplace-app

##Overview

This is a command line interface program that simulates a retail inventory management software. It takes user inputs on what they want to buy as well as the quantity they want to purchase.  If there is enough stock on hand within the SQL database that the javascript file is connecting to, it will allow the purchase to go through and display a message and total.

##Installation

In order to get the program working on a local computer you will need to create a sql table called "bamazon" that has a "products" table within it.  Below is a list of column names and datatypes for each of the columns:

item_id INT AUTO_INCREMENT PRIMARY KEY
product_name VARCHAR
department_name VARCHAR
price DECIMAL (2 Places)
stock_quantity INT

##Dependencies

The following npm packages will be installed using the terminal:

-mysql
-inquirer

you will also need to add a .env file and store your password within the file.  Your .env file should have this as the first line:

password=YOUR_PASSWORD_HERE

##WORKING VERSION

The following is a link of the working version:

https://drive.google.com/file/d/1aeIxMHKLGDu_dmVbac328ecZBOLvEgb5/view