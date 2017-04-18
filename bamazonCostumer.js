var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user:"root",
	password: "Apestosa19!",
	database: "bamazon_db"
});

connection.connect(function(err){
	// console.log("You are connected as: " + connection.threadId);
	// console.log("WELCOME TO BAMAZON. WE ARE VERY HAPPY TO HELP YOU EXPEND YOUR MONNEY ON WOTHLESS PRODUCTS");
});


connection.query("SELECT * FROM products", function(err,results){
	if(err) throw err;
	for(i = 0; i < results.length; i++){ 
		console.log(">>> ITEM: " + results[i].item_id + " | PRODUCT " + results[i].product_name + " | DEPARTMET: " + results[i].departament_name + " | PRICE: " + results[i].price +" <<<<<");
	}	
});

mkOrder();

function mkOrder(){
inquirer.prompt([
	{
		type: "input",
		name: "itemNum",
		message: "To order please enter the product Id",
		validate: function(value){
			if(isNaN(value) ==  false){
				return true;
			} else {
				return false;
			}
		}
	}, {
		type:"input",
		name: "units",
		message: "How many units do you want to order?"
	}
]).then(function(answer){
		var qtyOrder = parseInt(answer.units);
		var stock = "SELECT stock_quantity FROM products WHERE ?";
		connection.query(stock, {item_id: answer.itemNum},function(err, results){
			if(err) throw err;
			var inStock = parseInt(results[0].stock_quantity);
			if(answer.units > inStock){
				console.log("Sorry, we can't process your order!!!!!!");
			} else {
				var unstock = inStock - answer.units; 
				var updateStock = "UPDATE products SET ? WHERE?";
				var orderPrice = "SELECT price FROM products WHERE ?";
				connection.query(updateStock,[{stock_quantity: unstock}, {item_id: answer.itemNum}]);
				connection.query(orderPrice, {item_id: answer.itemNum}, function(err, results){
				console.log("Your order total is " + (parseInt(results[0].price) * parseInt(answer.units)));
					
				});
			}

		});
		
});//END OF ANSWERS FUNCTION 
}// END OF MKORDER FUNCTION 

