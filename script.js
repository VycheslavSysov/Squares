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
let hoverCol = null;
let hoverRow = null;
let deleteRowIndex = null;
let deleteColIndex = null;


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

  if (rows > 1 && hoverRow !== null) {
    delRowBtn.style.display = "block";
    delRowBtn.style.transform = `translateY(${hoverRow * STEP}px)`;
  } else {
    delRowBtn.style.display = "none";
  }

  if (cols > 1 && hoverCol !== null) {
    delColBtn.style.display = "block";
    delColBtn.style.transform = `translateX(${hoverCol * STEP}px)`;
  } else {
    delColBtn.style.display = "none";
  }
}

addColBtn.style.height = "50px";
addRowBtn.style.width = "50px";

grid.addEventListener("mousemove", e => {
  const cell = e.target.closest(".cell");
  if (!cell) return;

  hoverRow = Number(cell.dataset.row);
  deleteRowIndex = hoverRow;
  hoverCol = Number(cell.dataset.col);
  deleteColIndex = hoverCol;

  if (rows > 1) {
    delRowBtn.style.display = "block";
    delRowBtn.style.transform = `translateY(${hoverRow * STEP}px)`;
  }

  if (cols > 1) {
    delColBtn.style.display = "block";
    delColBtn.style.transform = `translateX(${hoverCol * STEP}px)`;
  }
});

grid.addEventListener("mouseleave", (event) => {
   const { relatedTarget } = event;
   console.log(relatedTarget);

      hoverRow = null;
      hoverCol = null;
});

delRowBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (rows > 1 && deleteRowIndex !== null) {

    rows--;
    console.log("rows:", rows);
  }
  render();
});

delColBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (cols > 1 && deleteColIndex !== null) {

    cols--;
    console.log("cols:", cols);
  }
  render();
});

addRowBtn.addEventListener("click", () => {
  rows++;
  render();
});

addColBtn.addEventListener("click", () => {
  cols++;
  render();
});



render();
