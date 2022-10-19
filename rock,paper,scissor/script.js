const playerScore=document.getElementById("playerScore");
const playerChoice=document.getElementById("playerChoice");

const computerScore=document.getElementById("computerScore");
const computerChoice=document.getElementById("computerChoice");

const playerRock = document.getElementById("playerRock");
const playerPaper = document.getElementById("playerPaper");
const playerScissor = document.getElementById("playerScissor");

const computerRock = document.getElementById("computerRock");
const computerPaper = document.getElementById("computerPaper");
const computerScissor = document.getElementById("computerScissor");

const info = document.getElementsByClassName("info");
const allGameImg = document.querySelectorAll("img");

const screen = document.querySelector(".screen");
playerscore=0;
computerscore=0;

const win_info = document.querySelector(".win_info"); 
const tie_info = document.querySelector(".tie_info"); 
const lost_info = document.querySelector(".lost_info"); 

const selections = {
    Rock:{name:"Rock",defeat:"Scissors"},
    Paper:{name:"Paper",defeat:"Rock"},
    Scissors:{name:"Scissors",defeat:"Paper"}
};

let computerSelect = "";

// Random Selection of computer and displaying computer choice

function computerRandomSelect(){
    const computerSelectNumber = Math.floor(Math.random()*3+1);
    if(computerSelectNumber==1){
        computerSelect="Rock";
        computerRock.classList.add("shadow");
        computerChoice.textContent = "--Rock"
    }   
    else if (computerSelectNumber==2){
        computerSelect="Paper";
        computerPaper.classList.add("shadow");
        computerChoice.textContent = "--Paper"
    } 
    else{
        computerSelect="Scissor";
        computerScissor.classList.add("shadow");
        computerChoice.textContent = "--Scissor"
    }
}

//reset selected
function resetSelected(){
    allGameImg.forEach((img)=>{
        img.classList.remove('shadow');
    })
}

// Select function which runs when user click rock paper or scissor

function select(playerSelect){
    resetSelected();
    win_info.style.display = "none";
    tie_info.style.display = "none";
    lost_info.style.display = "none";
    switch(playerSelect){
        case 'Rock':
            playerRock.classList.add("shadow");
            playerChoice.textContent = "--Rock"
            break;
        case 'Paper':
            playerPaper.classList.add("shadow");
            playerChoice.textContent = "--Paper"
            break;
            case 'Scissor':
            playerScissor.classList.add("shadow");
            playerChoice.textContent = "--Scissor"
            break;
            default:
                break;
    }
    computerRandomSelect();
    updateSCore(playerSelect);
}

//update score
function updateSCore(playerSelect){
    over();

    if(((playerSelect=="Rock")&&(computerSelect=="Scissor"))||((playerSelect=="Paper")&&(computerSelect=="Rock"))||
    ((playerSelect=="Scissor")&&(computerSelect=="Paper"))){
        playerscore++;
        playerScore.textContent = playerscore;
        screen.style.background = "green";
        win_info.style.display = "block";
    }
    else if(playerSelect===computerSelect){
        screen.style.background = "white";
        tie_info.style.display = "block";
    }
    else{
        computerscore++;
        computerScore.textContent = computerscore;
        screen.style.background = "red";
        lost_info.style.display = "block";
    }
}

function over(){
    if(computerscore == 5){
        alert("Computer won");
        location.reload();
    }
    else if(playerscore == 5){
        alert("Player won");
        location.reload();
    }
};

