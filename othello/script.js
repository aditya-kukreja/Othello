
    const board = new Array(8);

    for (var i = 0; i < board.length; i++) {
      board[i] = new Array(8);
    }
    
    for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
    board[i][j] = '.';
    board[3][3] = 'X';
    board[3][4] = 'O';
    board[4][3] = 'O';
    board[4][4] = 'X';
    
    
function checkFlip(board2, x, y, deltaX,deltaY, 
         myPiece, opponentPiece)
{
    if (board2[x][y] == opponentPiece)       //opponentPiece
{
    while ((x >= 0) && (x < 8) && (y >= 0) && (y < 8))
       {
       x += deltaX;
       y += deltaY;

       if(x<0||y<0||x>=8||y>=8)
       return false;

       if (board2[x][y] == '.') // not consecutive
       return false; 
       if (board2[x][y] == myPiece)
       return true; // At least one piece we can flip
       else
       {
       // It is an opponent piece, just keep scanning in our direction
       }
       }
     }
       return false; // Either no consecutive opponent pieces or hit the edge
}    

function makeMove(board2, x, y, piece)
{let classname="wcircle"
if(piece=='O')
classname="bcircle"
// Put the piece at x,y
board2[x][y] = piece;

let arrtonum=(8*x)+y;
 let ide=arrtonum.toString();
 document.getElementById(ide).classList.add(classname);

// Figure out the character of the opponent's piece
let opponent = 'O';
if (piece == 'O')
opponent = 'X';
// Check to the left
if (x!=0&&checkFlip(board2, x - 1, y, -1, 0, piece, opponent))
flipPieces(board2, x - 1, y, -1, 0, piece, opponent);
// Check to the right
if (x!=7&&checkFlip(board2, x + 1, y, 1, 0, piece, opponent))
flipPieces(board2, x + 1, y, 1, 0, piece, opponent);
// Check down
if (y!=0&&checkFlip(board2, x, y-1, 0, -1, piece, opponent))
flipPieces(board2, x, y-1, 0, -1, piece, opponent);
// Check up
if (y!=7&&checkFlip(board2, x, y + 1, 0, 1, piece, opponent))
flipPieces(board2, x, y + 1, 0, 1, piece, opponent);
// Check down-left
if (x!=0&&y!=0&&checkFlip(board2, x-1, y - 1, -1, -1, piece, opponent))
flipPieces(board2, x-1, y - 1, -1, -1, piece, opponent);
// Check down-right
if (x!=7&&y!=0&&checkFlip(board2, x + 1, y - 1, 1, -1, piece, opponent))
flipPieces(board2, x + 1, y - 1, 1, -1, piece, opponent);
// Check up-left
if (x!=0&&y!=7&&checkFlip(board2, x - 1, y + 1, -1, 1, piece, opponent))
flipPieces(board2, x - 1, y + 1, -1, 1, piece, opponent);
// Check up-right
if (x!=7&&y!=7&&checkFlip(board2, x + 1, y + 1, 1, 1, piece, opponent))
flipPieces(board2, x + 1, y + 1, 1, 1, piece, opponent);
}

 



function validMove(board2, x, y, piece)
{
// Check that the coordinates are empty
if (board2[x][y] != '.')
return false;
// Figure out the character of the opponent's piece
let opponent = 'O';
if (piece != 'X')
opponent = 'X';
// If we can flip in any direction, it is valid
// Check to the left

if (x!=0&&checkFlip(board2, x - 1, y, -1, 0, piece, opponent))
return true;
// Check to the right
if (x!=7&&checkFlip(board2, x + 1, y, 1, 0, piece, opponent))
return true;
// Check down
if (y!=0&&checkFlip(board2, x, y - 1, 0, -1, piece, opponent))
return true;
// Check up
if (y!=7&&checkFlip(board2, x, y + 1, 0, 1, piece, opponent))
return true;
// Check down-left
if (x!=0&&y!=0&&checkFlip(board2, x - 1, y - 1, -1, -1, piece, opponent))
return true;
// Check down-right
if (x!=7&&y!=0&&checkFlip(board2, x + 1, y - 1, 1, -1, piece, opponent))
return true;
// Check up-left
if (x!=0&&y!=7&&checkFlip(board2, x - 1, y + 1, -1, 1, piece, opponent))
return true;
// Check up-right
if (x!=7&&y!=7&&checkFlip(board2, x + 1, y + 1, 1, 1, piece, opponent))
return true;
return false; // If we get here, we didn't find a valid flip direction
}

