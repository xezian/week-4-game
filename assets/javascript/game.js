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
// create variables to represent states of the game
        var isOpponentReady = false;
// create a start button we can use to start the game
        var startButton = $("<button>");
        startButton.addClass("btn start-button btn-warning");
        startButton.text("START");
        $("#start").append(startButton);
// * MUSIC * start screen music default muted (a button for that will need to be created)
// event listener to on click event to start the whole game!
        $(document).on("click", ".start-button", function() {        
// * MUSIC * maybe none when you first click start
// create and append buttons to the document representing the buddies from the array
            for (var i = 0; i < buddyArray.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("row buddyrow");
                newDiv.attr("id", buddyArray[i].type);
                var buddyButton = $("<button>");
                buddyButton.addClass("btn buddy-button btn-info w-100");
                buddyButton.attr("data-hp", buddyArray[i].hitPoints);
                buddyButton.attr("data-ap", buddyArray[i].attackPower);
                buddyButton.attr("data-cp", buddyArray[i].counterPower);
                buddyButton.attr("data-bp", buddyArray[i].attackPower);
                buddyButton.attr("name", buddyArray[i].name)
                buddyButton.html(buddyArray[i].name + "<br>" + buddyArray[i].hitPoints);
                $("#buddybank").append(newDiv);
                $(`#${buddyArray[i].type}`).append(buddyButton);
// * ANIMATE * SOUND each buddy has it's own special sound here
            }
// remove the start button after it's been clicked and set loose the buddies ;)
            $("#top-message").empty();  
            $("#start").empty();  
        });        
// event listener to on click events for the buddy buttons
        $(document).on("click", ".buddy-button", function () {
// this is where the setup happens for the game. the buddy you click gets appended to the arena <div id="buddy">, and all the other buddies go into the defender pool. <div id="enemybuddies">.
            $(this).removeClass("buddy-button").addClass("chosen-buddy");
            $(this).appendTo("#buddy");
// * SOUND * select your chosen buddy
            $(".buddy-button").removeClass("buddy-button btn-info").addClass("enemy-button btn-danger");
// * ANIMATE * SOUND * buddybank not chosen buddies become enemybuddies
            $(".enemy-button").appendTo("#enemybuddies");
// * MUSIC * chosen buddy selected
        });
// event listener to on click events for the enemy buttons
        $(document).on("click", ".enemy-button", function () {
            $("#top-message").empty();  
            if (isOpponentReady) {
            $("#top-message").text(`${$(".opponent").attr("name")} is already in the arena right now`)
// * SOUND * attempt to select enemy enemy already selected
            } else {
// * SOUND * select enemy as next opponent
            $(this).removeClass("enemy-button").addClass("opponent");
            $(this).appendTo("#opponent");
            isOpponentReady = true;
// * MUSIC * battle is possible
// create and append button for attack
            var attackButton = $("<button>");
            attackButton.addClass("btn attack-button btn-dark");
            attackButton.text("ATTACK!");
            attackButton.appendTo("#attack");
            }
        });
// event listener for the opponent button to make the opponent leave and go back to enemybuddies also clears attack button
        $(document).on("click", ".opponent", function() {
            $(this).removeClass("opponent").addClass("enemy-button");
            $(this).appendTo("#enemybuddies");
            $("#attack").empty();
            $("#top-message").empty();
            isOpponentReady = false;
        });
// event listener for the chosen buddy button, such that if there is an opponent they may not retreat but if there is no opponent they may go back and also call all other buddies back to the buddybank also resetting their attack power
        $(document).on("click", ".chosen-buddy", function () {
            if (isOpponentReady) {
            $("#top-message").text(`${$(".opponent").attr("name")} is already in the arena right now`)
            } else {
            $(this).removeClass("chosen-buddy").addClass("buddy-button");
            $(this).appendTo("#buddybank");
            $(".enemy-button").removeClass("enemy-button btn-danger").addClass("buddy-button btn-info");
            $(".buddy-button").appendTo("#buddybank");
            }
        });
// --> on click event listener to handle the attack being clicked pitting the chosen buddy's attack power against the opponent buddy's counter power while increasing the chosen buddy's attack power
        $(document).on("click", ".attack-button", function () {
            var opponentsHitPoints = parseInt($(".opponent").attr("data-hp"));
            var buddyHitPoints = parseInt($(".chosen-buddy").attr("data-hp"));
            var opponentsCounterPower = parseInt($(".opponent").attr("data-cp"));
            var buddyAttackPower = parseInt($(".chosen-buddy").attr("data-ap"));
            var baseAttackPower = parseInt($(".chosen-buddy").attr("data-bp"));
// * SOUND * ANIMATION * MUSIC * attack the opponent and the opponenet attacks back
            opponentsHitPoints = (opponentsHitPoints - buddyAttackPower);
// ?? delay ??
            buddyHitPoints = (buddyHitPoints - opponentsCounterPower);
// increase attack points by their base amount
            buddyAttackPower = (buddyAttackPower + baseAttackPower);
// store those values in the html elements
            $(".opponent").attr("data-hp", opponentsHitPoints);
            $(".chosen-buddy").attr("data-ap", buddyAttackPower);
            $(".chosen-buddy").attr("data-hp", buddyHitPoints);
// print those values to the buddies
            $(".opponent").html($(".opponent").attr("name") + "<br>" + opponentsHitPoints);
            $(".chosen-buddy").html($(".chosen-buddy").attr("name") + "<br>" + buddyHitPoints);
            if (buddyHitPoints < 1) {
                alert("you died");
                $("#top-content").empty();
                $("#buddybank").empty();
                $("#buddy").empty();
                $("#opponent").empty();
                $("#enemybuddies").empty();
                $("#attack").empty(); 
                $("#graveyard").empty();
                $("#start").append(startButton);
            } else if (opponentsHitPoints < 1) {
                $(".opponent").removeClass("opponent btn-warning w-100").addClass("dead-buddy btn-light w-20");
                $(".dead-buddy").appendTo("#graveyard");
                isOpponentReady = false;
                $("#opponent").empty();
            }
        })
    });
});


