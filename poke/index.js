const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 480;
canvas.height = 352;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}
const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}

const boundries = [];

const offset = {
  x: -744,
  y: -230,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol == 4017) {
      boundries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
    }
  });
});

const battleZones = [];

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol == 4017) {
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
    }
  });
});

const image = new Image();
image.src = "./poke/Images/Map.png";

const foregroundImage = new Image();
foregroundImage.src = "./poke/Images/Foreground.png";

const playerUpImage = new Image();
playerUpImage.src = "./poke/Images/Hero-Up.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./poke/Images/Hero-Left.png";

const playerRightImage = new Image();
playerRightImage.src = "./poke/Images/Hero-Right.png";

const playerDownImage = new Image();
playerDownImage.src = "./poke/Images/Hero-Down.png";

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 8,
    y: canvas.height / 2 - 288 / 8,
  },
  image: playerDownImage,
  frames: {
    max: 4,
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    down: playerDownImage,
    right: playerRightImage,
  },
});
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});
const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const moveables = [background, foreground, ...boundries, ...battleZones];

function retangulatCollisions({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + (rectangle1.width - 3) >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + (rectangle2.width - 3) &&
    rectangle1.position.y <= rectangle2.position.y + (rectangle2.height - 16) &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}
const battle = {
  initiated: false,
};
function animate() {
  const animationId = window.requestAnimationFrame(animate);
  background.draw();
  boundries.forEach((boundary) => {
    boundary.draw();
  });
  battleZones.forEach((battleZone) => {
    battleZone.draw();
  });
  player.draw();
  foreground.draw();

  let moving = true;
  player.animate = false;
  if (battle.initiated) return;
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      const encounterRate = 0.05;
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y));
      if (
        retangulatCollisions({
          rectangle1: player,
          rectangle2: battleZone,
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < encounterRate
      ) {
        //deactivate current animation loop
        window.cancelAnimationFrame(animationId);
        battle.initiated = true;
        gsap.to("#overlappingDiv", {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.3,
          onComplete() {
            gsap.to("#overlappingDiv", {
              opacity: 1,
              duration: 0.3,
              onComplete() {
                initBattle();
                animateBattle();
                // What attack is being used
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                  duration: 0.3,
                });
              },
            });
          },
        });
        break;
      }
    }
  }

  if (keys.w.pressed && lastKey == "w") {
    player.animate = true;
    player.image = player.sprites.up;
    for (let i = 0; i < boundries.length; i++) {
      const boundary = boundries[i];
      if (
        retangulatCollisions({
          rectangle1: player,
          rectangle2: {
            ...boundary,

            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving) {
      moveables.forEach((movable) => {
        movable.position.y += 3;
      });
    }
  } else if (keys.a.pressed && lastKey == "a") {
    player.animate = true;
    player.image = player.sprites.left;
    for (let i = 0; i < boundries.length; i++) {
      const boundary = boundries[i];
      if (
        retangulatCollisions({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving) {
      moveables.forEach((movable) => {
        movable.position.x += 3;
      });
    }
  } else if (keys.s.pressed && lastKey == "s") {
    player.animate = true;
    player.image = player.sprites.down;
    for (let i = 0; i < boundries.length; i++) {
      const boundary = boundries[i];
      if (
        retangulatCollisions({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) {
      moveables.forEach((movable) => {
        movable.position.y -= 3;
      });
    }
  } else if (keys.d.pressed && lastKey == "d") {
    player.animate = true;
    player.image = player.sprites.right;
    for (let i = 0; i < boundries.length; i++) {
      const boundary = boundries[i];
      if (
        retangulatCollisions({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) {
      moveables.forEach((movable) => {
        movable.position.x -= 3;
      });
    }
  }
}
animate();

let lastKey = "";
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
