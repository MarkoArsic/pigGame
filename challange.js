/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


+ 3 CHALLANGESS!!!

Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/

var globalScores, roundScore, activePlayer, isGamePlaying, setMaxScore, previousDice, previousDice2;

init();
 

//ROLL BUTTON
document.querySelector('.btn-roll').addEventListener('click', function () {

    
    if(isGamePlaying){
        
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1 ;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        
        
            // 2. Display dices
            document.getElementById('dice-1').style.display = 'block';
            document.getElementById('dice-2').style.display = 'block';
            // 3.Display result
            document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
            document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        

            // 4. If one of dices is 1, Flush roundscore
            if(dice1 == 1 || dice2 == 1){
                roundScore = 0;
                document.querySelector('#current-' + activePlayer).textContent = '0';
                nextPlayer();     
            }// 5. Check for double 6, flush roundScore
            else if(dice1 === 6 && dice2 === 6){
                globalScores[activePlayer] = 0;
                document.querySelector( '#score-' + activePlayer ).textContent = '0';
                nextPlayer();
            }
            // 6. Update roundScore
            else {
                roundScore += dice1 + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                 
            }
        
            
        /*previousDice = dice;
        previousDice2 = dice2;   */ 
    }
});


// Button Hold
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(isGamePlaying){
        globalScores[activePlayer] += roundScore;
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = globalScores[activePlayer];
        
        getMaxScore ();
        
        //Check if the player won the game
        if(globalScores[activePlayer] >= setMaxScore){

            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            hideDice();           
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            isGamePlaying = false;
        }
        else{
        //Next Player
            nextPlayer();
        }  
        
    }
        
    
});


function nextPlayer(){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //hideDice();
}

//new game btn!
document.querySelector('.btn-new').addEventListener('click', init);


function init (){
    globalScores = [0,0];
    roundScore = 0;
    activePlayer = 0; //0-Player 1 ; 1-Player2
    isGamePlaying = true;
    hideDice();

    //sve na 0;!
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    
    
}
//
function getMaxScore (){
     //  Check if maxScore is entered, else default 100
        setMaxScore = document.querySelector('#userScore').value;
        if (!setMaxScore){
            setMaxScore = 100;
        }
        else{
            setMaxScore;
        }
}

function hideDice(){
    //querySelector za izmenu CSS-a!!, uklanja kockice
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    //********************class****cssstyle:display = none*/
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//querySelector za selektovanje(Seter) Id-a, textContent string dice kao text, ne kao html

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//innerHTML vraca HTML!

//querySelector cita (geter)
//var x = document.querySelector('#score-0').textContent;
//querySelector
//console.log(x);