let play = 0;
let turn1 = '';
let turn2 = '';
let player1 = '';
let computer = '';
let arrGame = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let countTurn = 0;
const turn = document.getElementById('turn');
const clearTd=document.getElementsByTagName('td');
const docCount1 = document.getElementById('count1');
const docCount2 = document.getElementById('count2');
const docWin = document.getElementById('win');
let end = true;

function numPlayers(num) {
  const arrTurn = ['Your turn!', 'Go Computer!', 'Go Player1!', 'Go Player2!'];
  const pl1 = document.getElementById('player1');
  const pl2 = document.getElementById('player2');
  if (num) {
    pl1.innerHTML = 'Player1: ';
    pl2.innerHTML = 'Player2: ';
    turn1 = arrTurn[2];
    turn2 = arrTurn[3];
    document.getElementById('textXO').innerHTML = 'Would <u>Player1</u> likes to be X or O?';
    play = 1;
  } else {
    pl1.innerHTML = 'You: ';
    pl2.innerHTML = 'Computer: ';
    turn1 = arrTurn[0];
    turn2 = arrTurn[1];
    document.getElementById('textXO').innerHTML = 'Would <u>You</u> likes to be X or O?';
    play = 0;
  }
  document.getElementById('players').style.visibility = 'hidden';
  document.getElementById('XOXO').style.visibility = 'visible';
}

function XorO(a) {
  if (a === 'X' && play) {
    player1 = 'X';
    turn.innerHTML = turn1;
    document.getElementById('XOXO').style.visibility = 'hidden';
    document.getElementById('game').style.visibility = 'visible';
  } else if (a === 'O' && play) {
    player1 = 'O';
    turn.innerHTML = turn2;
    document.getElementById('XOXO').style.visibility = 'hidden';
    document.getElementById('game').style.visibility = 'visible';
  } if (a == 'X' && !play) {
    player1 = 'X';
    computer = 'O';
    turn.innerHTML = turn1;
    document.getElementById('XOXO').style.visibility = 'hidden';
    document.getElementById('game').style.visibility = 'visible';
  } else if (a === 'O' && !play) {
    player1 = 'O';
    computer = 'X';
    turn.innerHTML = turn2;
    document.getElementById('XOXO').style.visibility = 'hidden';
    document.getElementById('game').style.visibility = 'visible';
    playComp(computer);
  } else if (a === 'back') {
    document.getElementById('XOXO').style.visibility = 'hidden';
    document.getElementById('players').style.visibility = 'visible';
  }
}

function reset() {
  play = 0;
  player1 = '';
  countTurn = 0;
  arrGame = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  turn1 = '';
  turn2 = '';
  docCount1.innerHTML = '0';
  docCount2.innerHTML = '0';
  document.getElementById('game').style.visibility = 'hidden';
  document.getElementById('players').style.visibility = 'visible';
  docWin.style.visibility = 'hidden';
  for (let i=0; i<clearTd.length; i++) {
    clearTd[i].innerHTML = '';
  }
}

function playComp(x) {
  const comp = x;
  const arrId = ['A1', 'B1', 'C1', 'A2', 'B2', 'C2', 'A3', 'B3', 'C3'];
  let pos = smartTurn(comp);
  let opponent = '';
  if (comp === 'X') {
    opponent = 'O';
  } else {
    opponent = 'X';
  }
  if (pos === -1) {
    pos = smartTurn(opponent);
  }
  if (pos === -1) {
    const arrEmpty = getEmptyCell();
    const randomId = Math.floor(Math.random() * arrEmpty.length);
    pos = arrEmpty[randomId];
  }
  // console.log(pos);
  const cellId = arrId[pos];
  gridClick(cellId, pos);
}

function getEmptyCell() {
  let arrEmpty = [];
  for(let i = 0; i < arrGame.length; i++) {
    if (arrGame[i] === 0) {
      arrEmpty.push(i);
    }
  }
  return arrEmpty;
}

function smartTurn(x) {
  const arrWin = [[arrGame[0], arrGame[1], arrGame[2]],
    [arrGame[0], arrGame[4], arrGame[8]],
    [arrGame[0], arrGame[3], arrGame[6]],
    [arrGame[1], arrGame[4], arrGame[7]],
    [arrGame[2], arrGame[5], arrGame[8]],
    [arrGame[2], arrGame[4], arrGame[6]],
    [arrGame[3], arrGame[4], arrGame[5]],
    [arrGame[6], arrGame[7], arrGame[8]]];
  const arrWinIndex = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7],
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];
  let sum = [];
  for (let i = 0; i < arrWin.length; i++) {
    sum[i] = arrWin[i].reduce((a, b) => a + b)};
  let tsum = 0;
  if (x === 'X') tsum = 2;
  else if (x === 'O') tsum = -2;

  for (let j=0; j < sum.length; j++) {
    if (sum[j] === tsum) {
      let n = arrWin[j].indexOf(0);
      if (n !== -1) {
        return arrWinIndex[j][n];
      }
    }
  }
  return -1;
}

