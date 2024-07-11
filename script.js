// Bildpfad für Deadpool
const Deadpool = './img/dp1.jpg';
// Bildpfad für Wolverino
const Wolverino = './img/wlv1.jpg';
// Setze den aktuellen Spieler auf Deadpool
let currentPlayer = 'Deadpool';
// Variable zur Verfolgung, ob die Linie bereits gezeichnet wurde
let lineDrawn = false;
// Variable um den Spielstatus zu verfolgen
let gameOver = false;

// Array das den aktuellen Zustand des Spielfelds repräsentiert
let fields = [null, null, null, null, null, null, null, null, null];

// Funktion zum Initialisieren des Spiels
function init() {
  render(); // Render-Funktion um das Spielfeld anzuzeigen
}

// Funktion zum Rendern des Spielfelds
function render() {
  let contentDiv = document.getElementById('content'); // Wähle das Div-Element aus dem DOM aus
  let tableHtml = '<table>'; // Initialisiert den HTML-Code für die Tabelle
  for (let i = 0; i < 3; i++) {
    tableHtml += '<tr>'; // Öffne eine neue Tabellenreihe
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j; // Berechnung Index der Zelle im Feld
      let symbol = fields[index]; // Hole das Symbol für die aktuelle Zelle
      // HTML-Code für die Zelle, einschließlich des Bildes, wenn ein Symbol vorhanden ist
      let cellContent = symbol ? `<img src="${symbol}" class="loop">` : '';
      tableHtml += `<td onclick="cellClicked(${index})">${cellContent}</td>`; // Füge die Zelle zum HTML-Code hinzu
    }
    tableHtml += '</tr>'; // Schließe die Tabellenreihe
  }
  tableHtml += '</table>'; // Schließe die Tabelle
  contentDiv.innerHTML = tableHtml; // HTML-Code für Div-Element um das Spielfeld anzuzeigen
}

function restoreGame() {
  //Funktion führt das onklick Attribut für den Button
  fields = [
    //Stellt das Array wieder her
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

  render(); // Rendert wieder zum Ausgangszustand
}

// Funktion zum Zeichnen der Gewinnlinie
function drawWinningLine(combination) {
  // Die Farbe der Gewinnlinie basierend auf dem aktuellen Spieler
  let lineColor = currentPlayer === 'Deadpool' ? 'yellow' : 'red';
  // Erstellt ein Array von Positionen für die Zellen in der Gewinnkombination
  let positions = combination.map((index) => {
    // Iteriert über jede Zelle in der Gewinnkombination um die Positionen auf dem Bildschirm zu erhalten
    let row = Math.floor(index / 3) + 1; // Bestimmt die Zeile der Zelle
    let column = (index % 3) + 1; // Bestimmt die Spalte der Zelle
    // Wählt die Zelle im DOM aus
    let cell = document.querySelector(
      `#content table tr:nth-child(${row}) td:nth-child(${column})`
    );
    // Bestimmt das Rechteck der Zelle auf dem Bildschirm
    let rect = cell.getBoundingClientRect();
    // Berechnet die x- und y-Positionen des Mittelpunkts jeder Zelle auf dem Bildschirm
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  });

  // Erstellt den HTML-Code für die Gewinnlinie mit den berechneten Positionen und der definierten Farbe
  let lineHTML = `<div style="position: absolute; top: ${
    positions[0].y
  }px; left: ${positions[0].x}px; width: ${Math.sqrt(
    (positions[2].x - positions[0].x) ** 2 +
      (positions[2].y - positions[0].y) ** 2
  )}px; height: 5px; background-color:${lineColor}; opacity: 0.7; border-radius: 2.5px; transform-origin: left top; transform: rotate(${Math.atan2(
    positions[2].y - positions[0].y,
    positions[2].x - positions[0].x
  )}rad);"></div>`;

  // Wähle das Div-Element aus dem DOM aus und füge den HTML-Code für die Gewinnlinie hinzu
  let contentDiv = document.getElementById('content');
  contentDiv.innerHTML += lineHTML;

  lineDrawn = true; // Markiere die Linie als gezeichnet
}

// Funktion zum Überprüfen des Gewinners
function checkWinner() {
  // Definiere alle möglichen Gewinnkombinationen
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

  // Iteriert über jede Gewinnkombination
  for (let combination of winningCombinations) {
    let [a, b, c] = combination;
    // Überprüft ob alle Zellen in der Gewinnkombination vom gleichen Spieler belegt sind
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      drawWinningLine(combination); // Zeichnet die Gewinnlinie für diese Kombination
      return fields[a]; // Gibt den Spieler zurück der gewonnen hat
    }
  }

  return null; // Gibt null zurück wenn kein Spieler gewonnen hat
}

// Funktion zum Entfernen des onclick-Attributs einer Zelle
function removeOnClick(index) {
  // Wählt die Zelle im DOM aus und entferne das onclick-Attribut
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
  gameOver = true; // Setzt den Spielstatus auf "Spiel vorbei"
}

function cellClicked(index) {
  if (!gameOver && fields[index] === null) {
    // Dein bestehender Code für Zellenklicks hier
    // Überprüft ob das Spiel vorbei ist und ob das Feld leer ist bevor man weitergeht
  }
}

// Funktion die aufgerufen wird wenn eine Zelle angeklickt wird
function cellClicked(index) {
  // Überprüft ob die Zelle noch nicht belegt ist
  if (fields[index] === null) {
    fields[index] = currentPlayer; // Setzt das Feld mit dem aktuellen Spieler
    // Wählt die Zelle im DOM aus und füge das entsprechende Bild für den Spieler hinzu
    let cell = document.querySelector(
      `#content table tr:nth-child(${Math.floor(index / 3) + 1}) td:nth-child(${
        (index % 3) + 1
      })`
    );
    cell.innerHTML = `<img src="${
      currentPlayer === 'Deadpool' ? './img/dp1.jpg' : './img/wlv1.jpg'
    }" class="loop" onclick="cellClicked(${index})">`;
    currentPlayer = currentPlayer === 'Deadpool' ? 'Wolverino' : 'Deadpool'; // Wechselt den aktuellen Spieler
    removeOnClick(index); // Entfernt das onclick-Attribut der Zelle

    let winner = checkWinner(); // Überprüft ob es einen Gewinner gibt
    // Überprüft ob ein Gewinner vorhanden ist und die Gewinnlinie gezeichnet wurde
    if (winner !== null && lineDrawn) {
      disableCellClicks();
      // Verzögert den Alert um 200 Millisekunden um sicherzustellen dass die Linie gerendert wurde
      setTimeout(() => {
        alert(`Player ${winner} wins!`); // Zeigt einen Alert mit dem Gewinner an
      }, 200);
    }
  }
}

init(); // Initialisiert das Spiel beim Laden der Seite

//  let index = i * 3 + j;  ----Dient dazu sich den Index der Felder bzw. Positionen zu holen.

// Bsp.1 :
//Um auf Feld 4 zugreifen zu können gilt: 1 * 3 = 3 + j (j ist in dem Fall 0)
// ---> 1 * 3 = 3 + 0 = 4 = Zeile 1 und Spalte 0

// Bsp.2 : 2(Zeile) * 3 + 1(Spalte);
// ---> 2 * 3 = 6 + 1 (Zeile 3 und  2)
// Heißt X befindet sich an folgender Stelle:
// (Das obere X ist aus Bsp.1 und das untere aus Bsp.2 .)

//     |    |
// --------------
//   X |    |
// --------------
//     | X  |
//
