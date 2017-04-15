var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Apestosa19!",
	database: "bamazon_db"
});

connection.connect(function(err){
	console.log("connected as id. " + connection.threadId);
});


inquirer.prompt ([
	{
		type: "list",
		name: "firstMenu",
		message: "Hello Manager, What do you like to do?",
		choices: [
				"View Products for Sale", 
				"View Low Inventory",
				"Add to Inventory",
				"Add New Product"]
	}
]).then(function(answer){
	switch(answer.firstMenu){
		case "View Products for Sale":
			console.log("============================================================");
			connection.query("SELECT * FROM products", function(err, results){
				for(i = 0; i < results.length; i++){
					console.log(">>Item: " + results[i].item_id +
								" || Product: " + results[i].product_name + 
								" || Department: " + results[i].department_name + 
								" || Price: " + results[i].price + 
								" || Stock: " + results[i].stock_quantity + "<<");
				}
			});
			break;

		case "View Low Inventory":
			console.log("============================================================");
			console.log("yes we are desesperate");
			break;

		case "Add to Inventory":
			console.log("============================================================");
			console.log("spend it, is not ypur money");
			break;

		case "Add New Product":
			console.log("============================================================");
			console.log("suprise us")
			break;
	}

});//end of inquirer prompt function