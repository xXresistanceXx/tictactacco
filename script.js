// Bildpfad für Deadpool
const Deadpool = './img/dp1.jpg';
// Bildpfad für Wolverino
const Wolverino = './img/wlv1.jpg';
// actual player Deadpool
let currentPlayer = 'Deadpool';
let lineDrawn = false;
let gameOver = false;


let fields = [null, null, null, null, null, null, null, null, null];

function init() {
  render();
}

function render() {
  let contentDiv = document.getElementById('content'); 
  let tableHtml = '<table>'; 
  for (let i = 0; i < 3; i++) {
    tableHtml += '<tr>'; 
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j; 
      let symbol = fields[index]; 
      let cellContent = symbol ? `<img src="${symbol}" class="loop">` : '';
      tableHtml += `<td onclick="cellClicked(${index})">${cellContent}</td>`; 
    }
    tableHtml += '</tr>'; 
  }
  tableHtml += '</table>'; 
  contentDiv.innerHTML = tableHtml; 
}

function restoreGame() {
  fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  render(); 
}

function drawWinningLine(combination) {
  
  let lineColor = currentPlayer === 'Deadpool' ? 'yellow' : 'red';
  
  let positions = combination.map((index) => {
    let row = Math.floor(index / 3) + 1; 
    let column = (index % 3) + 1; 
    let cell = document.querySelector(
      `#content table tr:nth-child(${row}) td:nth-child(${column})`
    );
    let rect = cell.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  });

  let lineHTML = `<div style="position: absolute; top: ${
    positions[0].y
  }px; left: ${positions[0].x}px; width: ${Math.sqrt(
    (positions[2].x - positions[0].x) ** 2 +
      (positions[2].y - positions[0].y) ** 2
  )}px; height: 5px; background-color:${lineColor}; opacity: 0.7; border-radius: 2.5px; transform-origin: left top; transform: rotate(${Math.atan2(
    positions[2].y - positions[0].y,
    positions[2].x - positions[0].x
  )}rad);"></div>`;

  let contentDiv = document.getElementById('content');
  contentDiv.innerHTML += lineHTML;

  lineDrawn = true; 
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    let [a, b, c] = combination;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      drawWinningLine(combination);
      return fields[a];
    }
  }

  return null; 
}

function removeOnClick(index) {
  let cell = document.querySelector(
    `#content table tr:nth-child(${Math.floor(index / 3) + 1}) td:nth-child(${
      (index % 3) + 1
    })`
  );
  cell.removeAttribute('onclick');
}

function disableCellClicks() {
  let cells = document.querySelectorAll('td');
  cells.forEach((cell) => {
    cell.removeAttribute('onclick');
  });
  gameOver = true;
}

function cellClicked(index) {
  if (!gameOver && fields[index] === null) {
  }
}

function cellClicked(index) {
  if (fields[index] === null) {
    fields[index] = currentPlayer; 
    let cell = document.querySelector(
      `#content table tr:nth-child(${Math.floor(index / 3) + 1}) td:nth-child(${
        (index % 3) + 1
      })`
    );
    cell.innerHTML = `<img src="${
      currentPlayer === 'Deadpool' ? './img/dp1.jpg' : './img/wlv1.jpg'
    }" class="loop" onclick="cellClicked(${index})">`;
    currentPlayer = currentPlayer === 'Deadpool' ? 'Wolverino' : 'Deadpool'; 
    removeOnClick(index);

    let winner = checkWinner(); 
    if (winner !== null && lineDrawn) {
      disableCellClicks();
      setTimeout(() => {
        alert(`Player ${winner} wins!`); 
      }, 200);
    }
  }
}

init(); 
