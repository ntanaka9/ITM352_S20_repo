// From Lab13 info_server_Ex2a.js

var express = require('express');
var app = express();
var myParser = require("body-parser");

//any path
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true })); //to get data in body
app.post("/process_form", function (request, response) { //process form
    let POST = request.body; //data in body
    console.log(POST);
    if (typeof POST ['submitPurchas'] != 'undefined') {
        for (i =0; 1 < products.length; i++) {
        qty=POST['quantity${i}'];
         console.log(isNonNegInt(qty));
        }
    }
});

function isNonNegInt (q, returnErrors = false) {
    erros = []; //invalid quantity
    if (q == "") {q=0;}
    if (Number (q) !=q) errors.push('Not a number!');
    if (q<0) errors.push ('Negative value!');
    if (parseInt(q) !=q) errors.push ('Not an integer!'); 
    return returnErrors ? errors : (errors.length == 0);
}


app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));