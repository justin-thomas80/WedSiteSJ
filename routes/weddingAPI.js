var express = require('express');
module.exports = function(dbConn,dbModels){
    var router = express.Router();
    var dbModelPollQuestions = dbModels.dbModelPollQuestions;
    var dbModelPollResults = dbModels.dbModelPollResults;

    router.get('/api/pollquestions', function(req, res) {
        // use mongoose to get all poll questiosn
        dbModelPollQuestions.find(function(err, pollQuestions) {
            if (err)
                res.send(err);
//            console.log("pollquestions");
//            console.log(pollQuestions);

            res.json(pollQuestions); // return all poll questions in JSON format
        });
    });

    router.post('/api/pollresults', function(req, res) {

        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        dbModelPollResults.create({
            QID : req.body.QID,
            A : req.body.A,
            C: req.body.C,
            resultDate: new Date().toDateString(),
            requestIp: ip,
            done : false
        }, function(err, pollResult) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            dbModelPollResults.find({QID:pollResult.QID}, function(err, pollResults) {
                if (err)
                    res.send(err);

                res.json(pollResults);
            });
        });

    });

    return router;
};