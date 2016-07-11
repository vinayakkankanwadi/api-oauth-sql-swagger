// --------------------------------
// Packages we require
// --------------------------------
var edge = require('edge');

var getTopUsers = edge.func('sql', function () {/*
    SELECT TOP 5 * FROM SampleUsers ORDER BY CreateDate DESC
*/});

function logError(err, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Error: " + err);
    res.end("");
}    

// endpoint /sqldata for GET
exports.getSqlDatas = function(req,res){
	console.log('GET');
	getTopUsers(null, function (error, result) {
        if (error) { logError(error, res); return; }
        if (result) {
            res.write("<ul>");
            result.forEach(function(user) {
                res.write("<li>" + user.FirstName + " " + user.LastName + ": " + user.Email + "</li>");
            });
            res.end("</ul>");
        }
        else {
        }
    });
	//res.json({message: 'SQL data'});
};