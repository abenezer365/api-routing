//Import modules (Built, Contributed)
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
const port = 4000;

// Importing enviroment
require('dotenv').config()


// create a server
const server = express();

// Enable CORS(Cross-Origin Resource Sharing) for all routes  
server.use(cors());

//Parse the request sent to the server bfore reaching the server
server.use(express.urlencoded({extended : true}))

// Create a connection to the database remember it doesn't connect it
const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DATABASE
});

// connects to the server using the connection created above (line 17)
connection.connect((err)=>{
    if(err) console.log(`Unable to connect to the database ${err.message}`);
    console.log("Connected");
})

//Handles get requst to the initial page or / (Home)
server.get("/", (req,res)=>{
    const response = '<div><h2>Server is up</h2> <h3>Database name: mydb</h3></div>'
    res.send(response)
})

//Handles get requst to the install request
server.get("/install", (req,res)=>{
    //cretes a table 
    let ProductName = `CREATE TABLE IF NOT EXISTS ProductName (
        product_id INT(11) AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(256)
    );`;
    
    let Description = `CREATE TABLE IF NOT EXISTS Description (
        description_id INT(11) AUTO_INCREMENT PRIMARY KEY,
        description VARCHAR(256),
        product_id INT(11),
        FOREIGN KEY (product_id) REFERENCES ProductName(product_id)
    );`;
    let Brief = `CREATE TABLE IF NOT EXISTS Brief (
        brief_id INT(11) AUTO_INCREMENT PRIMARY KEY,
        brief TEXT,
        product_id INT(11),
        FOREIGN KEY (product_id) REFERENCES ProductName(product_id)
    );`;
    
    let Price = `CREATE TABLE IF NOT EXISTS Price (
        price_id INT(11) AUTO_INCREMENT PRIMARY KEY,
        price VARCHAR(256),
        product_id INT(11),
        FOREIGN KEY (product_id) REFERENCES ProductName(product_id)
    );`;
    
    let MonthlyPlan = `CREATE TABLE IF NOT EXISTS MonthlyPlan (
        plan_id INT(11) AUTO_INCREMENT PRIMARY KEY,
        plan VARCHAR(256),
        product_id INT(11),
        FOREIGN KEY (product_id) REFERENCES ProductName(product_id)
    );`;
    
    let URL = `CREATE TABLE IF NOT EXISTS URL (
        url_id INT(11) AUTO_INCREMENT PRIMARY KEY,
        url VARCHAR(256),
        product_id INT(11),
        FOREIGN KEY (product_id) REFERENCES ProductName(product_id)
    );`;
    
    let ImageURL = `CREATE TABLE IF NOT EXISTS ImageURL (
        image_url_id INT(11) AUTO_INCREMENT PRIMARY KEY,
        image_url VARCHAR(256),
        product_id INT(11),
        FOREIGN KEY (product_id) REFERENCES ProductName(product_id)
    );`;
    connection.query(ProductName, (err,result,field)=>{
         //Error handling
        if(err) console.log("Unable to create table",err.message);
    });
    connection.query(Description, (err,result,field)=>{
         //Error handling
        if(err) console.log("Unable to create table",err.message);
    });
    connection.query(Brief, (err,result,field)=>{
         //Error handling
        if(err) console.log("Unable to create table",err.message);
    });
    connection.query(Price, (err,result,field)=>{
         //Error handling
        if(err) console.log("Unable to create table",err.message);
    });
    connection.query(MonthlyPlan, (err,result,field)=>{
         //Error handling
        if(err) console.log("Unable to create table",err.message);
    });
    connection.query(URL, (err,result,field)=>{
         //Error handling
        if(err) console.log("Unable to create table",err.message);
    });
    connection.query(ImageURL, (err,result,field)=>{
         //Error handling
        if(err) console.log("Unable to create table",err.message);
    });

    res.send('Database installed');
})

