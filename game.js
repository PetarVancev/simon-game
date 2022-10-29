var level = 0;

var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  level++
  var c = 0;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);
}

function startOver(){
  level = 0;
  gamePattern = [];
}


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel] && currentLevel===(level-1))
  {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
  if(userClickedPattern[currentLevel]!==gamePattern[currentLevel])
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

$(document).keydown(function(){
  if(level === 0)
  {
  $("h1").text("Level" + level);
  nextSequence();
  }
});

$("[type = button]").click(function(event) {
  userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer((userClickedPattern.length-1));
});
