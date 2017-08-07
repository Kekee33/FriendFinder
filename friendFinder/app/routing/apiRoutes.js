// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var surveyData = require("../data/clientData");
//var waitListData = require("../data/waitinglistData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/client", function(req, res) {
    res.json(clientData);
  });

  // app.get("/api/waitlist", function(req, res) {
  //   res.json(waitListData);
  // });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/client", function(req, res) {
     res.json(clientData);
    
    });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clientData", function(req, res) {
    clientData.push(req.body);
  
      var compareFriends = [];

    for (var i = 0; i < clientData.length; i++) {
        var totalDif = 0;
        if (clientData[i].name != req.body.name ) {
          for (var j = 0; j < 10; j++) {
            var dif = Math.abs(req.body.scores[j] - clientData[i].scores[j]);
            totalDif+= dif;
          };
          compareFriends.push({name: clientData[i].name,
                              sum: totalDif,
                         photoUrl: clientData[i].photoUrl});
        };
    };

    compareFriends.sort(comparison);

    console.log("Your friend: " + compareFriends[0].name );
    var nameObj = {name: compareFriends[0].name,
               photoUrl: compareFriends[0].photoUrl }
    res.json(nameObj);


  });

  };

function comparison(a,b) {
    return parseInt(a.sum, 10) - parseInt(b.sum, 10);
  }





  

