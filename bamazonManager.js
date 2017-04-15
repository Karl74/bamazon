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

// /////FIRST CASE  VIEW PRODUCTS  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		case "View Products for Sale":
			console.log("==============================================================================");
			connection.query("SELECT * FROM products", function(err, results){
				for(i = 0; i < results.length; i++){
					console.log(">>Item: " + results[i].item_id +
								" || Product: " + results[i].product_name + 
								" || Department: " + results[i].department_name + 
								" || Price: " + results[i].price + 
								" || Stock: " + results[i].stock_quantity + "<<");
				}
			});
			console.log("==============================================================================");
			break;

// ///// SECOND  CASE  VIEW LOW INVENTORY //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		case "View Low Inventory":
			console.log("==============================================================================");
			var lowStockQ = "SELECT * FROM products WHERE stock_quantity < 50";
			connection.query(lowStockQ, function(err, results){
				for(i = 0; i < results.length; i++){
					console.log(">>Item: " + results[i].item_id +
								" || Product: " + results[i].product_name + 
								" || Department: " + results[i].department_name + 
								" || Price: " + results[i].price + 
								" || Stock: " + results[i].stock_quantity + "<<");
				}
			});
			console.log("==============================================================================");
			break;

// ///// THIRD  CASE  VIEW LOW INVENTORY //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		case "Add to Inventory":
			
			console.log("==============================================================================");
			connection.query("SELECT item_id, product_name FROM products", function(err, results){
				for(i = 0; i < results.length; i++){
					console.log(">>Item: " + results[i].item_id +
								" || Product: " + results[i].product_name + "<<");
				}


			});//end of query function 

			inquirer.prompt([
					{
						type: "input",
						name: "itemId",
						message: "Select Item Id to add Inventory",
						validate: function(value) {
							if (isNaN(value) == false){
								return true;
							}else {
								return false;
							}
						}//end of validate function
					}, {
						type: "input",
						name: "addUnits",
						message: "How many units do you want to add",
						validate: function (value){
							if(isNaN(value) == false){
								return true;
							} else {
								return false;
							}
						}// end of second validation
					}

				]).then(function(answer){
					console.log(answer.itemId);

				});//end of the prompt function 
			console.log("==============================================================================");
			break;

		case "Add New Product":
			console.log("==============================================================================");
			console.log("suprise us");
			console.log("==============================================================================");
			break;
	}

});//end of inquirer prompt function