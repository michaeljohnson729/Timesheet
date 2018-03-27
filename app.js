// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
  apiKey: "AIzaSyDhZ3iMAnMySu4Q5DeUATM5_7GhTklFUng",
  authDomain: "hello-world-71ef1.firebaseapp.com",
  databaseURL: "https://hello-world-71ef1.firebaseio.com",
  projectId: "hello-world-71ef1",
  storageBucket: "hello-world-71ef1.appspot.com",
  messagingSenderId: "81358045040"
};
firebase.initializeApp(config);


// Assign the reference to the database to a variable named 'database'
var database = firebase.database();


// Initial Values
var initName = "No One Yet";
var initRole = "No Roles";
var initDate = "No Dates Yet";
var initRate = "No Rates Yet";


// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function (snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("name").exists() && snapshot.child("highPrice").exists()) {

    // Set the variables for highBidder/highPrice equal to the stored values in firebase.
    highBidder = snapshot.val().highBidder;
    highPrice = snapshot.val().highPrice;



    // Change the HTML to reflect the stored values
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice);

    // Print the data to the console.


  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {
    database.ref().set({
      initialBid: initialBid,
      initialBidder: initialBidder,
      highPrice: highPrice,
      highBidder: highBidder
    })
    // Change the HTML to reflect the initial values
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice);

    // Print the data to the console.


  }


  // If any errors are experienced, log them to console.
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function (event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var bidderPrice = $("#bidder-price").val().trim();
  var bidderName = $("#bidder-name").val().trim();

  console.log(bidderPrice);
  console.log(highPrice);

  // Log the Bidder and Price (Even if not the highest)
  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
    database.ref().set({
      highPrice: bidderPrice,
      highBidder: bidderName
    });

    // Log the new High Price


    // Store the new high price and bidder name as a local variable
    highBidder = bidderName;
    highPrice = bidderPrice;

    // Change the HTML to reflect the new high price and bidder
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice);
  }

  else {
    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

});
