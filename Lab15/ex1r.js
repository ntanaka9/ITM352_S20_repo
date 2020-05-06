var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");
var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
app.use(session({secret: "ITM352 rocks!"}));

var user_info_file = './user_data.json';
var quantity_str;

if (fs.existsSync(user_info_file)) {
    var file_stats = fs.statSync(user_info_file);
    
    var data = fs.readFileSync(user_info_file, 'utf-8');
    var userdata = JSON.parse(data);

    console.log(`${user_info_file} has ${file_stats.size} characters`);
} else {
    console.log("hey! " + user_info_file + " doesn't exist!");
}

app.use(myParser.urlencoded){extended: true}));
//add a route to get a cookie that may have been set here
app.get('/set_cookie', function (request, response) {
    console.log('In GET /set_cookie');
    var my_name = `Nami`;
    response.cookie('your_name', my_name) my_name, {maxAge: 5*1000}.send('cookie set'); //sets name = express
});

app.get('/use_cookie', function (request, response) {
    console.log('In GET /use_cookie' +); 
    var the_name= request.cookie["your_name"];
    response.send('Welcome to the Use Cookie page' + the_name); //sets name = express

app.get('/use_session', function (request, response) {
        console.log('In GET /use_session', request.cookies);
    var the_sess_id = request.session.id;
    response.send('welcome, your session ID is' + the_sess_id); //sets name = express
    
app.get("/login", function (request, response) {
    console.log(request.query); //print out query string
    quantity_str= request.query;
    // Give a simple login form
    str = `
<body>
<h1>${request.query["error"]}</h1>
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

app.listen(8080, () => console.log(`listening on port 8080`));