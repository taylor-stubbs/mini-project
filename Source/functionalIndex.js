let game = {
    "players" : ["red", "yellow"],
    "board" : [],
    "turn" : 0,
    "winner" : null
}

function createBoard(row, col) {
    let boardArray = [];
    for (let i = 0; i < col; i += 1) {
      const colArray = [];
      for (let j = 0; j < row; j += 1) {
        colArray.push(null)
      }
      boardArray.push(colArray);
    }
   return boardArray;
}

function placeCounter(col, board, player) {
    // Has the counter been placed?
    let rowPointer = board[col].length - 1;
    for (rowPointer; rowPointer >= 0; rowPointer -= 1) {
      if (board[col][rowPointer] === null) { // If current position is empty place counter
        board[col][rowPointer] = player;
        break;
      }
    }
    return (board[col].length - 1) - rowPointer;
}

function switchPlayerTurn(turn) {
    return Math.abs(turn - 1);
}

function checkWin(row, col, board) {
    let player = board[col][row];
    let count = 0;
    let win = false;

    // Check win for column
    for (let rowPointer = 0; rowPointer < game.board[0].length; rowPointer += 1) {
      if (board[col][rowPointer] === player) {
        count +=1;
      } else {
        count = 0;
      }
      if (count >= 4) {
        win = true;
      }
    }

    count = 0;

    // Check win for row
    for(let colPointer = 0; colPointer < game.board.length; colPointer += 1) {
      if(board[colPointer][row] === player) {
        count += 1;
      } else {
        count = 0;
      }
      if (count >= 4) {
        win = true;
      }
    }
    if (win) {
      return player;
    }
    return null;
}

function nextTurn(col, game) {
    let row = placeCounter(col, game.board, game.players[game.turn]);
    console.log(row);
    render(game.board);
    game.turn = switchPlayerTurn(game.turn)
    game.winner = checkWin(row,col, game.board);
    console.log(game.winner)
}

function render(board) {
    rows = board[0].length
    cols = board.length
    $('#game-board').empty();
    for (let i = 0; i < cols; i += 1) {
        $('#game-board').append(`<div id = "${i}" class = "column flex-container"></div>`);
        $(`#${i}`).on('click', () => {
          nextTurn(i, game);
        });
        for (let j = 0; j < rows; j += 1) {
          $(`#${i}`).append(`<div id = "${i}-${j}" class = "row"></div>`);
          
          $(`#${i}-${j}`).css("background-color", board[i][j])
        }
    }
    $('#player-counter').css("background-color", game.players[game.turn]);
}

function newGame() {
    rows = $('#row-input').val();
    cols = $('#column-input').val();
    game.board = createBoard(rows,cols);
    game.turn = 0;
    winner = null;
    render(game.board);
}

document.onload = newGame();
