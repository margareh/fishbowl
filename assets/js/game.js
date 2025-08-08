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

// Start the game
function start() {
    // set up 
    btn = document.getElementById("startBtn");
    btn.parentNode.removeChild(btn); // deletes the start game button
    game_init = true;

}

// Quit the game
function quit() {
    // go back to original setup
    document.getElementById("game").innerHTML = '<button id="startBtn" onclick="playGame()">Start the Game</button>';
}

// Show a question
function pickQ() {
    // Quit if we've gone through all of the questions
    if (clicks+1 >= n) {
        quit();
    }
    
    q = rows[clicks].text;
    r = rows[clicks].average_rating;
    if (rows[clicks].average_rating == null) {
        r = 'Not available';
    }
    clicks += 1;

    // continue displaying this and picking new questions
    questionHtml = '<p><b>Question:</b> ' + q + '</p>';
    rateHtml = '<p><b>Rating:</b> '+ r +'</p>';
    nextBtnHtml = '<button id="nextBtn" onclick="playGame()">Next</button>';
    quitBtnHtml = '<button id="quitBtn" onclick="quit()">Quit</button>';
    newHtml = questionHtml + rateHtml + nextBtnHtml + quitBtnHtml;
    document.getElementById("game").innerHTML = newHtml;
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
