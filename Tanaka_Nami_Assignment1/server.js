// From Lab13 info_server_Ex2a.js

var express = require('express');
var app = express();
var myParser = require("body-parser");
var products = require("./public/products").theproducts; //export and save products here
const qs= require("querystring"); //loads inputted data
//any path
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true })); //to get data in body
app.post("/products_selection", function (request, response) { //process form
    let POST = request.body; //data in body
    console.log(POST);
    if (typeof POST['purchase_submit'] != 'undefined') {
        var validquantities = true;
        for (i = 0; i < products.length; i++) { //validate quantities
            qty = POST[`quantity_textbox${i}`];
            //check if the qty is not a non negative integer
            if (isNonNegInt(qty) == false) {
                validquantities = false;
            }
        }
        //if quantities are valid, go to invoice
        if(validquantities){
            response.redirect(`./invoice.html?${qs.stringify(POST)}`) //redirect to invoice if valid quantities
        }
    }

});

function isNonNegInt(q, returnErrors = false) {
    errors = []; //invalid quantity
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!');
    if (q < 0) errors.push('Negative value!');
    if (parseInt(q) != q) errors.push('Not an integer!');
    return returnErrors ? errors : (errors.length == 0);
}


app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));