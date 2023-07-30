const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./poke/Images/battleBackground.png";
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});

let torchicFront;
let torchicBack;
let renderedSprite;
let queue = [];
let battleAnimationID;

function initBattle() {
  document.querySelector("#battleDisplay").style.display = "block";
  document.querySelector("#dialogBox").style.display = "none";
  document.querySelector("#playerHealthBar").style.width = "100%";
  document.querySelector("#enemyHealthBar").style.width = "100%";
  document.querySelector("#attacksBox").replaceChildren();

  torchicFront = new Pokemon(pokemon.TorchicFront);
  torchicBack = new Pokemon(pokemon.TorchicBack);
  renderedSprite = [torchicFront, torchicBack];
  queue = [];

  torchicBack.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.style = "border: 0; font-family: 'Arial'; font-size: 24px";
    button.innerHTML = attack.name;
    document.querySelector("#attacksBox").append(button);
  });
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedAttack =
        attacks[e.currentTarget.innerHTML.replace(/\s/g, "")];
      torchicBack.attack({
        attack: selectedAttack,
        recipient: torchicFront,
        renderedSprite,
      });
      // Check if enemy pokemon fainted
      if (torchicFront.health <= 0) {
        queue.push(() => {
          torchicFront.faint();
        });
        return;
      }

      // Enemy attacks here
      const randAttack =
        torchicBack.attacks[
          Math.floor(Math.random() * torchicBack.attacks.length)
        ];
      queue.push(() => {
        torchicFront.attack({
          attack: randAttack,
          recipient: torchicBack,
          renderedSprite,
        });
        if (torchicBack.health <= 0) {
          queue.push(() => {
            torchicBack.faint();
          });
          return;
        }
      });
    });
  });
}

function animateBattle() {
  battleAnimationID = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

  renderedSprite.forEach((sprite) => {
    sprite.draw();
  });
}
