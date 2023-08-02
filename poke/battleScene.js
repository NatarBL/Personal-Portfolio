const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./poke/Images/battleBackground.png";
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});

let enemy;
let user;
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

  var randomEncounter = Math.floor(Math.random() * encounters.length);

  switch (encounters[randomEncounter]) {
    case "Torchic":
      enemy = new Pokemon(pokemon.TorchicFront);
      break;
    case "Mudkip":
      enemy = new Pokemon(pokemon.MudkipFront);
      break;
    case "Treecko":
      enemy = new Pokemon(pokemon.TreeckoFront);
      break;
  }
  user = new Pokemon(pokemon.TorchicBack);
  renderedSprite = [enemy, user];
  queue = [];
  createDialogButtons(user, enemy);
}
function createDialogButtons(user, enemy) {
  const switchButton = document.createElement("button");
  switchButton.style = "border: 0; font-family: 'Arial'; font-size: 24px";
  switchButton.innerHTML = "Switch";
  document.querySelector("#runBox").append(switchButton);

  const catchButton = document.createElement("button");
  catchButton.style = "border: 0; font-family: 'Arial'; font-size: 24px";
  catchButton.innerHTML = "Catch";
  document.querySelector("#runBox").append(catchButton);

  const runButton = document.createElement("button");
  runButton.style = "border: 0; font-family: 'Arial'; font-size: 24px";
  runButton.innerHTML = "Run";
  document.querySelector("#runBox").append(runButton);

  document.querySelector("#attacksBox").replaceChildren();
  user.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.style = "border: 0; font-family: 'Arial'; font-size: 24px";
    button.innerHTML = attack.name;
    document.querySelector("#attacksBox").append(button);
  });

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.currentTarget.innerHTML.replace(/\s/g, "") === "Switch") {
        user.switchPoke();
        return;
      }
      if (e.currentTarget.innerHTML.replace(/\s/g, "") === "Catch") {
        user.catch();
        return;
      }
      if (e.currentTarget.innerHTML.replace(/\s/g, "") === "Run") {
        user.run();
        return;
      }
      if (user.speed > enemy.speed) {
        attackFirst(user, enemy, e, queue);
      } else if (user.speed < enemy.speed) {
        attackSecond(enemy, user, e, queue);
      } else {
        let randNum = Math.random();
        if (randNum > 0.5) {
          attackFirst(user, enemy, e, queue);
        } else {
          attackSecond(enemy, user, e, queue);
        }
      }
    });
  });
}
function attackFirst(first, second, e, queue) {
  // User attacks here
  const selectedAttack = attacks[e.currentTarget.innerHTML.replace(/\s/g, "")];
  firstAttacksSecond(first, second, selectedAttack);

  // Enemy attacks here
  const randAttack =
    second.attacks[Math.floor(Math.random() * second.attacks.length)];
  queue.push(() => {
    secondAttacksFirst(first, second, randAttack);
  });
}
function attackSecond(first, second, e, queue) {
  // Enemy attacks here
  const randAttack =
    first.attacks[Math.floor(Math.random() * first.attacks.length)];
  firstAttacksSecond(first, second, randAttack);

  // User attacks here
  const selectedAttack = attacks[e.currentTarget.innerHTML.replace(/\s/g, "")];
  queue.push(() => {
    secondAttacksFirst(first, second, selectedAttack);
  });
}
function firstAttacksSecond(first, second, attacktype) {
  first.attack({
    attack: attacktype,
    recipient: second,
    renderedSprite,
  });
  if (second.health <= 0) {
    queue.push(() => {
      second.faint();
    });
    return;
  }
}
function secondAttacksFirst(first, second, attacktype) {
  second.attack({
    attack: attacktype,
    recipient: first,
    renderedSprite,
  });
  if (first.health <= 0) {
    queue.push(() => {
      first.faint();
    });
    return;
  }
}
function animateBattle() {
  document.querySelector("#playerName").innerHTML = user.name;
  document.querySelector("#playerLevel").innerHTML = "Lv. " + user.level;
  document.querySelector("#enemyName").innerHTML = enemy.name;
  document.querySelector("#enemyLevel").innerHTML = "Lv. " + enemy.level;

  battleAnimationID = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

  renderedSprite.forEach((sprite) => {
    sprite.draw();
  });
}
