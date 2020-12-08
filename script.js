class RockPaperScissors {
  constructor({
    playerArea: { player, playerScores },
    computerArea: { computer, computerScores },
    message
  }) {
    this.player = document.querySelector(player);
    this.playerScores = document.querySelector(playerScores);

    this.computer = document.querySelector(computer);
    this.computerScores = document.querySelector(computerScores);
    
    this.message = document.querySelector(message);

    this.selectOption = this.selectOption.bind(this);
  }

  showScores() {
    this.playerScores.innerText = this.playerScore;
    this.computerScores.innerText = this.computerScore;
  }

  addAndRemoveClasses(element, classToAdd, classesToRemove) {
    classesToRemove.forEach((classToRemove) => {
      element.classList.remove(classToRemove);
    });
    element.classList.add(classToAdd);
  }

  generateResult() {
    if (
      (this.playerOptionValue === this.computerOptionValue) ||
      (this.playerOptionValue === this.computerOptionValue) ||
      (this.playerOptionValue === this.computerOptionValue)
    ) {
      this.addAndRemoveClasses(this.message.parentNode, 'draw-game', ['player-win', 'computer-win']);
      this.message.innerText = 'Draw!';
    } else if (
      (this.playerOptionValue === 0 && this.computerOptionValue === 2) ||
      (this.playerOptionValue === 1 && this.computerOptionValue === 0) ||
      (this.playerOptionValue === 2 && this.computerOptionValue === 1)
    ) {
      this.addAndRemoveClasses(this.message.parentNode, 'player-win', ['draw-game', 'computer-win']);
      this.message.innerText = 'Player Wins!';
      this.playerScore++;
    } else {
      this.addAndRemoveClasses(this.message.parentNode, 'computer-win', ['draw-game', 'player-win']);
      this.message.innerText = 'Computer Wins!';
      this.computerScore++;
    }
  }

  getComputerOption() {
    this.computerOptionValue = Math.floor(Math.random() * 3);

    const computerOptions = this.computer.querySelectorAll("[data-game]");
    computerOptions.forEach((computerOption) => {
      if (Number(computerOption.dataset.game) === this.computerOptionValue) {
        computerOption.classList.add("selected");
      } else {
        computerOption.classList.remove("selected");
      }
    });
  }

  selectOption(e) {
    const selectedOption = e.target;
    this.playerOptionValue = Number(selectedOption.dataset.game);

    this.playerOptions.forEach((playerOption) => {
      playerOption.classList.remove("selected");
    });
    selectedOption.classList.add("selected");

    this.getComputerOption();
    this.generateResult();
    this.showScores();
  }

  defineScores() {
    this.playerScore = 0, this.computerScore = 0;
    this.showScores();
  }

  startGame() {
    this.defineScores();

    this.playerOptions = this.player.querySelectorAll("[data-game]");
    this.playerOptions.forEach((playerOption) => {
      playerOption.addEventListener("click", this.selectOption);
    });
  }

  init() {
    if (this.player && this.computer) {
      this.startGame();
    }
    return this;
  }
}

const game = new RockPaperScissors({
  playerArea: {
    player: ".game .player1",
    playerScores: '.player1 .player-scores',
  },
  computerArea: {
    computer: ".game .player2",
    computerScores: '.player2 .player-scores',
  },
  message: ".game-message span",
});
game.init();
