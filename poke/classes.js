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
    image,
    frames = { max: 1 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    attacks,
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

    this.health = 100;
    this.isEnemy = isEnemy;
    this.name = name;
    this.attacks = attacks;
  }
  attack({ attack, recipient, renderedSprite }) {
    // Create queue of events
    // document.querySelector("#dialogBox").addEventListener("click", (e) => {
    //   if (isAnimating === false) {
    //     console.log("Running code...");
    //     if (queue.length > 0) {
    //       queue[0]();
    //       queue.shift();
    //     } else {
    //       document.querySelector("#dialogBox").style.display = "none";
    //     }
    //   }
    // });

    document.querySelector("#dialogBox").style.display = "block";
    document.querySelector("#dialogBox").innerHTML =
      this.name + " used " + attack.name + "!";
    let movementDistance = 20;
    let rotation = 1;
    let healthBar = "#enemyHealthBar";
    recipient.health = recipient.health - attack.damage;
    if (this.isEnemy) {
      movementDistance = -20;
      healthBar = "#playerHealthBar";
      rotation = -2.2;
    }
    isAnimating = true;

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
                width: recipient.health + "%",
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
              width: recipient.health + "%",
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
    }
  }
  faint() {
    const faintMsg = this.isEnemy
      ? "The opposing " + this.name + " fainted."
      : "Your " + this.name + " fainted!";
    document.querySelector("#dialogBox").innerHTML = faintMsg;
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
    setTimeout(() => {
      battle.initiated = false;
    }, 1000);
  }
}
function addToQueue() {
  setTimeout(() => {
    isAnimating = false;
    if (queue.length > 0) {
      queue[0]();
      queue.shift();
    } else {
      document.querySelector("#dialogBox").style.display = "none";
    }
  }, 1500);
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
