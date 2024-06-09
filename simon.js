//Upon loading the page, any key will call the main game function!
$(document).keydown(function(){
    playSimon();
})

function playSimon() {

    //Create empty arrays for Simon's pattern and the Player's pattern. Also create a new sound object for the button sounds!
    var pattern = [];
    var playerPattern = [];
    var buttonSound = new Audio();

    
    greenSound = new Audio(src="./resources/sounds/green.wav"),
    redSound = new Audio(src="./resources/sounds/red.wav"),
    yellowSound = new Audio(src="./resources/sounds/yellow.wav"),
    blueSound = new Audio(src="./resources/sounds/blue.wav"),
    

    //Add the first color to Simon's pattern
    pattern.push(newSequence());

    //Remove the keydown listener, locking the game-state to "on"
    $(document).off("keydown");
    //Change the text of the headers accordingly
    $("#main-header").text("Simon Says Play");
    $("#level-title").text("Round " + (pattern.length));

    //Flash Simon's initial pattern (only one button flashes here!)
    flashSequence(0);
    //Switch on the buttons click listeners
    buttonClick();

    function buttonClick(){
        //This function adds 'click' event listeners to the button elements!
        $(".button").click(function(event){
        //Create a string from the target buttons class (color)
        clickedButton = "." + event.target.classList[1]
        //Call buttonFlash and pass in that string
        buttonFlash(clickedButton);
        //Add that string (color) to the player pattern
        playerPattern.push(clickedButton);
        //Call checkAnswer at the current array index
        checkAnswer(playerPattern.length - 1);
        
    })
        
    }

    function flashSequence(index) {
        //I used Codeium (chatGPT) to write this function. It recursively flashes Simon's sequence!
        if (index < pattern.length) {
            buttonFlash(pattern[index]);
            setTimeout(function() {
                flashSequence(index + 1);
            }, 500);
        }
    }

    function checkAnswer(currentLevel){
        //This function checks the player's input against Simon's pattern. Called every button click!
        if (playerPattern[currentLevel] != pattern[currentLevel]){
            gameOver();
            return;
        } 
        
        if (playerPattern[currentLevel] === pattern[currentLevel]){
            if (playerPattern.length === pattern.length){
                pattern.push(newSequence());
                playerPattern.length = 0;
                $("#level-title").text("Round " + (pattern.length));

                setTimeout(function(){flashSequence(0)}, 1000);
                return;
            }
        }
        
           
    }

    function gameOver(){
        //This function is called when checkAnswer fails. It resets everything and flashes the background red!
        pattern = []
        playerPattern = []

        //Disable the button click listeners
        $(".button").off("click");

        $("#main-header").text("GAME OVER - Press Any Key to Restart ");
        $("#level-title").text("");

        buttonSound.src="./resources/sounds/gameover.wav";
        buttonSound.play();

        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")}, 1200);

        //Adds a keydown listener to restart the game!
        $(document).keydown(function(){
            $("#main-header").text("Simon Says Play");
            

            pattern.push(newSequence());
            $("#level-title").text("Round " + (pattern.length));

            setTimeout(function(){flashSequence(0)}, 1200);

            //Removes the keydown listener
            $(document).off("keydown");
            //Re-enable the button click listeners
            buttonClick();
            
        })

    }

    function buttonFlash(button){
        //This function animates the buttons. Background flashes white and borders wiggle.
        $(button).addClass("flash");

        //Border wiggle. 
        $(button).animate({"border-width": "4px"}, 100, function() {
            $(this).animate({"border-width": "8px"}, 100);
            $(this).animate({"border-width": "2px"}, 50);
            $(this).animate({"border-width": "8px"}, 25);
        });

        //Also plays the sound effects (made them myself with Ableton's Analog instrument.)
        //Sounds play an FMaj7 chord. The gameover sound is an E, a half step down, making the user want to hear the F again!
        //I decided to load all the sounds into seperate objects and use a switch statement to trigger them. 

        switch (button){
            case ".green":
                greenSound.play();
                break;
            case ".red":
                redSound.play();
                break;
            case ".yellow":
                yellowSound.play();
                break;
            case ".blue":
                blueSound.play();
                break;
            default:
                break;
        }

        // buttonSound.src = `./resources/sounds/${colorSound}.wav`;
        // buttonSound.play();

        setTimeout(function(){
            $(button).removeClass("flash")
        }, 200)
    }

}

function newSequence(){
    //This function returns a random color to push into Simon's pattern!
    var buttons = [".green", ".red", ".yellow", ".blue"];
    var randomNumber = Math.floor(Math.random()*4);
    var newColor = buttons[randomNumber];
    
    return newColor;

}







