var fs = require('fs'); //lab 14
var express = require('express');
var app = express();
var myParser = require("body-parser");

var user_info_file = './user_data.json';

if(fs.existsSync(user_info_file) {
    var file_stats = fs.statSync(user_info_file);

    var data = fs.readFileSync(user_info_file, 'utf-8');
    var userdata = JSON.parsel(data);

    console.log(data ["kazman"] ["password"], userdata.kazman.email);

    console.log(`${user_info_file} has ${file_stats.size} characters`);
} else {
    console.log("User" + user_info_file + "does not exist.");
}

app.use(myParser.urlencoded({ extended: true }));

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    var login_username = request.body["username"];
    //check if username exists in reg data. If so, check if password matches
    if(typeof userdata[login_username] !='undefined') {
        var user_info = userdata[login_username]
        //check if password stored or username matches what use typed in
        if(user_info["password"]== request.body["passowrd"]) {
        response.end('${request.body["password"]} is not the right password.';
        } else{
            response.end('${login_username} is logged in.')
        }

    } else {
        err_str ='${login_username} does not exist. Please register.');
        response.redirect('./login');
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));
