/* eslint-disable no-global-assign */
/* eslint-disable no-plusplus */
let gameBoardValues = [];
let currentPlayer = 'red';
function getGameBoardValues() {
  return gameBoardValues;
}

function setGameBoardValues(updatedGameBoardValues) {
  gameBoardValues = updatedGameBoardValues;
}

function resetBoard(row, column) {
  $('#game-board').html('');
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      gameBoardValues[row][column] = null;
    }
  }
  $('#player-counter').css('background-color', 'red');
}

function setupGameBoardValues(row, column) {
  const customGameBoardValues = [];
  for (let i = 0; i < column; i++) {
    const tempArray = [];
    for (let j = 0; j < row; j++) {
      tempArray.push(null);
    }
    customGameBoardValues.push(tempArray);
  }
  gameBoardValues = customGameBoardValues;
}

function placeCounter(columnIndex) {
  for (let i = gameBoardValues[columnIndex].length - 1; i >= 0; i--) {
    if (gameBoardValues[columnIndex][i] == null) {
      gameBoardValues[columnIndex][i] = 'red';
      $(`#${columnIndex}-${i}`).css('background-color', currentPlayer);
      break;
    }
  }
  if (currentPlayer === 'yellow') {
    currentPlayer = 'red';
    $('#player-counter').css('background-color', 'red');
  } else {
    currentPlayer = 'yellow';
    $('#player-counter').css('background-color', 'yellow');
  }
}

function setupBoard() {
  resetBoard();
  const row = $('#row-input').val();
  const column = $('#column-input').val();
  setupGameBoardValues(row, column);
  for (let i = 0; i < column; i++) {
    const divColumn = document.createElement('div');
    divColumn.addEventListener('click', () => {
      placeCounter(i);
    });
    divColumn.className = 'column flex-container';
    divColumn.id = i;

    for (let j = 0; j < row; j++) {
      const divRow = document.createElement('div');
      divRow.className = 'row';
      divRow.id = `${i}-${j}`;
      divColumn.appendChild(divRow);
    }
    $('#game-board').append(divColumn);
  }
}

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
