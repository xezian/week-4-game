// this loads the document first
$( document ).ready(function() {
    console.log( "document loaded" );
// this loads the window first
    $( window ).on( "load", function() {
    console.log( "window loaded" );
// TODO - create object containing the entire game
// created an array containing all the buds as objects
        var budArray = [
            budOne = {
                name: "Schmilbert",
                type: "thief",
                hitPoints: 120,
                counterPower: 12,
                attackPower: 8,
                image: "assets/images/schmilbert.png"
            },
            budTwo = {
                name: "Rocky",
                type: "sorcerer",
                hitPoints: 150,
                counterPower: 18,
                attackPower: 9,
                image: "assets/images/rocky.png"
            },
            budThree = {
                name: "Spike",
                type: "fighter",
                hitPoints: 160,
                counterPower: 15,
                attackPower: 11,
                image: "assets/images/spike.png",
            },
            budFour = {
                name: "Fazor",
                type: "rogue",
                hitPoints: 180,
                counterPower: 20,
                attackPower: 15,
                image: "assets/images/fazor.png"
            },
            budFive = {
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
        var deadBudCounter;
// create functions to call inside the .on("click") functions
// create a start button we can use to start the game
        var startButton = $("<button>");
        startButton.addClass("btn start-button btn-warning");
        startButton.text("START");
        $("#start").append(startButton);
// TODO * MUSIC * start screen music default muted (a button for that will need to be created)
        var gameMusic = new Audio("assets/sounds/strange-noises.mp3");
        gameMusic.autoplay = true;
        gameMusic.muted  = true;
        var soundButton = $("<button>");
        soundButton.addClass("btn btn-info sound-button");
        soundButton.text("MUSIC");
        $("#sound").append(soundButton);
// event click listener to handle un-muting and muting
        $(document).on("click", ".sound-button", function() {
            if (gameMusic.muted) {
                $(this).text("MUTE");
                gameMusic.muted = false;
            } else {
                $(this).text("MUSIC");
                gameMusic.muted = true;
            }
        });
// event listener to on click event to start the whole game!
        $(document).on("click", ".start-button", function() {
            $("#graveyard").empty();
            $("#opponent").empty();
            $("#enemybuds").empty();
            isOpponentReady = false;
// TODO * MUSIC * maybe none when you first click start
// create and append buttons to the document representing the buds from the array
            for (var i = 0; i < budArray.length; i++) {
                var budButton = $("<button>");
                var budImage = $("<img>");
                budImage.addClass("bud-image");
                budImage.attr("id", budArray[i].name);
                budImage.attr("src", budArray[i].image);
                budButton.addClass("bud-button btn btn-light text-white");
                budButton.attr("data-hp", budArray[i].hitPoints);
                budButton.attr("data-ap", budArray[i].attackPower);
                budButton.attr("data-cp", budArray[i].counterPower);
                budButton.attr("data-bp", budArray[i].attackPower);
                budButton.attr("name", budArray[i].name);
                budButton.html(budArray[i].name + "<br>" + budArray[i].hitPoints);
                budButton.append(budImage);
                $("#budbank").append(budButton);
                deadbudCounter = 0;
// TODO * ANIMATE * SOUND each bud should have it's own special sound here
            }
// remove the start button after it's been clicked and set loose the buds ;)
            $("#top-message").html("Please select your preferred Bud from the Buddy Buds column on the left"); 
            $("#start").empty();  
        }); 
// event listener to on click events for the bud buttons
        $(document).on("click", ".bud-button", function () {
// this is where the setup happens for the game. the bud you click gets appended to the arena <div id="bud">, and all the other buds go into the defender pool. <div id="enemybuds">.
            $("#top-message").html("Please select your first Enemy Bud");
            $(this).removeClass("bud-button btn btn-light text-white").addClass("chosen-bud text-black");
            $(this).find(".bud-image").removeClass("bud-image").addClass("big-image");
            $(this).appendTo("#bud");
// TODO * SOUND * select your chosen bud
            $(".bud-button").removeClass("bud-button").addClass("enemy-button");
// TODO * ANIMATE * SOUND * budbank not chosen buds become enemybuds
            $(".enemy-button").appendTo("#enemybuds");
// TODO * MUSIC * chosen bud selected
        });
// event listener to on click events for the enemy buttons
        $(document).on("click", ".enemy-button", function () {
            $("#top-message").html("Click 'Attack' if you dare attack your chosen Enemy Bud");
            if (isOpponentReady) {
            $("#top-message").text(`${$(".opponent").attr("name")} is already in the arena right now`)
// TODO * SOUND * attempt to select enemy enemy already selected
            } else {
// TODO * SOUND * select enemy as next opponent
            $(this).removeClass("enemy-button btn btn-light text-white").addClass("opponent text-black");
            $(this).find(".bud-image").removeClass("bud-image").addClass("big-image");
            $(this).appendTo("#opponent");
            isOpponentReady = true;
// TODO * MUSIC * battle is possible
// create and append button for attack
            var attackButton = $("<button>");
            attackButton.addClass("btn attack-button btn-danger");
            attackButton.text("ATTACK!");
            attackButton.appendTo("#attack");
            }
        });
// event listener for the opponent button to make the opponent leave and go back to enemybuds also clears attack button
        $(document).on("click", ".opponent", function() {
            $(this).removeClass("opponent text-black").addClass("enemy-button btn btn-light text-white");
            $(this).find(".big-image").removeClass("big-image").addClass("bud-image");
            $(this).appendTo("#enemybuds");
            $("#attack").empty();
            $("#top-message").html("Please select your next Enemy Bud!");
            isOpponentReady = false;
        });
// event listener for the chosen bud button, such that if there is an opponent they may not retreat but if there is no opponent they may go back and also call all other buds back to the budbank also resetting their attack power
        $(document).on("click", ".chosen-bud", function () {
            if (isOpponentReady) {
            $("#top-message").html(`${$(".opponent").attr("name")} is already in the arena right now! <br> Battle ${$(".opponent").attr("name")} or choose another Enemy Bud.`)
            } else {
            $("#top-message").html(`Sorry! ${$(".chosen-bud").attr("name")} may not leave the arena unless they: <br> A) Die and go to the Graveyard. <br> B) Kill all the other Buds.`)
            }
        });
// on click event listener to handle the attack being clicked pitting the chosen bud's attack power against the opponent bud's counter power while increasing the chosen bud's attack power
        $(document).on("click", ".attack-button", function () {
            if (isOpponentReady) {
            var opponentsHitPoints = parseInt($(".opponent").attr("data-hp"));
            var budHitPoints = parseInt($(".chosen-bud").attr("data-hp"));
            var opponentsCounterPower = parseInt($(".opponent").attr("data-cp"));
            var budAttackPower = parseInt($(".chosen-bud").attr("data-ap"));
            var baseAttackPower = parseInt($(".chosen-bud").attr("data-bp"));
// TODO * SOUND * ANIMATION * MUSIC * attack the opponent and the opponenet attacks back
            opponentsHitPoints = (opponentsHitPoints - budAttackPower);
// TODO ?? delay ?? setTimeout function
            budHitPoints = (budHitPoints - opponentsCounterPower);
// increase attack points by their base amount
            budAttackPower = (budAttackPower + baseAttackPower);
// store those values in the html elements
            $(".opponent").attr("data-hp", opponentsHitPoints);
            $(".chosen-bud").attr("data-ap", budAttackPower);
            $(".chosen-bud").attr("data-hp", budHitPoints);
// print those values to the buds
            var $oppimg = $(".opponent").find('img');
            var $budimg = $(".chosen-bud").find('img');
            $(".opponent").html($(".opponent").attr("name") + "<br>" + opponentsHitPoints);
            $(".chosen-bud").html($(".chosen-bud").attr("name") + "<br>" + budHitPoints);
            $(".opponent").append($oppimg);
            $(".chosen-bud").append($budimg);
            } else {
            $("#top-message").text("there is no bud to fight!")    
            }
            if (budHitPoints < 1) {
                $("#top-message").text("You died!"); 
// TODO * SOUND * ANIMATE * MUSIC death game over
                $budimg = $(".chosen-bud").find('img');
                $(".chosen-bud").html($(".chosen-bud").attr("name") + "<br>" + "dead.");
                $budimg.removeClass("big-image").addClass("bud-image");
                $(".chosen-bud").append($budimg);
                $(".chosen-bud").removeClass("chosen-bud text-black").addClass("dead-bud w-20 btn btn-light text-white");
                $(".dead-bud").appendTo("#graveyard");
                $("#top-content").empty();
                $("#bud").empty();
                $("#attack").empty();
                $("#start").append(startButton);
                isOpponentReady = false;
            } else if (opponentsHitPoints < 1) {
                $("#top-message").html("Please select your next Enemy Bud!");
                $oppimg = $(".opponent").find('img');
                $(".opponent").html($(".opponent").attr("name") + "<br>" + "dead.");
                $oppimg.removeClass("big-image").addClass("bud-image");
                $(".opponent").append($oppimg);
                $(".opponent").removeClass("opponent text-black").addClass("dead-bud w-20 btn btn-light text-white");  
                $(".dead-bud").appendTo("#graveyard");
                $("#opponent").empty();
                $("#attack").empty();
                isOpponentReady = false;
                deadbudCounter++;
                if (deadbudCounter >= budArray.length - 1) {
                    $("#top-message").html("Yay! You win! <br> (and all your Buds are dead...)");
// TODO * SOUND * ANIMATE * MUSIC yay you won all your buds are dead
                    $("#budbank").empty();
                    $("#bud").empty();
                    $("#opponent").empty();
                    $("#enemybuds").empty();
                    $("#attack").empty();
                    $("#start").append(startButton);
                }
            }
        })
    });
});