/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score.
- After that, it's the next player's turn.
- Additionally, if a player rolls 2 6s in a row, his Global scores will become zero.
- The first player to reach the agreed winning points on GLOBAL score wins the game

*/
let score, roundScore, activePlayer, gamePlaying, diceRoll, winningScore;

var lastDiceT;
var lastDiceB;

init = () => {
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    diceRoll = [ ]
    gamePlaying = true;


    document.querySelector('.diceT').style.display = 'none';
    document.querySelector('.diceB').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}



nextPlayer = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    //update UI
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    //active button animation
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.diceT').style.display = 'none';
    document.querySelector('.diceB').style.display = 'none';
    diceRoll = [];

}

// rule2 = () => {
//     for (var i = 0; i < diceRoll.length; i++ ) {
//        if(diceRoll[i] === diceRoll[i+1]) {
//             score[activePlayer] = 0;
//             document.querySelector('#current-' + activePlayer).textContent = roundScore;
//             document.querySelector('#score-' + activePlayer).textContent = roundScore;
//         }
//     }
// }


// call the init function to reset screen
init()

document.querySelector('.btn-roll').addEventListener('click', function() {

   if (gamePlaying) {
        let diceT = Math.floor(Math.random() * 6) + 1;
        let diceB = Math.floor(Math.random() * 6) + 1;

        const diceDomT = document.querySelector('.diceT');
        diceDomT.style.display = 'block';
       diceDomT.src =  `./resources/dice-${diceT}.png`;

        const diceDomB = document.querySelector('.diceB');
        diceDomB.style.display = 'block';
       diceDomB.src = `./resources/dice-${diceB}.png`; 


        if ((diceT === 6 && lastDiceT === 6) || (diceB === 6 && lastDiceB === 6)) {
            score[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
            nextPlayer();
        } else if(diceT !== 1 && diceB !== 1) {
            roundScore += diceT + diceB;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        } else {
            nextPlayer()
        }

        //saving the last score
        lastDiceT = diceT;
        lastDiceB = diceB;
    }
});



document.querySelector('.btn-hold').addEventListener('click', function () {

   if(gamePlaying) {
        //add current score to global score
        score[activePlayer] += roundScore;
        //update the ui
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];

        //input score
       let inputScore = document.querySelector('.score-box').value;
        winningScore;

       if(inputScore) {
           winningScore = inputScore;
       } else {
           winningScore = 100;
       };

        //check if player won the game
        if (score[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.diceT').style.display = 'none';
            document.querySelector('.diceB').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        };
    }
});

document.querySelector('.btn-new').addEventListener('click', init);
