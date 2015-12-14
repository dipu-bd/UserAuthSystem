var mysql = require('mysql');
var configDB = require('../config/db');

var pool = mysql.createPool(configDB.options);

pool.on('error', function (err) {
    console.log("!!MySQL Error: " + err.errno + " " + err.code + " " + (fatal ? "{FATAL}" : "{NOT FATAL}"));
    console.log(err);
});


var checkUser = function (username, password, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            callback("Error connecting to database");
        } else {

            var sql = "SELECT * FROM ?? WHERE ?? = ?";
            var inserts = ['users', 'username',username];
            sql = mysql.format(sql, inserts);

            connection.query(sql, function (err, rows) {
                connection.release();
                if (err) {
                    callback("Error querying to database");
                }
                else if (rows.length === 0) {
                    callback("Username '" + username + "' does not exist in database. Please register");
                }
                else {

                    var userdata = rows[0];
                    if (userdata.password != password) {
                        callback("Password does not match");
                    }
                    else {
                        callback(null, {
                            id: userdata.userid,
                            username: userdata.username,
                            email: userdata.email
                        });
                    }
                }
            });
        }
    });
};

var userExists = function (username, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            callback("Error connecting to database");
        } else {

            var sql = "SELECT * FROM ?? WHERE ?? = ?";
            var inserts = ['users', 'username', username];
            sql = mysql.format(sql, inserts);

            console.log(sql);

            connection.query(sql, function (err, rows) {
                connection.release();
                if (err) {
                    callback("Error querying to database");
                } else if (rows.length === 0) {
                    callback(null, false);
                }
                else {
                    callback(null, true);
                }
            });
        }
    });
};

var addUser = function (username, email, password, callback) {

    //check if user already exists
    userExists(username, function (err, exists) {
        if (err) {
            return callback(err);
        }
        if (exists) {
            return callback(username + " already exist in the database. Please pick a different one");
        }

        pool.getConnection(function (err, connection) {
            if (err) {
                return callback("Error connecting to database");
            }

            var sql = "INSERT INTO ?? (??, ??, ??, ??) VALUES (NULL, ?, ?, ?); ";
            var inserts = ['users', 'userid', 'username', 'password', 'email', username, password, email];
            sql = mysql.format(sql, inserts);

            console.log(sql);

            connection.query(sql, function (err, rows) {
                connection.release();
                console.log(rows);
                if (err) {
                    return callback("Error inserting into database");
                }
                return checkUser(username, password, callback);
            });
        });
    });
};

module.exports.checkUser = checkUser;
module.exports.addUser = addUser;