function gridClick(id, num) {
  const cell = document.getElementById(id); 
  let numId = num;

  if (cell.innerHTML === '') {
    if (play) { 
      if (countTurn) {
        if (player1 === 'X') {
          turn.innerHTML = turn1;
          cell.innerHTML = 'O';
          arrGame[numId] = -1;
          countTurn = 0;
        } else {
          turn.innerHTML = turn2;
          cell.innerHTML = 'O';
          arrGame[numId] = -1;
          countTurn = 0;
        }
      } else {
        if (player1 === 'X') {
          turn.innerHTML = turn2;
          cell.innerHTML = 'X';
          arrGame[numId] = 1;
          countTurn = 1;
        } else {
          turn.innerHTML = turn1;
          cell.innerHTML = 'X';
          arrGame[numId] = 1;
          countTurn = 1;
        }
      }
      winSet(); 
    } else if (!play) {
      if (countTurn) {
        if (player1 === 'X') {
          cell.innerHTML = 'O';
          arrGame[numId] = -1;
          countTurn = 0;
          turn.innerHTML = turn1;
        } else {
          turn.innerHTML = turn2;
          cell.innerHTML = 'O';
          arrGame[numId] = -1;
          countTurn = 0;
        }
      } else {
        if (player1 === 'X') {
          cell.innerHTML = 'X';
          arrGame[numId] = 1;
          countTurn = 1;
          turn.innerHTML = turn2;
        } else {
          turn.innerHTML = turn1;
          cell.innerHTML = 'X';
          arrGame[numId] = 1;
          countTurn = 1;
        }
      }
      winSet();
      if (end === true && turn.innerHTML === turn2) {
        window.setTimeout(() => { playComp(computer); }, 500);
      }
    }
  }
}

function winSet() {
  const arrWin = [[arrGame[0], arrGame[1], arrGame[2]],
    [arrGame[0], arrGame[4], arrGame[8]],
    [arrGame[0], arrGame[3], arrGame[6]],
    [arrGame[1], arrGame[4], arrGame[7]],
    [arrGame[2], arrGame[5], arrGame[8]],
    [arrGame[2], arrGame[4], arrGame[6]],
    [arrGame[3], arrGame[4], arrGame[5]],
    [arrGame[6], arrGame[7], arrGame[8]]];

  const arrWinText = ['It was a draw...', 'You win!', 'You lose :(', 'Player 1 wins!', 'Player 2 wins!']
  let sum = [];
  for (let i = 0; i < arrWin.length; i++) {
    sum[i] = arrWin[i].reduce((a, b) => a + b);
  }

  for(let j = 0; j < sum.length; j++) {
    if (sum[j] === -3) {
      if (player1 === 'X' && !play) {
        countSet(1);
        docWin.innerHTML = arrWinText[2];
        docWin.style.visibility = 'visible';
        window.setTimeout(winPoster, 2000);
        end = false;
        return;
      } if (player1 === 'O' && !play) {
        countSet(0);
        docWin.innerHTML = arrWinText[1];
        docWin.style.visibility = 'visible'; 
        window.setTimeout(winPoster, 2000);
        end = false;
        return;
      } if (player1 === 'X' && play) {
        countSet(1);
        docWin.innerHTML = arrWinText[4];
        docWin.style.visibility = 'visible';
        window.setTimeout(winPoster, 2000);
        return;
      } if (player1 === 'O' && play) {
        countSet(0);
        docWin.innerHTML = arrWinText[3];
        docWin.style.visibility = 'visible';
        window.setTimeout(winPoster, 2000);
        return;
      }
    } else if (sum[j] === 3) {
      if (player1 == 'X' && !play) {
        countSet(0);
        docWin.innerHTML = arrWinText[1];
        docWin.style.visibility = 'visible';
        window.setTimeout(winPoster, 2000);
        end = false;
        return;
      } if (player1 === 'O' && !play) {
        countSet(1);
        docWin.innerHTML = arrWinText[2];
        docWin.style.visibility = 'visible';
        window.setTimeout(winPoster, 2000);
        end = false;
        return;
      } if (player1 === 'X' && play) {
        countSet(0);
        docWin.innerHTML = arrWinText[3];
        docWin.style.visibility = 'visible';
        window.setTimeout(winPoster, 2000);
        return;
      } if (player1 === 'O' && play) {
        countSet(1);
        docWin.innerHTML = arrWinText[4];
        docWin.style.visibility = 'visible';
        window.setTimeout(winPoster, 2000);
        return;
      }
    }
  }
  let endGame = true;
  for (let i = 0; i < 9; i++) {
    if(arrGame[i] === 0) {
      endGame = false;
      break;
    }
  }
  if (endGame) {
    docWin.innerHTML = arrWinText[0];
    docWin.style.visibility = 'visible';
    window.setTimeout(winPoster, 2000);
    end = false;
  }
}

function countSet(c) {
  // console.log('countset');
  let num = 0;
  if (c) {
    num = Number(docCount2.innerHTML);
    num++;
    // console.log(num);
    docCount2.innerHTML = num;
  } else {
    num = Number(docCount1.innerHTML);
    num++;
    // console.log(num);
    docCount1.innerHTML = num;
  }
}

function winPoster() {
  docWin.style.visibility = 'hidden';
  arrGame = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < clearTd.length; i++) {
    clearTd[i].innerHTML = '';
  }
  end = true;
  if (!play && turn.innerHTML === turn2) {
    playComp(computer);
  }
}