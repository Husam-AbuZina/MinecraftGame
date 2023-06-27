let currentMoleTile;
let currentPlantTile;
let score =0;
let gameOver = false;
let highScore = 0
    

//  ----------------------- Timer ----------------------- || Variables for the Timer 
const startingMinutes = 2; 
let time = 3; //startingMinutes * 60; // This makes the timer look smooth at the beginning.

const countdownEl = document.getElementById('countdown');
let countdownInterval;

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    countdownEl.innerHTML = `${minutes}:${seconds}`;

    if (time <= 0) {
        clearInterval(countdownInterval);
        // Timer reached zero, do something here
        countdownEl.innerHTML = "0:00";
        gameOver = true;
    } else {
        time--;
    }
}  
// Start the interval
countdownInterval = setInterval(updateCountdown, 1000);
// ----------------------- Timer -----------------------



window.onload = function(){
    setGame();
}

function setGame(){
    //set up the grid for the game board in html
    for(let i = 0; i < 9; i++){ // i is going from 0 ---> 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        
        tile.addEventListener("click", selectTile);

        document.getElementById("board").appendChild(tile); 
    }


    
    // Call the updateCountdown function once to start the timer
    updateCountdown();

    setInterval(setMole, 1000); // 1000 milliseconds - 1 seconds.
    setInterval(setPlant, 2000); // 2000 milliseconds - 2 seconds.
}

function getRandomTile() {
    // math.random ---> (0-1) * 9 = (0 = 9) ---> round down to (0 - 8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole(){

    if(gameOver) { //stop the player from interacting with the websites
        // alert('You Are Killed  :O');
        // score = 0;
        return;
    }

    if(currentMoleTile){
        currentMoleTile.innerHTML=""; // clean the Mole when generating another random mole.
    }

    let mole = document.createElement("img");
    mole.src = "./gold.png";

    let num = getRandomTile();

    if(currentPlantTile && currentPlantTile.id == num){// to prevent the mole and the plant from showing on the same pipe at the same time.
    return; //this line would also result in showing either only the mole or the plant, because only must show at a time.
    }

    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);
}

function setPlant(){
    
    if(gameOver) { //stop the player from interacting with the websites
        // alert('You Are Killed  :O');
        // score = 0;
        return;
    }

    if(currentPlantTile){
        currentPlantTile.innerHTML="";
    }
    
    let plant = document.createElement("img");
    plant.src = "./enderman.png";

    let num = getRandomTile();

    if(currentMoleTile && currentMoleTile.id ==num){ // to prevent the mole and the plant from showing on the same pipe at the same time.
        return;
    }

    currentPlantTile = document.getElementById(num);
    currentPlantTile.appendChild(plant);
}


function selectTile() {

    if(gameOver) { //stop the player from interacting with the websites
        // alert('You Are Killed  :O');
        // score = 0;
        return;
    }

    if(this == currentMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); // update the score
    }
    else if (this == currentPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        if (highScore <= score){
            highScore = score;
            document.getElementById("highScore").innerText = highScore.toString(); // update the highScore
        }
        // gameOver = true;
        score = 0;
    }

}
