const CELL = 50;
const GAP = 2;
const STEP = CELL + GAP;

const grid = document.getElementById("grid");
const addRowBtn = document.getElementById("addRow");
const addColBtn = document.getElementById("addCol");
const delRowBtn = document.getElementById("delRow");
const delColBtn = document.getElementById("delCol");


let rows = 4;
let cols = 4;
let hoverCol=null;
let hoverRow=null;

function render() {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${cols}, ${CELL}px)`;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = r;
      cell.dataset.col = c;
      grid.appendChild(cell);
    }
  }

  updateAddButtons();
}


addColBtn.style.height = "50px";
addRowBtn.style.width  = "50px";


grid.addEventListener("mousemove", e => {
  const cell = e.target.closest(".cell");
  if (!cell) return;

  hoverRow = Number(cell.dataset.row);
  hoverCol = Number(cell.dataset.col);

  if (rows > 1) {
    delRowBtn.style.display = "block";
    delRowBtn.style.transform = `translateY(${hoverRow * STEP}px)`;
  } else {
    delRowBtn.style.display = "none";
  }

  if (cols > 1) {
    delColBtn.style.display = "block";
    delColBtn.style.transform = `translateX(${hoverCol * STEP}px)`;
  } else {
    delColBtn.style.display = "none";
  }
});

addRowBtn.addEventListener("click", () => {
  rows++;
  render();
});

addColBtn.addEventListener("click", () => {
  cols++;
  render();
});

delRowBtn.addEventListener("click", () => {
  if (rows > 1 && hoverRow !== null) {
    rows--;
    render();
  }
});

delColBtn.addEventListener("click", () => {
  if (cols > 1 && hoverCol !== null) {
    cols--;
    render();
  }
});

render();