function displaylegalmoves(player)
       {  if(player=='O')
        {
        for(let i=0;i<8;i++)
        {
          for(let j=0;j<8;j++)
          {     let arrtonum=(8*i)+j;
                  let ide=arrtonum.toString();
                  document.getElementById(ide).classList.remove("legalmove");
                  if(validMove(board,i,j,player))
                  document.getElementById(ide).classList.add("legalmove");

            }
            
        }

        }

       else {for(let i=0;i<8;i++)
         {
           for(let j=0;j<8;j++)
          {     let arrtonum=(8*i)+j;
                   let ide=arrtonum.toString();
                  document.getElementById(ide).classList.remove("legalmove");
                  

             }
            
         }

       }
    }




function getMoveList(board2, moveX,moveY, numMoves,piece)
{
numMoves.moveCount = 0; // Initially no moves found
// Check each square of the board and if we can move there, remember the coords
for (let x = 0; x < 8; x++)
for (let y = 0; y < 8; y++)
{
if (validMove(board2, x, y, piece)) // remember coordinates
{
moveX[numMoves.moveCount] = x;
moveY[numMoves.moveCount] = y;
numMoves.moveCount++; // Increment number of moves found
}
}
}


function gameOver(board2)
{
var XMoveX=[];
var XMoveY=[];
var OMoveX=[];
var OMoveY=[];
var numXMoves = {
  moveCount: 0
}
var numOMoves = {
  moveCount: 0
}

getMoveList(board2, XMoveX, XMoveY, numXMoves, 'X');
getMoveList(board2, OMoveX, OMoveY, numOMoves, 'O');
if ((numXMoves.moveCount == 0) && (numOMoves.moveCount == 0))
return true;
return false;
}

function score(board2,piece)
{
let total = 0;
for (let x = 0; x < 8; x++)
for (let y = 0; y < 8; y++)
{
if (board2[x][y] == piece)
{if(x==0&&y==0||x==7&&y==0||x==0&&y==7||x==7&&y==7)
total=total+3
else if(((board2[0][0]!=piece)&&(x==0&&y==1||x==1&&y==1||x==1&&y==0))||((board2[7][0]!=piece)&&(x==7&&y==1||x==6&&y==0||x==6&&y==1))||((board2[7][7]!=piece)&&(x==7&&y==6||x==6&&y==6||x==6&&y==7))||((board2[0][7]!=piece)&&(x==0&&y==6||x==1&&y==6||x==1&&y==7)))
total=total-1
else if(x==0||y==0||x==7||y==7)
total=total+1.5
else total++

}
}
return total;
}


function flipPieces(board2,x,y,deltaX,deltaY,myPiece,opponentPiece)
 {
 while (board2[x][y] == opponentPiece)
 { let classname="wcircle"
   if(myPiece=='O')
   classname="bcircle"
 board2[x][y] = myPiece;
 let arrtonum=(8*x)+y;
 let ide=arrtonum.toString();
 document.getElementById(ide).classList.remove("bcircle");
 document.getElementById(ide).classList.remove("wcircle");
 document.getElementById(ide).classList.add(classname);
 x += deltaX;
 y += deltaY;
 }
 }
 
 function heuristic(board2,whoseTurn)
 {
 let opponent = 'O';
 if (whoseTurn == 'O')
 opponent = 'X';
 let ourScore = score(board2, whoseTurn);
 let opponentScore = score(board2, opponent);
 return (ourScore - opponentScore);
 }


  displaylegalmoves('O')

 const cellElements= document.querySelectorAll('[data-cell]')
let circleTurn=1



cellElements.forEach(cell => {
cell.addEventListener('click', handleClick, {once:true})    
})


