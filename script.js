const targetNumber = Math.floor(Math.random() * 20) + 1;
let attemptsLeft = 10;
const previousAttempts = [];

function updateMessage(message, emojiClass) {
  const messageElement = document.getElementById("message");
  const emojiElement = document.getElementById("emoji");

  messageElement.textContent = message;

  emojiElement.classList.remove("win", "lose");
  if (emojiClass) {
    emojiElement.classList.add(emojiClass);
  }
}

function updateAttemptsList(guess, isWinner) {
  const attemptsList = document.getElementById("attempts-list");
  const listItem = document.createElement("li");

  let emoji = "👀"; // Emoji por defecto para intentos fallidos
  if (isWinner) {
    emoji = "👍"; // Emoji para intentos exitosos
  }

  listItem.textContent = `Intento ${10 - attemptsLeft + 1}: ${guess} ${emoji}`;
  attemptsList.appendChild(listItem);

  previousAttempts.push({ guess, emoji });
}

function endGame(isWinner) {
  document.getElementById("check").setAttribute("disabled", true);
  document.getElementById("guess").setAttribute("disabled", true);

  if (isWinner) {
    updateMessage("¡Muy bien! Adivinaste!!! Intentalo de nuevo!", "win");
  } else {
    updateMessage(
      `¡Perdiste, vuelve a intentarlo! El número era ${targetNumber}.`,
      "lose"
    );
  }
}

function checkGuess() {
  const guess = parseInt(document.getElementById("guess").value, 10);

  if (isNaN(guess) || guess < 1 || guess > 20) {
    updateMessage("Ingresaste un numero inválido (1-20).");
  } else if (guess === targetNumber) {
    updateAttemptsList(guess, true);
    endGame(true);
  } else {
    attemptsLeft--;
    document.getElementById("attempts").textContent = attemptsLeft;

    updateAttemptsList(guess, false);

    if (attemptsLeft === 0) {
      endGame(false);
    } else {
      const message =
        guess < targetNumber ? "El número es mayor." : "El número es menor.";
      updateMessage(message);
    }
  }
}

document.getElementById("check").addEventListener("click", checkGuess);
