// Initialize Firebase
var config = {
    apiKey: "AIzaSyACNVOc0XnWfoBbVb5OIchMrJlpOwIpI2c",
    authDomain: "timesheet-eb837.firebaseapp.com",
    databaseURL: "https://timesheet-eb837.firebaseio.com",
    projectId: "timesheet-eb837",
    storageBucket: "",
    messagingSenderId: "167125142236"
};
firebase.initializeApp(config);
// Assign the reference to the database to a variable named 'database'
var database = firebase.database();



////////////////////////////////////////////////////





$("#add-employee").on("click", function () {
    event.preventDefault();
    var name = $("#name-input").val().trim();
    var role = $("#role-input").val().trim();
    var date = $("#date-input").val().trim();
    var rate = $("#rate-input").val().trim();

    database.ref().push({
        name: name,
        role: role,
        date: date,
        rate: rate
    });
});


database.ref().orderByChild("dataAdded").limitToLast(1).on("child_added", function(snapshot) {
    var sv = snapshot.val();

    console.log(sv.name);
    console.log(sv.rate);
    console.log(sv.date);
    console.log(sv.role);

    var newRow = $("<tr>");
    var nameRow = $("<td>");
    var roleRow = $("<td>");
    var dateRow = $("<d>");
    var monthsWorkedRow = $("<td>");
    var rateRow = $("<td>");
    var billedRow = $("<td>");
    
    nameRow.text(sv.name);
    roleRow.text(sv.role);
    dateRow.text(sv.date);
    monthsWorkedRow.text(" ");
    rateRow.text(sv.rate);
    billedRow.text(" ");

    newRow.append(nameRow);
    newRow.append(roleRow);
    newRow.append(dateRow);
    newRow.append(monthsWorkedRow);
    newRow.append(rateRow);
    newRow.append(billedRow);

    console.log(newRow);

    $("tbody").append(newRow);






});


// // --------------------------------------------------------------

// // At the initial load and subsequent value changes, get a snapshot of the stored data.
// // This function allows you to update your page in real-time when the firebase database changes.
// database.ref().on("value", function (snapshot) {
//     if (snapshot.child("name").exists() && snapshot.child("role").exists()) {

//     } else {
//         // Initial Values
//         var initName = "No One Yet";
//         var initRole = "No Roles";
//         var initDate = "No Dates Yet";
//         var initRate = "No Rates Yet";

//         var initEmployee = {
//             name: initName,
//             role: initRole,
//             date: initDate,
//             rate: initRate
//         };
//     }
//     database.ref().push({
//         employee: initEmployee
//     });
// });