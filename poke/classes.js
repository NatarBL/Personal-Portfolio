var isAnimating = false;

class Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1 },
    sprites,
    animate = false,
    rotation = 0,
  }) {
    this.position = position;
    this.image = new Image();
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.image.src = image.src;
    this.animate = animate;
    this.sprites = sprites;
    this.opacity = 1.0;
    this.rotation = rotation;
  }

  draw() {
    c.save();
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    c.rotate(this.rotation);
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );
    c.globalAlpha = this.opacity;
    if (this.isEnemy == 1) {
      c.drawImage(
        this.frontImage,
        // Frames moved over when moving character
        this.frames.val * this.width,
        0,
        this.frontImage.width / this.frames.max,
        this.frontImage.height,
        this.position.x,
        this.position.y,
        this.frontImage.width / this.frames.max,
        this.frontImage.height
      );
    } else if (this.isEnemy == 2) {
      c.drawImage(
        this.backImage,

        // Frames moved over when moving character
        this.frames.val * this.width,
        0,
        this.backImage.width / this.frames.max,
        this.backImage.height,
        this.position.x,
        this.position.y,
        this.backImage.width / this.frames.max,
        this.backImage.height
      );
    } else {
      c.drawImage(
        this.image,

        // Frames moved over when moving character
        this.frames.val * this.width,
        0,
        this.image.width / this.frames.max,
        this.image.height,
        this.position.x,
        this.position.y,
        this.image.width / this.frames.max,
        this.image.height
      );
    }

    c.restore();

    if (!this.animate) {
      // Returns character to standing when stopped moving
      this.frames.val = 0;
      return;
    }
    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }
    if (this.frames.elapsed % 10 === 0) {
      if (this.frames.val < this.frames.max - 1) {
        this.frames.val++;
      } else {
        this.frames.val = 0;
      }
    }
  }
}
class Pokemon extends Sprite {
  constructor({
    position,
    velocity,
    backImage,
    frontImage,
    frames = { max: 1 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = 2,
    name,
    attacks,
    level,
    phyDefense,
    phyAttack,
    type,
    health,
    maxHealth,
    speed,
    id,
  }) {
    super({
      position,
      velocity,
      image,
      frames,
      sprites,
      animate,
      rotation,
    });
    this.health = health;
    this.isEnemy = isEnemy;
    this.name = name;
    this.attacks = attacks;
    this.level = level;
    this.phyDefense = phyDefense;
    this.phyAttack = phyAttack;
    this.type = type;
    this.maxHealth = maxHealth;
    this.speed = speed;
    this.backImage = new Image();
    this.frontImage = new Image();
    this.backImage.src = backImage.src;
    this.frontImage.src = frontImage.src;
    this.id = id;
  }
  switchPoke() {
    document.querySelector("#pokeSelect").replaceChildren();
    document.querySelector("#runBox").replaceChildren();
    let selectedMon;
    pokemonTeam.forEach((member) => {
      const button = document.createElement("button");
      button.style = "border: 0; font-family: 'Arial'; font-size: 24px";
      button.innerHTML = member.name;
      document.querySelector("#pokeSelect").append(button);
    });

    document.querySelector("#pokeSelect").style.display = "grid";
    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (e) => {
        for (let i = 0; i < pokemonTeam.length; i++) {
          if (
            e.currentTarget.innerHTML.replace(/\s/g, "") == pokemonTeam[i].name
          ) {
            selectedMon = pokemonTeam[i];
          }
        }
        user = selectedMon;
        user.isEnemy = 2;
        user.attacks = selectedMon.attacks;
        renderedSprite[1] = selectedMon;
        createDialogButtons(user, enemy);
        const randAttack =
          enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)];
        queue.push(() => {
          secondAttacksFirst(user, enemy, randAttack);
        });
        document.querySelector("#pokeSelect").style.display = "none";
        document.querySelector("#dialogBox").style.display = "block";
        document.querySelector("#dialogBox").innerHTML =
          user.name + " was sent out.";
        addToQueue();
      });
    });
  }
  catch() {
    let randNum = Math.floor(Math.random() * 100);
    if (randNum > 50) {
      console.log("Caught.");
      addToTeam(enemy);
    }
  }
  run() {
    battle.initiated = false;
    document.querySelector("#dialogBox").style.display = "block";
    document.querySelector("#dialogBox").innerHTML =
      "You got away successfully!";
    gsap.to("#overlappingDiv", {
      opacity: 1,
      onComplete: () => {
        cancelAnimationFrame(battleAnimationID);
        animate();
        document.querySelector("#battleDisplay").style.display = "none";
        gsap.to("#overlappingDiv", {
          opacity: 0,
        });
      },
    });
    addToQueue();
  }
  attack({ attack, recipient, renderedSprite }) {
    let dialogMsg = this.name + " used " + attack.name + "!";
    let movementDistance = 20;
    let rotation = 1;
    let healthBar = "#enemyHealthBar";
    recipient.health =
      recipient.health -
      calculator(
        this.level,
        attack.damage,
        this.type,
        recipient.type,
        this.phyAttack,
        recipient.phyDefense,
        attack.type
      );
    if (this.isEnemy === 1) {
      movementDistance = -20;
      healthBar = "#playerHealthBar";
      rotation = -2.2;
    }
    if (isCriticalHit && attack.damage !== 0) {
      dialogMsg = this.name + " used " + attack.name + ", it's a critical hit!";
    } else if (isSuperEffective) {
      dialogMsg =
        this.name + " used " + attack.name + ", it's super effective!";
    } else if (isNotEffective) {
      dialogMsg =
        this.name + " used " + attack.name + ", it isn't very effective.";
    }
    document.querySelector("#dialogBox").style.display = "block";
    document.querySelector("#dialogBox").innerHTML = dialogMsg;
    switch (attack.name) {
      case "Tackle":
        const tl = gsap.timeline();
        tl.to(this.position, {
          x: this.position.x - movementDistance * 1.5,
        })
          .to(this.position, {
            x: this.position.x + movementDistance,
            duration: 0.25,
            onComplete: () => {
              // Enemy is hit
              gsap.to(healthBar, {
                width:
                  ((recipient.health / recipient.maxHealth) * 100).toFixed(2) +
                  "%",
              });
              gsap.to(recipient, {
                opacity: 0,
                repeat: 7,
                yoyo: true,
                duration: 0.1,
              });
            },
          })
          .to(this.position, {
            x: this.position.x,
            duration: 0.5,
          });
        addToQueue();
        break;
      case "Fireball":
        const fireballImage = new Image();
        fireballImage.src = "./poke/Images/fireball2.png";
        const fireball = new Sprite({
          position: {
            x: this.position.x + 65,
            y: this.position.y + 75,
          },
          image: fireballImage,
          frames: {
            max: 4,
            hold: 10,
          },
          animate: true,
          rotation: rotation,
        });
        renderedSprite.splice(1, 0, fireball);
        gsap.to(fireball.position, {
          x: recipient.position.x + 65,
          y: recipient.position.y + 75,
          duration: 0.6,
          onComplete: () => {
            gsap.to(healthBar, {
              width:
                ((recipient.health / recipient.maxHealth) * 100).toFixed(2) +
                "%",
            });
            gsap.to(recipient, {
              opacity: 0,
              repeat: 7,
              yoyo: true,
              duration: 0.1,
            });
            addToQueue();
            renderedSprite.splice(1, 1);
          },
        });
        break;
      case "Growl":
        let growlAdditional = recipient.isEnemy === 1 ? 0 : 36;
        const growstatdownImage = new Image();
        growstatdownImage.src = "./poke/Images/stat-down.png";
        const growlStatdown = new Sprite({
          position: {
            x: recipient.position.x + 36,
            y: recipient.position.y + growlAdditional,
          },
          image: growstatdownImage,
          frames: {
            max: 4,
            hold: 10,
          },
          animate: true,
        });
        renderedSprite.splice(2, 0, growlStatdown);

        document.querySelector("#dialogBox").innerHTML =
          dialogMsg + " " + recipient.name + "s attack dropped by 1.";
        recipient.phyDefense = recipient.phyAttack * 0.67;
        gsap.to(growlStatdown.position, {
          duration: 1.5,
          onComplete: () => {
            gsap.to(healthBar, {
              width:
                ((recipient.health / recipient.maxHealth) * 100).toFixed(2) +
                "%",
            });
            addToQueue();
            renderedSprite.splice(2, 1);
          },
        });
        break;
      case "Tail Whip":
        let additional = recipient.isEnemy === 1 ? 0 : 36;
        const statdownImage = new Image();
        statdownImage.src = "./poke/Images/stat-down.png";
        const statdown = new Sprite({
          position: {
            x: recipient.position.x + 36,
            y: recipient.position.y + additional,
          },
          image: statdownImage,
          frames: {
            max: 4,
            hold: 10,
          },
          animate: true,
        });
        renderedSprite.splice(2, 0, statdown);

        document.querySelector("#dialogBox").innerHTML =
          dialogMsg + " " + recipient.name + "s defense dropped by 1.";
        recipient.phyDefense = recipient.phyDefense * 0.67;
        gsap.to(statdown.position, {
          duration: 1.5,
          onComplete: () => {
            gsap.to(healthBar, {
              width:
                ((recipient.health / recipient.maxHealth) * 100).toFixed(2) +
                "%",
            });
            addToQueue();
            renderedSprite.splice(2, 1);
          },
        });
        break;
      case "Razor Leaf":
        const razopleaftl = gsap.timeline();

        razopleaftl
          .to(this.position, {
            x: this.position.x - movementDistance * 1.5,
          })
          .to(this.position, {
            x: this.position.x + movementDistance,
            duration: 0.25,
            onComplete: () => {
              // Enemy is hit
              gsap.to(healthBar, {
                width:
                  ((recipient.health / recipient.maxHealth) * 100).toFixed(2) +
                  "%",
              });
              gsap.to(recipient, {
                opacity: 0,
                repeat: 7,
                yoyo: true,
                duration: 0.1,
              });
            },
          })
          .to(this.position, {
            x: this.position.x,
            duration: 0.5,
          });
        addToQueue();
        break;
      case "Water Gun":
        const waterguntl = gsap.timeline();

        waterguntl
          .to(this.position, {
            x: this.position.x - movementDistance * 1.5,
          })
          .to(this.position, {
            x: this.position.x + movementDistance,
            duration: 0.25,
            onComplete: () => {
              // Enemy is hit
              gsap.to(healthBar, {
                width:
                  ((recipient.health / recipient.maxHealth) * 100).toFixed(2) +
                  "%",
              });
              gsap.to(recipient, {
                opacity: 0,
                repeat: 7,
                yoyo: true,
                duration: 0.1,
              });
            },
          })
          .to(this.position, {
            x: this.position.x,
            duration: 0.5,
          });
        addToQueue();
        break;
    }
  }
  faint() {
    const faintMsg =
      this.isEnemy === 1
        ? "The opposing " + this.name + " fainted."
        : "Your " + this.name + " fainted!";
    document.querySelector("#dialogBox").innerHTML = faintMsg;
    battle.initiated = false;
    gsap.to(this.position, {
      y: this.position.y + 25,
    });
    gsap.to(this, {
      opacity: 0,
      duration: 2.0,
      onComplete: () => {
        gsap.to(this.position, {
          y: this.position.y - 25,
        });
      },
    });
    gsap.to("#overlappingDiv", {
      opacity: 1,
      onComplete: () => {
        cancelAnimationFrame(battleAnimationID);
        animate();
        document.querySelector("#battleDisplay").style.display = "none";
        gsap.to("#overlappingDiv", {
          opacity: 0,
        });
      },
    });
  }
}
function addToQueue() {
  let strLen = document.querySelector("#dialogBox").innerHTML.length;
  setTimeout(() => {
    isAnimating = false;
    if (queue.length > 0) {
      queue[0]();
      queue.shift();
    } else {
      document.querySelector("#dialogBox").style.display = "none";
    }
  }, strLen * 10 + 1500);
}
class Boundary {
  static width = 32;
  static height = 32;
  constructor({ position }) {
    this.position = position;
    //Change numbers to more accurate to zoom of map
    this.width = 32;
    this.height = 32;
  }

  draw() {
    c.fillStyle = "rgba(255, 0, 0, 0.0)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
