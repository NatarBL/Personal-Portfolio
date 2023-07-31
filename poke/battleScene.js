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
  document.querySelector("#runBox").replaceChildren();

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
  const button = document.createElement("button");
  button.style = "border: 0; font-family: 'Arial'; font-size: 24px";
  button.innerHTML = "Run";
  document.querySelector("#runBox").append(button);

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.currentTarget.innerHTML.replace(/\s/g, "") === "Run") {
        torchicBack.run();
        return;
      }
      console.log("Spd: " + torchicBack.speed);
      console.log("Spd: " + torchicFront.speed);
      if (torchicBack.speed > torchicFront.speed) {
        attackFirst(torchicBack, torchicFront, e, queue);
      } else if (torchicBack.speed < torchicFront.speed) {
        attackSecond(torchicFront, torchicBack, e, queue);
      } else {
        let randNum = Math.random();
        if (randNum > 0.5) {
          attackFirst(torchicBack, torchicFront, e, queue);
        } else {
          attackSecond(torchicFront, torchicBack, e, queue);
        }
      }
    });
  });
}
function attackFirst(first, second, e, queue) {
  // User attacks here
  const selectedAttack = attacks[e.currentTarget.innerHTML.replace(/\s/g, "")];
  first.attack({
    attack: selectedAttack,
    recipient: second,
    renderedSprite,
  });
  if (second.health <= 0) {
    queue.push(() => {
      second.faint();
    });
    return;
  }

  // Enemy attacks here
  const randAttack =
    first.attacks[Math.floor(Math.random() * first.attacks.length)];
  queue.push(() => {
    second.attack({
      attack: randAttack,
      recipient: first,
      renderedSprite,
    });
    if (first.health <= 0) {
      queue.push(() => {
        first.faint();
      });
      return;
    }
  });
}
function attackSecond(first, second, e, queue) {
  // Enemy attacks here
  const randAttack =
    second.attacks[Math.floor(Math.random() * second.attacks.length)];
  first.attack({
    attack: randAttack,
    recipient: second,
    renderedSprite,
  });
  if (second.health <= 0) {
    queue.push(() => {
      second.faint();
    });
    return;
  }

  // // User attacks here
  const selectedAttack = attacks[e.currentTarget.innerHTML.replace(/\s/g, "")];
  queue.push(() => {
    second.attack({
      attack: selectedAttack,
      recipient: first,
      renderedSprite,
    });
    if (first.health <= 0) {
      queue.push(() => {
        first.faint();
      });
      return;
    }
  });
}
function animateBattle() {
  battleAnimationID = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

  renderedSprite.forEach((sprite) => {
    sprite.draw();
  });
}
