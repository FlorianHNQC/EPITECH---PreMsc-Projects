
module.exports.connection = function () { 

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'irc',
        port: '3306'
    });

    exports.Connection = connection

    connection.connect(function(err){
        if(err){
            console.error('Impossible de se connecter ', err);
        }
        console.log('Connection established');
    });
};
