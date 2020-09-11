let gameBoardValues = [];
let currentPlayer = 'red';
let redWinCount = 0;
let yellowWinCount = 0;
let rowMax;
let columnMax;

function getGameBoardValues() {
  return gameBoardValues;
}

function setGameBoardValues(updatedGameBoardValues) {
  gameBoardValues = updatedGameBoardValues;
}

function resetBoard(row, column) {
  $('#game-board').html('');
  $('#win-banner').text('');
  for (let i = 0; i < row; i += 1) {
    for (let j = 0; j < column; j += 1) {
      gameBoardValues[row][column] = null;
    }
  }
  $('#player-counter').css('background-color', 'red');
}

function setupGameBoardValues(row, column) {
  const customGameBoardValues = [];
  for (let i = 0; i < column; i += 1) {
    const tempArray = [];
    for (let j = 0; j < row; j += 1) {
      tempArray.push(null);
    }
    customGameBoardValues.push(tempArray);
  }
  gameBoardValues = customGameBoardValues;
}

function checkWin(rowPlaced, columnPlaced) {
  let count = 0;
  let win = false;
  for (let i = 0; i < rowMax; i += 1) {
    if (gameBoardValues[columnPlaced][i] === currentPlayer) {
      count += 1;
    } else {
      count = 0;
    }
    if (count >= 4) {
      win = true;
    }
  }
  count = 0;
  for (let i = 0; i < columnMax; i += 1) {
    if (gameBoardValues[i][rowPlaced] === currentPlayer) {
      count += 1;
    } else {
      count = 0;
    }
    if (count >= 4) {
      win = true;
    }
  }
  if (win === true) {
    for (let i = 0; i < columnMax; i += 1) {
      $(`#${i}`).off('click');
    }
    // eslint-disable-next-line no-unused-expressions
    currentPlayer === 'red' ? redWinCount += 1 : yellowWinCount += 1;
    $('#win-banner').css('color', currentPlayer);
    $('#win-banner').text(`${currentPlayer} won!`);
  }
}

function placeCounter(columnIndex) {
  $.get(`http://localhost:8080/game/state/${columnIndex}`, function (data, status, xhr) {
    console.log(data);
  })
  let placed = false;
  let row;
  let column;
  for (let i = gameBoardValues[columnIndex].length - 1; i >= 0; i -= 1) {
    if (gameBoardValues[columnIndex][i] == null) {
      gameBoardValues[columnIndex][i] = currentPlayer;
      $(`#${columnIndex}-${i}`).css('background-color', currentPlayer);
      placed = true;
      column = columnIndex;
      row = i;
      break;
    }
  }
  if (placed) {
    checkWin(row, column);
    if (currentPlayer === 'yellow') {
      currentPlayer = 'red';
      $('#player-counter').css('background-color', currentPlayer);
    } else {
      currentPlayer = 'yellow';
      $('#player-counter').css('background-color', currentPlayer);
    }
  }
}

function setupBoard() {
  resetBoard();
  $('#red-counter .score-label').text(redWinCount);
  $('#yellow-counter .score-label').text(yellowWinCount);
  rowMax = $('#row-input').val();
  columnMax = $('#column-input').val();
  setupGameBoardValues(rowMax, columnMax);
  for (let i = 0; i < columnMax; i += 1) {
    $('#game-board').append(`<div id = "${i}" class = "column flex-container"></div>`);
    $(`#${i}`).on('click', () => {
      placeCounter(i);
    });
    for (let j = 0; j < rowMax; j += 1) {
      $(`#${i}`).append(`<div id = "${i}-${j}" class = "row"></div>`);
    }
  }
}

document.onload = setupBoard();

if (typeof module !== 'undefined') {
  module.exports = {
    resetBoard,
    setupGameBoardValues,
    placeCounter,
    setupBoard,
    getGameBoardValues,
    setGameBoardValues,
  };
}