function handleClick(e)
{  
   const cell=e.target
   console.log(cell.id)
  
   
   placeMark(cell, "bcircle")
   
   document.querySelector(".scorewhite").innerHTML= `White's score is: ${scoreboard(board,'X')}` 
   document.querySelector(".scoreblack").innerHTML= `Black's score is: ${scoreboard(board,'O')}`
  
   
   displaylegalmoves('X') 
   let moveX=[]
   let moveY=[]
   let numMoves={
     moveCount: 0
   }
   getMoveList(board,moveX,moveY,numMoves,'X')
   if(numMoves.moveCount==0)
   displaylegalmoves('O')
   else
  {var delayInMilliseconds = 300; //0.3 seconds
  setTimeout(function() {
  minimaxDecision(board,'X')
  document.querySelector(".scorewhite").innerHTML= `White's score is: ${scoreboard(board,'X')}` 
  document.querySelector(".scoreblack").innerHTML= `Black's score is: ${scoreboard(board,'O')}`
  displaylegalmoves('O')}
      , delayInMilliseconds);
  

  getMoveList(board,moveX,moveY,numMoves,'O')
  if(numMoves.moveCount==0)
  {displaylegalmoves('X')
  var delayInMilliseconds = 300; //0.3 seconds
  setTimeout(function() {
  minimaxDecision(board,'X')
  document.querySelector(".scorewhite").innerHTML= `White's score is: ${scoreboard(board,'X')}` 
  document.querySelector(".scoreblack").innerHTML= `Black's score is: ${scoreboard(board,'O')}`
  displaylegalmoves('O')}
      , delayInMilliseconds);
  }
  getMoveList(board,moveX,moveY,numMoves,'O')
  if(numMoves.moveCount==0)
  {displaylegalmoves('X')
  var delayInMilliseconds = 300; //0.3 seconds
  setTimeout(function() {
  minimaxDecision(board,'X')
  document.querySelector(".scorewhite").innerHTML= `White's score is: ${scoreboard(board,'X')}` 
  document.querySelector(".scoreblack").innerHTML= `Black's score is: ${scoreboard(board,'O')}`
  displaylegalmoves('O')}
      , delayInMilliseconds);
  }
      
   }   
      
if(gameOver(board))
{if(scoreboard(board,'O')>=scoreboard(board,'X')) 
{document.querySelector(".scoreblack").innerHTML="Black wins!!!"
document.querySelector(".scorewhite").innerHTML= "AI player is a noob"}
else 
{document.querySelector(".scorewhite").innerHTML="White wins!!!"
document.querySelector(".scoreblack").innerHTML= "Hard luck black, you lost"}
  }
}

// while(!(gameOver(board)))
// {
  
//    getRandomMove(board,'O')
//    minimaxDecision(board,'X')
   
      


// }














function placeMark(cell, currentClass)
{ let piece='X'  
  if(currentClass=="bcircle")
  piece='O'
    cell.classList.add(currentClass)
    let ide=parseInt(cell.id)
    let x=Math.floor(ide/8)
    let y=ide%8
    makeMove(board,x,y,piece)
     
}

function getRandomMove(board2,piece)
{let x;
 let y; 
let moveX=[]
let moveY=[]
let numMoves={
  moveCount: 0
}
getMoveList(board2, moveX, moveY, numMoves, piece);
if (numMoves.moveCount == 0)
{
x = -1;
y = -1;
}
else
{
let i = Math.floor(Math.random()*numMoves.moveCount);
x = moveX[i];
y = moveY[i];
makeMove(board2,x,y,piece)
}
}



function copyBoard(src,dest)
{var len = src.length;
    // dest = new Array(len);
for(var i=0; i<len; i++)
    dest[i] = src[i].slice(0);
}


function minimaxDecision(board2,whoseTurn)
{ let x;
  let y;
let moveX=[];
let moveY=[];
let numMoves= {
  moveCount: 0
}
let opponent = 'X';
if (whoseTurn == 'X')
opponent = 'O';
getMoveList(board2, moveX, moveY, numMoves, whoseTurn);
if (numMoves.moveCount == 0) // if no moves return -1
{
x = -1;
y = -1;
}
else
{
// Remember the best move
let bestMoveVal = -99999;
let bestX = moveX[0];
let bestY = moveY[0];
// Try out every single move
for (let i = 0; i < numMoves.moveCount; i++)
{
// Apply the move to a new board
let tempBoard=new Array(board2.length);
copyBoard(board2, tempBoard);
makeMovecopy(tempBoard, moveX[i], moveY[i], whoseTurn);
// Recursive call, initial search ply = 1
let val = minimaxValue(tempBoard, whoseTurn, opponent, 1);
// Remember best move
if (val > bestMoveVal)
{
bestMoveVal = val;
bestX = moveX[i];
bestY = moveY[i];
}
}
// Return the best x/y
x = bestX;
y = bestY;

// if(validMove(board2,0,0,'X'))         //weighing the corners to be worth much more
// {x=0;
// y=0;}
// if(validMove(board2,0,7,'X'))
// {x=0;
// y=7;}
// if(validMove(board2,7,0,'X'))
// {x=7;
// y=0;}
// if(validMove(board2,7,7,'X'))
// {x=7;
// y=7;}

makeMove(board2,x,y,whoseTurn)
}
}


