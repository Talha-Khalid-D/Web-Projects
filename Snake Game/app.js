// constants and variables
// directon and movement manging of snake
let inputdir = {x:0,y:0};

// for playing sounds while game is running
const foodsound = new Audio("food.mp3");
const gameoversound = new Audio("gameover.mp3");
const movesound = new Audio("move.mp3");
const musicsound = new Audio("music.mp3");

// for loading different frames on browser
let lastpainttime = 0;

// we can adjust the speed movement of the snake
let speed = 9;

// create score to show the user score the user score while playing 
let score = 0;

// intial positon of snake for display |  snake is a array as its length is going to increase and increment in array would be easy
let snakearr =[ { x: 13 , y: 15 } ];

// intial position of food  | food is going to be object which will occur in board at randow position 
food = { x: 6 , y: 7 } ;


// methods and functions
// frame loading function  
function main(ctime){
    // ctime = currenttime
    window.requestAnimationFrame(main);
    // for controling fps rendering of frames on screen 
    if ((ctime - lastpainttime)/1000 < 1/speed){
        return;
    }
    lastpainttime = ctime;
    gameEngine();
}

// collapsing function | situation of collapsing: bump into itself & colliding into board wall 
function iscollapse(snake){
// for bumping into itself | use a for loop which runs for all the length of snake and check if the bump into any of the segments of snake 
    for (let i = 1; i< snakearr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
// for bumping into board border | use if conditions with "or" operators so when bumped into any of the border the game stops  
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    return false;
}

// game intializing function 
// what game actually is updating the snake length when snake eats food and placing the food at random places in board
// Game Parts: 2 , updating the snake and food & displaying the food the snake 
function gameEngine(){

// Part 1 : Updating the snake and 
// condition for game over | when will the snake update its length , where will the food appears and when will the game ends 
    if (iscollapse(snakearr)){
        gameoversound.play();
        musicsound.pause();
        inputdir = { x: 0 , y: 0 };
        alert("Game Over! Press Any key to start the Game Again.");
        snakearr= [ { x: 13 , y: 15 } ];
        musicsound.play();
        score = 0;
    }

// Updating the snake
    if ( snakearr[0].y === food.y && snakearr[0].x === food.x ){
        foodsound.play();
        score += 1;
        scorebox.innerHTML = "Score: " + score;
        snakearr.unshift({x: snakearr[0].x + inputdir.x , y: snakearr[0].y + inputdir.y } );
        let a = 2;
        let b = 16;
        food = {x: Math.round( a + (b - a ) * Math.random() ) , y: Math.round( a + ( b - a ) * Math.random())}
    }


// using the for loop to increment segments of the snake
    for (let i = snakearr.length - 2 ; i >= 0 ; i--){
// destructuring object to avoid referency problem ({...})
        snakearr[i + 1] = {...snakearr[i]};
    }
    
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;

// Part 2 : Display the snake and food 

// Display the snake
     board.innerHTML = "";
     snakearr.forEach((e, index)=>{
        snakeElement = document.createElement( 'div' );
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0){
            snakeElement.classList.add( 'head' );
        }else{
            snakeElement.classList.add( 'snake' );
        }
        board.appendChild(snakeElement);
     });

// Display the food 
     foodElement = document.createElement( 'div' );
     foodElement.style.gridRowStart = food.y;
     foodElement.style.gridColumnStart = food.x;
     foodElement.classList.add( 'food' );
     board.appendChild(foodElement);

}

// main logic of game starts here 

musicsound.play();

// frames loading for again and again painting screen  
window.requestAnimationFrame(main);
// when will the game start , event listener for this 
// add event listener for keys pressed on the keyboard
window.addEventListener('keydown', e =>{
// to start the game the input direction 
    inputdir={ x: 0, y: 1 };

// play the move sound as the snake moves
    movesound.play();

// on catch the keys pressed from the keyboard
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;
    }
});