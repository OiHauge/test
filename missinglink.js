console.log("wrrokeing");

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var config = {
        userName: 'jadadu',
        password: 'S1gurd!!',
        server: 'missinglink.database.windows.net',

        // If you're on Windows Azure, you will need this:
    options:
        {
                database: 'Missinglink',
                  encrypt: true
        }
};

    var connection = new Connection(config);

    connection.on('connect', function(err) {

        if (err) {
            context.log(err);

            context.res = {
                status: 500,
                body: "Unable to establish a connection."
            };
            context.done();

        } else {
            executeStatement();
        }
    });

    function executeStatement() {

        request = new Request("select 42, 'hello world'", function(err, rowCount) {
            if (err) {
                context.log(err);

                context.res = {
                    status: 500,
                    body: "Failed to connect to execute statement."
                };
                context.done();

            } else {
                context.log(rowCount + ' rows');
            }
        });

        request.on('row', function(columns) {
            columns.forEach(function(column) {
                context.log(column.value);
            });

            context.done();
        });

        connection.execSql(request);
    }
};