//Handles post requst and adds the data to the database in the given installed tables
server.post("/add-product", (req, res) => {

    const {ProductName, Description, Brief, Price, MonthlyPlan, URL , ImageURL} = req.body

    let insertProductName = `INSERT INTO ProductName (product_name)
        VALUES ("${ProductName}")`;

    // First insert into ProductName table
    connection.query(insertProductName, (err, results, field) => {
        if (err) {
            console.log("Unable to insert into ProductName", err.message);
            return res.send("Failed to insert product name.");
        }

        let productId = results.insertId;

        // Now insert into other tables using the productId
        let insertDescription = `INSERT INTO Description (description, product_id)
            VALUES ("${Description}", ${productId})`;
        let insertBrief = `INSERT INTO Brief (brief, product_id)
            VALUES ("${Brief}", ${productId})`;

        let insertPrice = `INSERT INTO Price (price, product_id)
            VALUES ("${Price}", ${productId})`;

        let insertMonthlyPlan = `INSERT INTO MonthlyPlan (plan, product_id)
            VALUES ("${MonthlyPlan}", ${productId})`;

        let insertURL = `INSERT INTO URL (url, product_id)
            VALUES ("${URL}", ${productId})`;

        let insertImageURL = `INSERT INTO ImageURL (image_url, product_id)
            VALUES ("${ImageURL}", ${productId})`;

        connection.query(insertDescription, (err) => {
            if (err) console.log("Unable to insert into Description", err.message);
        });
        connection.query(insertBrief, (err) => {
            if (err) console.log("Unable to insert into Brief", err.message);
        });

        connection.query(insertPrice, (err) => {
            if (err) console.log("Unable to insert into Price", err.message);
        });

        connection.query(insertMonthlyPlan, (err) => {
            if (err) console.log("Unable to insert into MonthlyPlan", err.message);
        });

        connection.query(insertURL, (err) => {
            if (err) console.log("Unable to insert into URL", err.message);
        });

        connection.query(insertImageURL, (err) => {
            if (err) console.log("Unable to insert into ImageURL", err.message);
        });
        res.sendFile(path.join(__dirname, 'pages', 'success.html'));
    });
});

//Handles GET requst retutns JSON data by fetching the database
server.get("/products", (req, res) => {
    let query = `
        SELECT 
            ProductName.product_id AS id,
            ProductName.product_name,
            Description.description,
            Brief.brief,
            Price.price,
            URL.url,
            ImageURL.image_url
        FROM ProductName
        INNER JOIN Description ON ProductName.product_id = Description.product_id
        INNER JOIN Brief ON ProductName.product_id = Brief.product_id
        INNER JOIN Price ON ProductName.product_id = Price.product_id
        INNER JOIN URL ON ProductName.product_id = URL.product_id
        INNER JOIN ImageURL ON ProductName.product_id = ImageURL.product_id
    `;
    connection.query(query, (err, results) => {
        if (err) {
            console.log("Error during selection", err.message);
            return res.status(500).send("Error fetching product data.");
        }
        res.send(results);
    });
});

// Handles delete request to remove product
server.post("/delete-product", (req, res) => {
    const id = req.body.deleted;
    
    if (!id) {
        return res.send("Error: Need product ID");
    }

    // List all delete queries
    const queries = [
        `DELETE FROM Description WHERE product_id = ${id}`,
        `DELETE FROM Brief WHERE product_id = ${id}`,
        `DELETE FROM Price WHERE product_id = ${id}`,
        `DELETE FROM MonthlyPlan WHERE product_id = ${id}`,
        `DELETE FROM URL WHERE product_id = ${id}`,
        `DELETE FROM ImageURL WHERE product_id = ${id}`,
        `DELETE FROM ProductName WHERE product_id = ${id}`
    ];

    // Run all queries
    queries.forEach(function(deleted){
        connection.query(deleted, (err) => {
            if (err) {
                return res.send("Error deleting product data");
            }else{
                res.sendFile(path.join(__dirname, 'pages', 'successDeleted.html'));
            }
         })
     })
    });



//Listening to port port
server.listen(port, (err)=>{
    //Error handling
    if(err) console.log(err.message);
    console.log(`Backend server running on http://localhost:${port}/`);
});
