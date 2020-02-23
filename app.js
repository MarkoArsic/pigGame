/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


+ 3 CHALLANGESS!!!

*/

var globalScores, roundScore, activePlayer, isGamePlaying, setMaxScore, previousDice;

init();
 

/*********************************** MDN events spisak argumenata******/
//select btn , ---------------> adding eventListener('event', akcija)
//ROLL BUTTON
document.querySelector('.btn-roll').addEventListener('click', function () {
    //Anonymous function, ne moze se koristiti na drugi nacin, samo je okida eventListener
    
    if(isGamePlaying){
        
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) +1 ; //random, zaoukruzeni broj
        
        
            // 2. Display result
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';//prikazuje sliku
            diceDOM.src = 'dice-' + dice + '.png';//rand var dice se appenduje na dice- string i dobija se ime fajla slike...


            // 3. Update roundScore IF the rolled number is NOT a 1
            if(dice == 1){
                //next player
                nextPlayer();
                
            }// Check two 6 rolls in a row
            else if(dice === 6 && previousDice === 6){
                //  Flush all score
                globalScores[activePlayer] = 0;
                document.querySelector( '#score-' + activePlayer ).textContent = '0';
                nextPlayer();


            }else {
                //add score
                //roundScore = roundScore + dice;
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                //broj activePlayer-a se appenduje na current- ID
                 
            }
        
            
        previousDice = dice;
    }
});


// Button Hold
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(isGamePlaying){
       //Add CURRENT score to GLOBAL score
        globalScores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = globalScores[activePlayer];
        
        // Gets entered max score
        getMaxScore ();
        
        //Check if the player won the game
        if(globalScores[activePlayer] >= setMaxScore){

            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';

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
        
        //document.querySelector('.dice').style.display = 'none';
}

//new game btn!
document.querySelector('.btn-new').addEventListener('click', init);


function init (){
    globalScores = [0,0];
    roundScore = 0;
    activePlayer = 0; //0-Player 1 ; 1-Player2
    isGamePlaying = true;
    //querySelector za izmenu CSS-a!!, uklanja kockice
    document.querySelector('.dice').style.display = 'none';
    //********************class****cssstyle:display = none*/

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

//document.querySelector('#current-' + activePlayer).textContent = dice;
//querySelector za selektovanje(Seter) Id-a, textContent string dice kao text, ne kao html

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//innerHTML vraca HTML!

//querySelector cita (geter)
//var x = document.querySelector('#score-0').textContent;
//querySelector
//console.log(x);