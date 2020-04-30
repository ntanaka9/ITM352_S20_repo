var fs = require('fs');
var user_info_file = './user_data.json';

if(fs.existsSync(user_info_file) {\
    var file_stats = fs.statSync(user_info_file);
    var data = fs.readFileSync(user_info_file, 'utf-8');
    data = JSON.parsel(data);

    console.log(data ["kazman"] ["password"], data.kazman.email);

    console.log(`${user_info_file} has ${file_stats.size}; character`);
} else {
    console.log("hey!" + user_info_file + "doesn't exist!");
}

