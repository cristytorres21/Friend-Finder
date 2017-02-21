var friends = require('../data/friends.js');

module.exports = function (app) {
    

    // API GET Requests
    app.get('/api/friends', function (req, res)
    {
        res.json(friends);
    });
    
    // API POST Requests
    app.post('/api/friends', function (req, res)
    {
        // Get new friend to be inserted in the server
        var newFriend = req.body;

        // The matched friend will be saved in the following variable
        var selectedFriend = {};
        var diffScore = 0;
        // For each data 
        console.log(friends);

        for( var i = 0; i < friends.length; i++ )
        {
            var tempDiffScore = 0;
            for( var j = 0; j < friends[i].scores.length; j++)
            {
                tempDiffScore += Math.abs( parseInt(friends[i].scores[j]) - parseInt(newFriend.scores[j]) ); 
            }

            //If no friend have been selected yet
            if( i === 0 )
            {
                selectedFriend = friends[i];
                diffScore = tempDiffScore
            }
            //If there was already a friend selected
            else if( tempDiffScore < diffScore )
            {
                //change that friend for a better friend
                selectedFriend = friends[i];
                diffScore = tempDiffScore;
            }
        };
        // Push the new data (After matching a friend)
        friends.push(req.body);
        // Return matched friend
        res.json(selectedFriend);
    });
};