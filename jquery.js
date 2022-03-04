var action;//use for set interval function
var step;
var fruits=["1","2","3","4","5"];
var trialsleft;
var score;
var playing=false;
$(function(){
//click start reset button
$("#startreset").click(function(){
        //are we playing 
        if(playing==true){
            // reload page
            location.reload();

        }
        else{
            //we are not playing
            playing=true;//game intiated
        //set score to zero
        score=0;
        $("#scorevalue").html(score);
        //show trials left
        $("#trialsleft").show();
        trialsleft=3;
        addheart();
        //hide game over box
        $("#gameover").hide();
        //change button text to reset game
        $("#startreset").html("Reset game")
        //start sending fruits
        startaction();

        }
});

$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score);//update score
    $("#ssound")[0].play();//play sound
    //stop fruit and hide it 
    clearInterval(action);
    //hide fruit
    $("#fruit1").hide();//sclice fruit 
    //send new fruit
    startaction();
});


function addheart(){
    $("#trialsleft").empty();
    for(i=0;i<trialsleft;i++){
        $("#trialsleft").append('<img src="images/heart.png" class="life">');
    }
}
function startaction(){
    //generate a fruit
    $("#fruit1").show();
    choosefruit ();//choose random fruit
    $("#fruit1").css({"left":Math.round(500*Math.random()),"top":-50});//rondom fruit position
    //generate random step
   step=1+Math.round(5*Math.random());//change step
    //2.fruits move down one step every 10sec
    action =setInterval(function(){
        //move fruit1 by one step
        $("#fruit1").css("top",$("#fruit1").position().top + step );
        //check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitcontainer").height()){
            //check if we have trial left
            if(trialsleft>1){
                                //generate a fruit
                    $("#fruit1").show();
                    choosefruit ();//choose random fruit
                    $("#fruit1").css({"left":Math.round(500*Math.random()),"top":-50});//rondom fruit position
                    //generate random step
                    step=1+Math.round(4*Math.random());//change step
                    //reduce trials by one
                    trialsleft--;
                    //populate trialsleft box
                    addheart();
            }else{
                //game over
                playing=false;//we are not playing anymore
                $("#startreset").html("Start Game");//change to start game
                $("#gameover").show();
                $("#gameover").html("<p>game over</p><p>your score is "+score+"</p>");
                $("#trialsleft").hide();
                stopaction();

            }
        }
    },10);

}
//generate a random fruit
function choosefruit(){
    $("#fruit1").attr("src","images/"+ fruits[Math.round(4*Math.random())]+".png");
}
//stop dropping fruits
function stopaction(){
    clearInterval(action);
    $("#fruit1").hide();
}

});