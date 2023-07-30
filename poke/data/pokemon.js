// Create pokemon objects
const pokemon = {
  TorchicFront: {
    position: {
      x: 312,
      y: -32,
    },
    frames: {
      max: 1,
      hold: 1,
    },
    image: {
      src: "./poke/Images/torchic-front.png",
    },
    isEnemy: true,
    name: "Torchic Front",
    attacks: [attacks.Tackle, attacks.Fireball],
    animate: false,
  },
  TorchicBack: {
    position: {
      x: 72,
      y: 72,
    },
    frames: {
      max: 1,
      hold: 1,
    },
    image: {
      src: "./poke/Images/torchic-back.png",
    },
    isEnemy: false,
    name: "Torchic Back",
    attacks: [attacks.Tackle, attacks.Fireball],
    animate: false,
  },
};
