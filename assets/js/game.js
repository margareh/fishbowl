---
title: game.js
---

// Load and randomize questions
var n = '{{ site.data.questions | size }}';
var rows = '{{ site.data.questions }}';
// '{% assign n = site.data.questions | size %}';
// '{% assign rows = site.data.questions | sample: n %}';
// var rows = '{{ site.data.questions | json }}';
var i = 0;

// Start the game
function start() {
    // set up 
    btn = document.getElementById("startBtn");
    btn.parentNode.removeChild(btn); // deletes the start game button
}

// Quit the game
function quit() {
    // go back to original setup
    document.getElementById("game").innerHTML = '<button id="startBtn" onclick="playGame()">Start the Game</button>';
}

// Show a question
function pickQ() {
    // Quit if we've gone through all of the questions
    if (i+1 >= n) {
        quit();
    }
    i = i+1;
    // return '{{ rows[i].text }}';
    return rows;
}

// Rate the question
function rateQuestion() {
    
}

// High-level function for playing the game
function playGame() {
    // start the game
    start();
    q = pickQ();

    // continue displaying this and picking new questions
    questionHtml = '<p><b>Question:</b> ' + q + '</p>';
    rateHtml = '<p><b>Rating:</b> </p>';
    nextBtnHtml = '<button id="nextBtn" onclick="q=pickQ();">Next</button>';
    quitBtnHtml = '<button id="quitBtn" onclick="quit();">Quit</button>';
    newHtml = questionHtml + rateHtml + nextBtnHtml + quitBtnHtml;
    document.getElementById("game").innerHTML = newHtml;

}
