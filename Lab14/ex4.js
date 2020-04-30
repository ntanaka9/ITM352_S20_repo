var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");

var user_info_file = './user_data.json';

if (fs.existsSync(user_info_file)) {
    var file_stats = fs.statSync(user_info_file);
    
    var data = fs.readFileSync(user_info_file, 'utf-8');
    var userdata = JSON.parse(data); //gets data from user_data.json

    console.log(`${user_info_file} has ${file_stats.size} characters`);
} else {
    console.log("hey! " + user_info_file + " doesn't exist!");
}

app.use(myParser.urlencoded({ extended: true }));

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="/check_login?quantity=999" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/check_login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
  console.log(request.query);
  var err_str = "";
  var login_username = request.body["username"];
  // check if username exists in reg data. If so, check if password matches
  if(typeof userdata[login_username] != 'undefined') {
      var user_info = userdata[login_username];
      // check if password stored for username matches what user typed in
      if(user_info["password"] != request.body["password"]) {
            err_str = `bad_password`;
      } else {
        response.end(`${login_username} is logged in with data ${JSON.stringify(request.query)}`);
        return;
      }
      
  } else {
          err_str = `bad_username`; 
  }
  response.redirect(`./login?username=${login_username}&error=${err_str}`);
});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="/register_user" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
<a href="./register">New user register</a>
</body>
    `;
    response.send(str);
 });

 app.post("/register_user", function (request, response) {
    // process a simple register form 
    console.log(request.body);
    username = request.body.username;
    userdata[username] = {};
    userdata[username].password = request.body.password;
    userdata[username].email = request.body.email;
    //assume all data is good, write to reg data file
    fs.writeFileSync(user_info_file, JSON.stringify(userdata));
    response.end('New username ${username} registered')
});

 app.listen(8080, () => console.log(`listening on port 8080`));
