
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
    
    
function checkFlip(board, x, y, deltaX,deltaY, 
         myPiece, opponentPiece)
{
    if (board[x][y] == opponentPiece)       //opponentPiece
{
    while ((x >= 0) && (x < 8) && (y >= 0) && (y < 8))
       {
       x += deltaX;
       y += deltaY;

       if(x<0||y<0||x>=8||y>=8)
       return false;

       if (board[x][y] == '.') // not consecutive
       return false; 
       if (board[x][y] == myPiece)
       return true; // At least one piece we can flip
       else
       {
       // It is an opponent piece, just keep scanning in our direction
       }
       }
     }
       return false; // Either no consecutive opponent pieces or hit the edge
}    

function makeMove(board, x, y, piece)
{let classname="wcircle"
if(piece=='O')
classname="bcircle"
// Put the piece at x,y
board[x][y] = piece;

let arrtonum=(8*x)+y;
 let ide=arrtonum.toString();
 document.getElementById(ide).classList.add(classname);

// Figure out the character of the opponent's piece
let opponent = 'O';
if (piece == 'O')
opponent = 'X';
// Check to the left
if (x!=0&&checkFlip(board, x - 1, y, -1, 0, piece, opponent))
flipPieces(board, x - 1, y, -1, 0, piece, opponent);
// Check to the right
if (x!=7&&checkFlip(board, x + 1, y, 1, 0, piece, opponent))
flipPieces(board, x + 1, y, 1, 0, piece, opponent);
// Check down
if (y!=0&&checkFlip(board, x, y-1, 0, -1, piece, opponent))
flipPieces(board, x, y-1, 0, -1, piece, opponent);
// Check up
if (y!=7&&checkFlip(board, x, y + 1, 0, 1, piece, opponent))
flipPieces(board, x, y + 1, 0, 1, piece, opponent);
// Check down-left
if (x!=0&&y!=0&&checkFlip(board, x-1, y - 1, -1, -1, piece, opponent))
flipPieces(board, x-1, y - 1, -1, -1, piece, opponent);
// Check down-right
if (x!=7&&y!=0&&checkFlip(board, x + 1, y - 1, 1, -1, piece, opponent))
flipPieces(board, x + 1, y - 1, 1, -1, piece, opponent);
// Check up-left
if (x!=0&&y!=7&&checkFlip(board, x - 1, y + 1, -1, 1, piece, opponent))
flipPieces(board, x - 1, y + 1, -1, 1, piece, opponent);
// Check up-right
if (x!=7&&y!=7&&checkFlip(board, x + 1, y + 1, 1, 1, piece, opponent))
flipPieces(board, x + 1, y + 1, 1, 1, piece, opponent);
}

 



function validMove(board, x, y, piece)
{
// Check that the coordinates are empty
if (board[x][y] != '.')
return false;
// Figure out the character of the opponent's piece
let opponent = 'O';
if (piece != 'X')
opponent = 'X';
// If we can flip in any direction, it is valid
// Check to the left

if (x!=0&&checkFlip(board, x - 1, y, -1, 0, piece, opponent))
return true;
// Check to the right
if (x!=7&&checkFlip(board, x + 1, y, 1, 0, piece, opponent))
return true;
// Check down
if (y!=0&&checkFlip(board, x, y - 1, 0, -1, piece, opponent))
return true;
// Check up
if (y!=7&&checkFlip(board, x, y + 1, 0, 1, piece, opponent))
return true;
// Check down-left
if (x!=0&&y!=0&&checkFlip(board, x - 1, y - 1, -1, -1, piece, opponent))
return true;
// Check down-right
if (x!=7&&y!=0&&checkFlip(board, x + 1, y - 1, 1, -1, piece, opponent))
return true;
// Check up-left
if (x!=0&&y!=7&&checkFlip(board, x - 1, y + 1, -1, 1, piece, opponent))
return true;
// Check up-right
if (x!=7&&y!=7&&checkFlip(board, x + 1, y + 1, 1, 1, piece, opponent))
return true;
return false; // If we get here, we didn't find a valid flip direction
}

function displaylegalmoves(player)
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




function getMoveList(board, moveX,moveY, numMoves,piece)
{
numMoves.moveCount = 0; // Initially no moves found
// Check each square of the board and if we can move there, remember the coords
for (let x = 0; x < 8; x++)
for (let y = 0; y < 8; y++)
{
if (validMove(board, x, y, piece)) // remember coordinates
{
moveX[numMoves.moveCount] = x;
moveY[numMoves.moveCount] = y;
numMoves.moveCount++; // Increment number of moves found
}
}
}


function gameOver(board)
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

getMoveList(board, XMoveX, XMoveY, numXMoves, 'X');
getMoveList(board, OMoveX, OMoveY, numOMoves, 'O');
if ((numXMoves.moveCount == 0) && (numOMoves.moveCount == 0))
return true;
return false;
}

function score(board,piece)
{
let total = 0;
for (let x = 0; x < 8; x++)
for (let y = 0; y < 8; y++)
{
if (board[x][y] == piece)
total++;
}
return total;
}


function flipPieces(board,x,y,deltaX,deltaY,myPiece,opponentPiece)
 {
 while (board[x][y] == opponentPiece)
 { let classname="wcircle"
   if(myPiece=='O')
   classname="bcircle"
 board[x][y] = myPiece;
 let arrtonum=(8*x)+y;
 let ide=arrtonum.toString();
 document.getElementById(ide).classList.remove("bcircle");
 document.getElementById(ide).classList.remove("wcircle");
 document.getElementById(ide).classList.add(classname);
 x += deltaX;
 y += deltaY;
 }
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
   const currentClass = circleTurn ? "bcircle" : "wcircle"
   const board22= document.querySelector('#board')
   
   placeMark(cell, currentClass)
   
   circleTurn=!circleTurn
   if(currentClass=="wcircle")
   board22.classList.replace("wcircle","bcircle")
   else board22.classList.replace("bcircle","wcircle")
   console.log(board22.classList)
   
    let player='O'        
         if(circleTurn==0)
         player='X'

  let numMoves={                                           //start of code to check if a player has any moves to play
    moveCount: 0
  }
  let moveX=[]
  let moveY=[]
  getMoveList(board,moveX,moveY,numMoves,player)
  if(numMoves.moveCount==0)       
  {circleTurn=!circleTurn
    
     if(player=='X')
      board22.classList.replace("wcircle","bcircle")
      else board22.classList.replace("bcircle","wcircle")
      console.log(board22.classList) 

   player='O'
   if(circleTurn==0)
   player='X'
  }                                                                    //end of code
  displaylegalmoves(player) 
  
//    var delayInMilliseconds = 300; //1 second
  
//   setTimeout(function() {
  
//   getRandomMove(board,'X')
//   circleTurn=!circleTurn
//   displaylegalmoves('O')}
//       , delayInMilliseconds);

     
      
      
      



 

}

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

function getRandomMove(board,piece)
{let x;
 let y; 
let moveX=[]
let moveY=[]
let numMoves={
  moveCount: 0
}
getMoveList(board, moveX, moveY, numMoves, piece);
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
makeMove(board,x,y,piece)
}
}




// function clearlegalmoves()
//  {
//      for(let i=0;i<64;i++)
//      let ide=i.toString()
//      document.getElementById(ide).classList.remove("legalmove");

//  }