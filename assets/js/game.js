---
title: game.js
---

// load the data
var n = '{{ site.data.questions | size }}';
var rows = JSON.parse('{{ site.data.questions | jsonify }}');
// '{% assign n = site.data.questions | size %}';
// '{% assign rows = site.data.questions | sample: n %}';
// var rows = '{{ site.data.questions | json }}';
var clicks = 0;
var q;
var game_init = false;

// randomize data
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

// Start the game
function start() {
    // set up 
    btn = document.getElementById("startBtn");
    btn.parentNode.removeChild(btn); // deletes the start game button
    d = document.getElementById("game");
    d.classList.add("game-play");
    d.classList.remove("game-start");
    shuffle(rows);
    game_init = true;

}

// Quit the game
function quit() {
    d = document.getElementById("game");
    d.classList.add("game-start");
    d.classList.remove("game-play");
    d.innerHTML = '<button class="game" id="startBtn" onclick="playGame()">Start the Game</button>';
    game_init = false;
}

// Show a question
function pickQ() {

    d = document.getElementById("game");

    // Quit if we've gone through all of the questions
    if (clicks+1 >= n) {
        d.innerHTML = '<p class="game">That\'s it! There are no more questions :(</p>';
        setTimeout(function(){quit();},1500);
        clicks = 0;
    } else {

        q = rows[clicks].text;
        r = rows[clicks].average_rating;
        if (rows[clicks].average_rating == null) {
            r = 'Not available';
        }
        clicks += 1;

        // stars = '<span class="fa fa-star"></span>';

        // continue displaying this and picking new questions
        questionHtml = '<p class="game"><b>Question:</b> ' + q + '<br/>';
        rateHtml = '<b>Rating:</b> '+ r +'</p><div class="buttons">';
        nextBtnHtml = '<button class="game" id="nextBtn" onclick="playGame()">Next</button>';
        quitBtnHtml = '<button class="game" id="quitBtn" onclick="quit()">Quit</button></div>';
        newHtml = questionHtml + rateHtml + nextBtnHtml + quitBtnHtml;
        d.innerHTML = newHtml;

    }
    
}

// Rate the question
function rateQuestion() {
    
}

// High-level function for playing the game
function playGame() {

    // start the game
    if (!game_init) {
        start();
    }
    pickQ();

}
