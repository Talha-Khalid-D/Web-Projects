// access all variables on which we want to make a change

// constants and variables
let userscore = 0;
let compscore = 0;
const selections = document.querySelectorAll(".selection");
const msg = document.querySelector("#msg");
const userscorepara = document.querySelector(".scoreuser");
const compscorepara = document.querySelector(".scorecomp");

// logic to generate the computer choice 
const gencompselection = ()=>{
    const options = ["rock","paper","scissors"];
    const randidx = Math.floor(Math.random() * 3);
    return options[randidx];
};

// methods and functions
selections.forEach((selection)=>{
    selection.addEventListener("click",()=>{
        const userselection = selection.getAttribute("id");
        playgame(userselection);
    });
});

// playgame logic

const playgame = (userselection)=>{
    const compselection = gencompselection();
    if (userselection === compselection){
        drawgame();
    }else{
        let userwin = true;
        if (userselection==="rock"){
            userwin = compselection === "paper" ? false:true; }else if (userselection==="paper"){
                userwin = compselection === "scissors" ? false:true;
            }   else{
                userwin = compselection === "rock" ? false:true;
            } 
        showwinner(userwin,userselection,compselection);}
};

// logic for updating the scoreboard as the game is played
// logic for game like who wins 
const drawgame = ()=>{
    msg.innerText = "Game was Draw. Play Again.";
    msg.style.backgroundColor = "#0813b1";
};

const showwinner = (userwin,userselection,compselection)=>{
    if(userwin){
        userscore++;
        userscorepara.innerText = userscore;
        msg.innerText = `You win! Your ${userselection} beats ${compselection}`
        msg.style.backgroundColor ="green";
    }else{
        compscore++;
        compscorepara.innerText = compscore;
        msg.innerText = `You lose! ${compselection} beats Your ${userselection}`
        msg.style.backgroundColor ="red";
    }
};

