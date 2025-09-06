const boxes = document.querySelectorAll(".box");
const messageContainer = document.getElementById("message-container");
const message = document.getElementById("message");
const newBtn = document.querySelector(".btn-new");
const resetBtn = document.querySelector(".btn-reset");

let turnO = true; // true = O's turn, false = X's turn

const winningPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

// Box click event
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.add("o");
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add("x");
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

// Check winner
function checkWinner() {
  for (let pattern of winningPatterns) {
    let [a, b, c] = pattern;

    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 !== "" && val1 === val2 && val2 === val3) {
      showWinner(val1);
      disableBoxes();
      return;
    }
  }
   // Draw (withdraw) check
   let filled = true;
   boxes.forEach((box) => {
     if (box.innerText === "") filled = false;
   });
 
   if (filled) {
     message.innerText = "😐 Withdraw! Try Again";
     messageContainer.style.display = "flex";
   }
}

function showWinner(winner) {
  message.innerText = `🎉 Congratulations! Winner is ${winner}`;
  messageContainer.style.display = "flex";
}

function disableBoxes() {
  boxes.forEach((box) => (box.disabled = true));
}

function enableBoxes() {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("o", "x");
  });
}

function resetGame() {
  turnO = true;
  enableBoxes();
  messageContainer.style.display = "none";
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
