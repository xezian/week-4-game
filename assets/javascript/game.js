// this loads the document first
$( document ).ready(function() {
    console.log( "document loaded" );
// this loads the window first
    $( window ).on( "load", function() {
    console.log( "window loaded" );
// created an array containing all the buddies as objects
        var buddyArray = [
            buddyOne = {
                name: "Schmilbert",
                type: "thief",
                hitPoints: 120,
                counterPower: 12,
                attackPower: 8
            },
            buddyTwo = {
                name: "Rocky",
                type: "sorcerer",
                hitPoints: 150,
                counterPower: 18,
                attackPower: 9
            },
            buddyThree = {
                name: "Spike",
                type: "fighter",
                hitPoints: 160,
                counterPower: 15,
                attackPower: 11
            },
            buddyFour = {
                name: "Fazor",
                type: "rogue",
                hitPoints: 180,
                counterPower: 20,
                attackPower: 15
            },
            buddyFive = {
                name: "King Loren",
                type: "king",
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
        $(document).on("click", ".start-button", function() {        
// created and appended buttons to the document representing the buddies from the array
            for (var i = 0; i < buddyArray.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("row buddyrow");
                newDiv.attr("id", buddyArray[i].type);
                var buddyButton = $("<button>");
                buddyButton.addClass("btn buddy-button btn-info w-100");
                buddyButton.attr("data-hp", buddyArray[i].hitPoints);
                buddyButton.attr("data-ap", buddyArray[i].attackPower);
                buddyButton.attr("data-cp", buddyArray[i].counterPower);
                buddyButton.attr("name", buddyArray[i].name)
                buddyButton.html(buddyArray[i].name + "<br>" + buddyArray[i].hitPoints);
                $("#buddybank").append(newDiv);
                $(`#${buddyArray[i].type}`).append(buddyButton);
            }
// remove start button ;)
            $("#message").empty();  
            $("#start").empty();          
// created event listener to on click events for the buddy buttons
            $(document).on("click", ".buddy-button", function () {
// this is where the setup happens for the game. the buddy you click gets appended to the arena <div id="buddy">, and all the other buddies go into the defender pool. <div id="enemybuddies">.

// I started by replacing my alert with a confirm
                var buddyChosen = confirm("do you choose " + $(this).attr("name") + "?");
                if (buddyChosen) {
                    $(this).removeClass("buddy-button").addClass("chosen-buddy");
                    $(this).appendTo("#buddy");
                    $(".buddy-button").removeClass("buddy-button btn-info").addClass("enemy-button btn-danger");
                    $(".enemy-button").appendTo("#enemybuddies");
                    }
                });
// created event listener to on click events for the enemy buttons
                $(document).on("click", ".enemy-button", function () {
                    var enemyChosen = confirm("OK, " + $(".chosen-buddy").attr("name") + ". Will you fight " + $(this).attr("name") + "?");
                    if (enemyChosen) {
                        $(this).removeClass("enemy-button").addClass("opponent");
                        $(this).appendTo("#opponent");
                };
            });
// created a button for attack

// created on click events to handle the attack being clicked

// created on click events to handle the buddy buttons being clicked
        });
    });
});


