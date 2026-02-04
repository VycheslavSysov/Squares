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
let hoverRow = null;
let hoverCol = null;

function toggleButton(btn, show, transform = "") {
  btn.style.display = show ? "block" : "none";
  if (show) btn.style.transform = transform;
}

function render() {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${cols}, ${CELL}px)`;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid.insertAdjacentHTML(
        "beforeend",
        `<div class="cell" data-row="${r}" data-col="${c}"></div>`
      );
    }
  }

  function hideDeleteButtons() {
  hoverRow = null;
  hoverCol = null;
  render();
}

delRowBtn.addEventListener("mouseleave", hideDeleteButtons);
delColBtn.addEventListener("mouseleave", hideDeleteButtons);


  toggleButton(
    delRowBtn,
    rows > 1 && hoverRow !== null,
    `translateY(${hoverRow * STEP}px)`
  );

  toggleButton(
    delColBtn,
    cols > 1 && hoverCol !== null,
    `translateX(${hoverCol * STEP}px)`
  );
}

grid.addEventListener("mousemove", e => {
  const cell = e.target.closest(".cell");
  if (!cell) return;

  hoverRow = +cell.dataset.row;
  hoverCol = +cell.dataset.col;

  render();
});

grid.addEventListener("mouseleave", e => {
  if (!e.relatedTarget?.id?.startsWith("del")) {
    hoverRow = null;
    hoverCol = null;
    render();
  }
});

delRowBtn.addEventListener("click", e => {
  e.stopPropagation();
  if (rows > 1) rows--;
  hoverRow = null;
  render();
});

delColBtn.addEventListener("click", e => {
  e.stopPropagation();
  if (cols > 1) cols--;
  hoverCol = null;
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
