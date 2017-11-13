// this loads the document first
$( document ).ready(function() {
    console.log( "document loaded" );
// this loads the window first
    $( window ).on( "load", function() {
    console.log( "window loaded" );
// created an array containing all the buddies as objects
        var buddyArray = [
            buddyOne = {
                name: "Schmelbert",
                type: "Thief",
                hitPoints: 120,
                counterPower: 12,
                attackPower: 8
            },
            buddyTwo = {
                name: "Rocky",
                type: "Sorcerer",
                hitPoints: 150,
                counterPower: 18,
                attackPower: 9
            },
            buddyThree = {
                name: "Spike",
                type: "Fighter",
                hitPoints: 160,
                counterPower: 15,
                attackPower: 11
            },
            buddyFour = {
                name: "Fazor",
                type: "Rogue",
                hitPoints: 180,
                counterPower: 20,
                attackPower: 15
            },
            buddyFive = {
                name: "King Loren",
                type: "King",
                hitPoints: 190,
                counterPower: 16,
                attackPower: 7
            }
        ];
// created variables to represent states of the game
        var battlePossible = false;   
// created a start button we can use to start the game
        var startButton = $("<button>");
        startButton.addClass("btn start-button btn-warning");
        startButton.text("START");
        $("#start").append(startButton);
// created an on click event to start the whole game!
        $(".start-button").on("click", function() {        
// created and appended buttons to the document representing the buddies from the array
            for (var i = 0; i < buddyArray.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("row")
                newDiv.attr("id", buddyArray[i].type);
                var buddyButton = $("<button>");
                buddyButton.addClass("btn buddy-button btn-info w-100");
                buddyButton.attr("data-hp", buddyArray[i].hitPoints);
                buddyButton.attr("data-ap", buddyArray[i].attackPower);
                buddyButton.attr("data-cp", buddyArray[i].counterPower);
                buddyButton.html(buddyArray[i].name + "<br>" + buddyArray[i].hitPoints);
                $("#buddybank").append(newDiv);
                $(`#${buddyArray[i].type}`).append(buddyButton);
            }
// remove start button ;)
            $("#message").empty();  
            $("#start").empty();    
// created event listeners to on click events for the buddy buttons
            
// created a button for attack

// created on click events to handle the attack being clicked

// created on click events to handle the buddy buttons being clicked

// 
        });
    });
});


