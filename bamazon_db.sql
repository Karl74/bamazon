create database bamazon_db;
 USE  bamazon_db;
 
CREATE table products(
item_id integer (10) not null auto_increment,
product_name varchar(100) not null,
departament_name varchar(100) not null,
price decimal (10,2) not null,
stock_quantity integer (10) not null,
primary key (item_id)
); 

SELECT * FROM products;

INSERT INTO products (product_name, departament_name, price, stock_quantity)
values ("sun glasses", "fashion", 27.99, 290),
("circles", "geomety", 12.89, 700),
("pencil", "writing supplies", .99, 4500),
("tablet", "electronics", 300.12, 45), 
("old computer", "electronicts", 123.95, 5),
("new computer", "electroniproductscs", 1023.99, 50),
("shoes", "fashion", 37.99, 45),
("empty cans", "garbage", 0.12, 36000),
("cheap clock", "garbage", 12500.99, 2),
("lucky chain", "garbage", 3.89, 78);
        

SELECT * FROM products;
