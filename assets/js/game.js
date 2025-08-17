// variable definitions
var clicks = 0;
var data, sheet_data, n;
var game_init = false;
var rating_made = false;
var ratings_url = 'https://docs.google.com/spreadsheets/d/1XUFT81fWkYLyo4CMqjqrQDiAwZPBxPIAs9KQnb8myhs/edit?gid=525843178#gid=525843178'; // for saving ratings

// Randomize data
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

    // parse data into array
    rows = document.getElementById("data_table");
    sheet_data = Array.prototype.map.call(rows.querySelectorAll("tr"), function(tr){
        return Array.prototype.map.call(tr.querySelectorAll("td"), function(td){
            return td.innerHTML;
        });
    });
    shuffle(sheet_data);
    n = sheet_data.length;

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

        q = sheet_data[clicks][1];
        f = sheet_data[clicks][2];

        stars = '<div class="rating">'
        for (let i = 4; i >= 0; i--){
            stars += '<span class="star pre" onclick="rateQuestion('+(i+1)+','+clicks+')">&#9734;</span>';
        }
        stars += '</div>';

        // continue displaying this and picking new questions
        questionHtml = '<p class="game"><b>Question:</b> ' + q + '</p>';
        if (f.length > 0) {
            extraHtml = '<div class="addtl"><button class="addtl" onclick="addtlInfo()">Follow-ups</button><p class="hidden game" id="dropTxt">'+f+'</p></div>';
        } else {
            extraHtml = '';
        }
        nextBtnHtml = '<div class="buttons"><button class="game" id="nextBtn" onclick="playGame()">Next</button>';
        quitBtnHtml = '<button class="game" id="quitBtn" onclick="quit()">Quit</button></div>';
        newHtml = questionHtml + extraHtml + stars + nextBtnHtml + quitBtnHtml;
        d.innerHTML = newHtml;

        clicks += 1;

    }
    
}

// Show additional info
function addtlInfo() {
    document.getElementById("dropTxt").classList.toggle("show");
    document.getElementById("dropTxt").classList.toggle("hidden");
}

// Rate the question
function rateQuestion(n, id) {

    // this if statement ensures we only take one rating per question visi
    if (!rating_made) {

        stars = document.getElementsByClassName("star");

        // reset class names
        let i = 0;
        while (i < 5) {
            stars[i].className = "star";
            i++;
        }

        // add coloring
        i = 4;
        while (i > (4-n)) {
            stars[i].classList.add("active");
            i--;
        }
        while (i >= 0) {
            stars[i].classList.add("inactive");
            i--;
        }

        // Update and submit form
        document.getElementById("rating_id").value = id;
        document.getElementById("rating_value").value = n;
        document.getElementById("rating_sheet_name").value = "Ratings";
        document.getElementById("rating_form").submit();

        // Flag rating as being submitted so users can't do this twice
        rating_made = true;

    }

}

// High-level function for playing the game
function playGame() {

    // start the game
    if (!game_init) {
        start();
    }

    // reset ratings flag
    rating_made = false;
    pickQ();

}
