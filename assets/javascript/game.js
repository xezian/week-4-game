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
                attackPower: 8,
                image: "assets/images/schmilbert.png"
            },
            buddyTwo = {
                name: "Rocky",
                type: "sorcerer",
                hitPoints: 150,
                counterPower: 18,
                attackPower: 9,
                image: "assets/images/rocky.png"
            },
            buddyThree = {
                name: "Spike",
                type: "fighter",
                hitPoints: 160,
                counterPower: 15,
                attackPower: 11,
                image: "assets/images/spike.png",
            },
            buddyFour = {
                name: "Fazor",
                type: "rogue",
                hitPoints: 180,
                counterPower: 20,
                attackPower: 15,
                image: "assets/images/fazor.png"
            },
            buddyFive = {
                name: "King Loren",
                type: "king",
                hitPoints: 190,
                counterPower: 16,
                attackPower: 7,
                image: "assets/images/kingloren.png"
            }
        ];
// create variables to represent states of the game
        var isOpponentReady = false;
        var deadBuddyCounter;
// create functions to call inside the .on("click") functions
// create a start button we can use to start the game
        var startButton = $("<button>");
        startButton.addClass("btn start-button btn-warning");
        startButton.text("START");
        $("#start").append(startButton);
// * MUSIC * start screen music default muted (a button for that will need to be created)
// event listener to on click event to start the whole game!
        $(document).on("click", ".start-button", function() {
            $("#graveyard").empty();
            $("#opponent").empty();
            $("#enemybuddies").empty();   
// * MUSIC * maybe none when you first click start
// create and append buttons to the document representing the buddies from the array
            for (var i = 0; i < buddyArray.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("row buddyrow");
                newDiv.attr("id", buddyArray[i].type);
                var buddyButton = $("<button>");
                var buddyImage = $("<img>");
                buddyImage.addClass("buddy-image");
                buddyImage.attr("id", buddyArray[i].name);
                buddyImage.attr("src", buddyArray[i].image);
                buddyButton.addClass("buddy-button btn w-100");
                buddyButton.attr("data-hp", buddyArray[i].hitPoints);
                buddyButton.attr("data-ap", buddyArray[i].attackPower);
                buddyButton.attr("data-cp", buddyArray[i].counterPower);
                buddyButton.attr("data-bp", buddyArray[i].attackPower);
                buddyButton.attr("style", "background-color:transparent;");
                buddyButton.attr("name", buddyArray[i].name);
                buddyButton.html(buddyArray[i].name + "<br>" + buddyArray[i].hitPoints);
                $("#buddybank").append(newDiv);
                buddyButton.append(buddyImage);
                $(`#${buddyArray[i].type}`).append(buddyButton);
                deadBuddyCounter = 0;
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
            $(this).find(".buddy-image").removeClass("buddy-image").addClass("big-image");
            $(this).appendTo("#buddy");
// * SOUND * select your chosen buddy
            $(".buddy-button").removeClass("buddy-button").addClass("enemy-button");
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
            $(this).find(".buddy-image").removeClass("buddy-image").addClass("big-image");
            $(this).appendTo("#opponent");
            isOpponentReady = true;
// * MUSIC * battle is possible
// create and append button for attack
            var attackButton = $("<button>");
            attackButton.addClass("btn attack-button btn-danger");
            attackButton.text("ATTACK!");
            attackButton.appendTo("#attack");
            }
        });
// event listener for the opponent button to make the opponent leave and go back to enemybuddies also clears attack button
        $(document).on("click", ".opponent", function() {
            $(this).removeClass("opponent").addClass("enemy-button");
            $(this).find(".big-image").removeClass("big-image").addClass("buddy-image");
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
            $(this).find(".big-image").removeClass("big-image").addClass("buddy-image");
            $(this).appendTo("#buddybank");
            $(".enemy-button").removeClass("enemy-button").addClass("buddy-button");
            $(".buddy-button").appendTo("#buddybank");
            }
        });
// --> on click event listener to handle the attack being clicked pitting the chosen buddy's attack power against the opponent buddy's counter power while increasing the chosen buddy's attack power
        $(document).on("click", ".attack-button", function () {
            if (isOpponentReady) {
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
            var $oppimg = $(".opponent").find('img');
            var $budimg = $(".chosen-buddy").find('img');
            $(".opponent").html($(".opponent").attr("name") + "<br>" + opponentsHitPoints);
            $(".chosen-buddy").html($(".chosen-buddy").attr("name") + "<br>" + buddyHitPoints);
            $(".opponent").append($oppimg);
            $(".chosen-buddy").append($budimg);
            } else {
            $("#top-message").text("there is no BUDDY to fight!")    
            }
            if (buddyHitPoints < 1) {
                alert("you died");
// * SOUND * ANIMATE * MUSIC death game over
                $budimg = $(".chosen-buddy").find('img');
                $(".chosen-buddy").html($(".chosen-buddy").attr("name") + "<br>" + "dead.");
                $budimg.removeClass("big-image").addClass("buddy-image");
                $(".chosen-buddy").append($budimg);
                $(".chosen-buddy").removeClass("chosen-buddy w-100").addClass("dead-buddy w-20");
                $(".dead-buddy").appendTo("#graveyard");
                $("#top-content").empty();
                $("#buddy").empty();
                $("#attack").empty();
                $("#start").append(startButton);
                isOpponentReady = false;
            } else if (opponentsHitPoints < 1) {
                $oppimg = $(".opponent").find('img');
                $(".opponent").html($(".opponent").attr("name") + "<br>" + "dead.");
                $oppimg.removeClass("big-image").addClass("buddy-image");
                $(".opponent").append($oppimg);
                $(".opponent").removeClass("opponent btn-warning w-100").addClass("dead-buddy btn-light w-20");  
                $(".dead-buddy").appendTo("#graveyard");
                $("#opponent").empty();
                $("#attack").empty();
                isOpponentReady = false;
                deadBuddyCounter++;
                if (deadBuddyCounter >= buddyArray.length - 1) {
                    alert("you win!");
// * SOUND * ANIMATE * MUSIC yay you won all your buddies are dead
                    $("#top-content").empty();
                    $("#buddybank").empty();
                    $("#buddy").empty();
                    $("#opponent").empty();
                    $("#enemybuddies").empty();
                    $("#attack").empty();
                    $("#start").append(startButton);
                }
            }
        })
    });
});