function minimaxValue(board2,originalTurn,currentTurn,searchPly)
{
if ((searchPly == 6) || gameOver(board2)) // Change to desired ply lookahead
{
return heuristic(board2, originalTurn);
}
let moveX=[];
let moveY=[];
let numMoves={
  moveCount: 0
}
let opponent = 'X';
if (currentTurn == 'X')
opponent = 'O';
getMoveList(board2, moveX, moveY, numMoves, currentTurn);
if (numMoves.moveCount == 0) // if no moves skip to next player's turn
{
return minimaxValue(board2, originalTurn, opponent, searchPly + 1);
}
else
{
// Remember the best move
let bestMoveVal = -99999; // for finding max
if (originalTurn != currentTurn)
bestMoveVal = 99999; // for finding min
// Try out every single move
for (let i = 0; i < numMoves.moveCount; i++)
{
// Apply the move to a new board
let tempBoard=new Array(board2.length);
copyBoard(board2, tempBoard);
makeMovecopy(tempBoard, moveX[i], moveY[i], currentTurn);
// Recursive call
let val = minimaxValue(tempBoard, originalTurn, opponent,
 searchPly + 1);
// Remember best move
if (originalTurn == currentTurn)
{
// Remember max if it's the originator's turn
if (val > bestMoveVal)
bestMoveVal = val;
}
else
{
// Remember min if it's opponent turn
if (val < bestMoveVal)
bestMoveVal = val;
}
}
return bestMoveVal;
}
return -1; // Should never get here
}



function makeMovecopy(board2, x, y, piece)
{let classname="wcircle"
if(piece=='O')
classname="bcircle"
// Put the piece at x,y
board2[x][y] = piece;

// let arrtonum=(8*x)+y;
//  let ide=arrtonum.toString();
//  document.getElementById(ide).classList.add(classname);

// Figure out the character of the opponent's piece
let opponent = 'O';
if (piece == 'O')
opponent = 'X';
// Check to the left
if (x!=0&&checkFlip(board2, x - 1, y, -1, 0, piece, opponent))
flipPiecescopy(board2, x - 1, y, -1, 0, piece, opponent);
// Check to the right
if (x!=7&&checkFlip(board2, x + 1, y, 1, 0, piece, opponent))
flipPiecescopy(board2, x + 1, y, 1, 0, piece, opponent);
// Check down
if (y!=0&&checkFlip(board2, x, y-1, 0, -1, piece, opponent))
flipPiecescopy(board2, x, y-1, 0, -1, piece, opponent);
// Check up
if (y!=7&&checkFlip(board2, x, y + 1, 0, 1, piece, opponent))
flipPiecescopy(board2, x, y + 1, 0, 1, piece, opponent);
// Check down-left
if (x!=0&&y!=0&&checkFlip(board2, x-1, y - 1, -1, -1, piece, opponent))
flipPiecescopy(board2, x-1, y - 1, -1, -1, piece, opponent);
// Check down-right
if (x!=7&&y!=0&&checkFlip(board2, x + 1, y - 1, 1, -1, piece, opponent))
flipPiecescopy(board2, x + 1, y - 1, 1, -1, piece, opponent);
// Check up-left
if (x!=0&&y!=7&&checkFlip(board2, x - 1, y + 1, -1, 1, piece, opponent))
flipPiecescopy(board2, x - 1, y + 1, -1, 1, piece, opponent);
// Check up-right
if (x!=7&&y!=7&&checkFlip(board2, x + 1, y + 1, 1, 1, piece, opponent))
flipPiecescopy(board2, x + 1, y + 1, 1, 1, piece, opponent);
}

function flipPiecescopy(board2,x,y,deltaX,deltaY,myPiece,opponentPiece)
 {
 while (board2[x][y] == opponentPiece)
 { 
 board2[x][y] = myPiece;
//  let arrtonum=(8*x)+y;
//  let ide=arrtonum.toString();
//  document.getElementById(ide).classList.remove("bcircle");
//  document.getElementById(ide).classList.remove("wcircle");
//  document.getElementById(ide).classList.add(classname);
 x += deltaX;
 y += deltaY;
 }
 }
 


 function scoreboard(board2,piece)
 {
  
  let total = 0;
  for (let x = 0; x < 8; x++)
  for (let y = 0; y < 8; y++)
  {
  if (board2[x][y] == piece)
  total++;
  }
  return total;
  
 }