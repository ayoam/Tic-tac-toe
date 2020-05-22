const gameWrapper = document.getElementById('game-wrapper');
const columnClass = document.querySelectorAll('.column');

let player1Turn =  true;
let gameEnd = false;


let player1Moves = []
let player2Moves = []


let player1Score = 0;
let player2Score = 0;

let moves = 0;

let startPlayer = 'player1';

let winningColumns = [
  ['1','2','3'],
  ['4','5','6'],
  ['7','8','9'],
  ['1','4','7'],
  ['2','5','8'],
  ['3','6','9'],
  ['1','5','9'],
  ['3','5','7'],
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function play(){
     gameWrapper.addEventListener('click',(e)=>{
       if(startPlayer === 'player1'){
        if(gameEnd === false) {
          if(e.target.classList.contains('column')){
            if(player1Turn === true ){
              let img = document.createElement('img')
              img.src="x.png"; 
              img.className = `x`;
              img.id = e.target.id;
              player1Moves.push(e.target.id);
              moves++;
              e.target.appendChild(img);
              e.target.classList
              player1Turn = false;
              checkWinner();
              changePlayer();
              checkTie();
              
             } else if(player1Turn === false){
              let img = document.createElement('img')
              img.src="o.png"; 
              img.className = `o`;
              img.id = e.target.id;
              player2Moves.push(e.target.id);
              moves++;
              e.target.appendChild(img);
              player1Turn = true;
              checkWinner();
              changePlayer();
              checkTie();
             } 
            } 
         

    } 
       } else if(startPlayer === 'player2'){
        if(gameEnd === false) {
          if(e.target.classList.contains('column')){
            if(player1Turn === false ){
              let img = document.createElement('img')
              img.src="x.png"; 
              img.className = `x`;
              img.id = e.target.id;
              player1Moves.push(e.target.id);
              moves++;
              e.target.appendChild(img);
              player1Turn = true;
              checkWinner();
              changePlayer();
              checkTie();
              
             } else if(player1Turn === true){
              let img = document.createElement('img')
              img.src="o.png"; 
              img.className = `o`;
              img.id = e.target.id;
              player2Moves.push(e.target.id);
              moves++;
              e.target.appendChild(img);
              player1Turn = false;
              checkWinner();
              changePlayer();
              checkTie();
             } 
            } 
    } 
      }

  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////


function checkWinner(){
   for(let i = 0 ; i < winningColumns.length ; i++){
     if((player1Moves.indexOf(winningColumns[i][0]) > -1) && (player1Moves.indexOf( winningColumns[i][1]) > -1) && (player1Moves.indexOf( winningColumns[i][2]) > -1)){

      loserEffects();  
      document.getElementById(winningColumns[i][0]).firstElementChild.classList.remove('win');     
      document.getElementById(winningColumns[i][1]).firstElementChild.classList.remove('win');  
      document.getElementById(winningColumns[i][2]).firstElementChild.classList.remove('win');  
      
      document.getElementById(winningColumns[i][0]).firstElementChild.classList.add('blink_me');     
      document.getElementById(winningColumns[i][1]).firstElementChild.classList.add('blink_me'); 
      document.getElementById(winningColumns[i][2]).firstElementChild.classList.add('blink_me');
       
       document.getElementById('res-text').innerText = 'Player 1 wins';
       document.getElementById('div2').style.display = 'flex';
       player1Score++;
       document.getElementById('player1').innerHTML = `<i class="play1 fas fa-caret-down"></i> <p>Player 1 : <br> <span>${player1Score}</span></p>`
       gameEnd = true;
      
       togglePlayer();

      document.getElementById('play-again').onclick = ()=>{
        reset();
       }

      } 
      
      else if((player2Moves.indexOf(winningColumns[i][0]) > -1) && (player2Moves.indexOf( winningColumns[i][1]) > -1) && (player2Moves.indexOf( winningColumns[i][2]) > -1)){
         
        loserEffects();  
        document.getElementById(winningColumns[i][0]).firstElementChild.classList.remove('win');     
        document.getElementById(winningColumns[i][1]).firstElementChild.classList.remove('win');  
        document.getElementById(winningColumns[i][2]).firstElementChild.classList.remove('win');  
        
        document.getElementById(winningColumns[i][0]).firstElementChild.classList.add('blink_me');     
        document.getElementById(winningColumns[i][1]).firstElementChild.classList.add('blink_me'); 
        document.getElementById(winningColumns[i][2]).firstElementChild.classList.add('blink_me');
      
        document.getElementById('res-text').innerText = 'Player 2 wins';
        document.getElementById('div2').style.display = 'flex';
        player2Score++;
        document.getElementById('player2').innerHTML = `<i class="play2 fas fa-caret-down"></i> <p>Player 2 : <br> <span>${player2Score}</span></p>`

        gameEnd = true;

        togglePlayer();

        document.getElementById('play-again').onclick = ()=>{
        reset();
       }

     } 

   }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkTie(){
   if(moves === 9 && gameEnd === false){

        document.getElementById('res-text').innerText = 'tie';
        document.getElementById('player2').style.opacity= 1;
        document.getElementById('player1').style.opacity= 1;
        document.querySelector('.play1').style.opacity = 0;
        document.querySelector('.play2').style.opacity = 0;
                  
        document.getElementById('play-again').onclick = ()=>{
        reset();
       }
       
       document.getElementById('div2').style.display = 'flex';

       loserEffects();  
       togglePlayer();
   }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function reset(){
   for(let i = 0 ; i < 9 ;i++){
    columnClass[i].innerHTML="";
   }
   player1Moves = [];
   player2Moves = [] ;
   moves = 0;
   gameEnd = false;
   player1Turn =  true;
   document.getElementById('div2').style.display = 'none';
    
   changePlayer();
}

//////////////////////////////////////////////////////////////////////////////////////////////////

function changePlayer(){

  const player1 = document.getElementById('player1');
  const player2 = document.getElementById('player2');
  const play1 = document.querySelector('.play1');
  const play2 = document.querySelector('.play2');

  if(startPlayer === 'player1'){
    if(gameEnd === false && player1Turn === true){
      player2.style.opacity= 0.6;
      player1.style.opacity= 1;
      play1.style.opacity = 1;
      play2.style.opacity = 0; 
    } else if(gameEnd === false && player1Turn === false){
      player2.style.opacity= 1;
      player1.style.opacity= 0.6;
      play2.style.opacity = 1;
      play1.style.opacity = 0;
    }
  } else if(startPlayer === 'player2'){
    if(gameEnd === false && player1Turn === true){
      player1.style.opacity= 0.6;
      player2.style.opacity= 1;
      play2.style.opacity = 1;
      play1.style.opacity = 0;
    } else if(gameEnd === false && player1Turn === false){
      player1.style.opacity= 1;
      player2.style.opacity= 0.6;
      play2.style.opacity = 0;
      play1.style.opacity = 1; 
    }
  }

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function togglePlayer(){
  if(startPlayer === 'player1'){
    startPlayer = 'player2';
  } else if(startPlayer === 'player2'){
    startPlayer = 'player1';
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loserEffects(){

  for(let j = 0 ; j < player1Moves.length ; j++){
    let x = document.querySelectorAll('.x');
      x[j].classList.add("win");
      }
  for(let y = 0 ; y < player2Moves.length ; y++){
        let o= document.querySelectorAll('.o');
          o[y].classList.add("win");
          }  

}

////////////////////////////////////////////////////////////////////////////////////////

play();

