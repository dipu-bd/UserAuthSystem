module.exports = {

    //formatted like 'mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700'
    url: "mysql://dipu:1123@localhost/db",

    //do not need the rest if url is provided
    options: {
        connectionLimit: 100, //important - limit the number of simultaneous connection
        host: "localhost", //database address url
        port: "3306", //port of the database
        //charset: "",
        database: "LogInOutSystem", //name of the database
        user: "dipu", //username
        password: new Buffer("MTEyMw==", "base64").toString("ascii"), //password
        debug: false
    }

    //for a long list of configurations, visit-   https://github.com/felixge/node-mysql
};