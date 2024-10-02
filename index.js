var gamePattern=[];
var userPattern=[];
// var randomNum=nextSequence();
var level=0;
var gameOver=false;
function nextSequence(){
   if(gameOver==false){
   var gameColor=Math.floor(Math.random()*4);
   gamePattern.push(buttonColors[gameColor]);
   $("."+buttonColors[gameColor]).fadeOut(100).fadeIn(100);
   var audio=new Audio("/sounds/"+buttonColors[gameColor]+".mp3");
   audio.play();
   level++;
   $('h1').text("Level "+level);
   }else{
      $('h1').text("Press A Key to Start");
      gameOver=false;
   }
}

var buttonColors=["red", "blue", "green", "yellow"];

// var randomColor=buttonColors[randomNum];

$(".btn").click(function (event) {
   
   $("." + event.target.className.split(" ")[1]).fadeOut(100).fadeIn(100);

     var audio=new Audio("/sounds/"+event.target.className.split(" ")[1]+".mp3");
     audio.play();
     $(event.target).addClass("pressed");
     setTimeout(function(){
      $(event.target).removeClass("pressed");
  }, 100);
     userPattern.push(event.target.className.split(" ")[1]);
     if(level==userPattern.length){
        checkAnswer();
     }
})


$(document).keypress(function (event){
   console.log(event);
   nextSequence()
})
function checkAnswer(){
   var lastUser=userPattern[userPattern.length-1];
   var lastGame=gamePattern[gamePattern.length-1];
   if(lastUser!=lastGame){
      var audio=new Audio("/sounds/wrong.mp3");
      audio.play();
      $("body").addClass('game-over');
      setTimeout(() => {
         $("body").removeClass('game-over');
      }, 200);
      $('h1').text("Game Over, Press Any Key to Restart");
      gamePattern=[];
      level=0;
      gameOver=true;
   }else{
      console.log("Right")
   }
   setTimeout(() => {
      nextSequence();
   }, 1000);
   userPattern=[];
}
