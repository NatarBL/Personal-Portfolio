let encounters = ["Torchic", "Mudkip", "Treecko"];
// Create pokemon objects
const pokemon = {
  Torchic: {
    position: {
      x: 312,
      y: -32,
    },
    frames: {
      max: 1,
      hold: 1,
    },
    frontImage: {
      src: "./poke/Images/torchic-front.png",
    },
    backImage: {
      src: "./poke/Images/torchic-back.png",
    },

    isEnemy: true,
    name: "Torchic",
    attacks: [attacks.Fireball, attacks.TailWhip],
    animate: false,
    level: 5,
    phyAttack: 60,
    phyDefense: 40,
    type: "Fire",
    health: 45,
    maxHealth: 45,
    speed: 45,
  },
  Mudkip: {
    position: {
      x: 312,
      y: -32,
    },
    frames: {
      max: 1,
      hold: 1,
    },
    frontImage: {
      src: "./poke/Images/mudkip-front.png",
    },
    backImage: {
      src: "./poke/Images/mudkip-back.png",
    },
    isEnemy: true,
    name: "Mudkip",
    attacks: [attacks.WaterGun, attacks.TailWhip],
    animate: false,
    level: 5,
    phyAttack: 60,
    phyDefense: 40,
    type: "Water",
    health: 45,
    maxHealth: 45,
    speed: 45,
  },
  Treecko: {
    position: {
      x: 312,
      y: -32,
    },
    frames: {
      max: 1,
      hold: 1,
    },
    frontImage: {
      src: "./poke/Images/treecko-front.png",
    },
    backImage: {
      src: "./poke/Images/treecko-back.png",
    },
    isEnemy: true,
    name: "Treecko",
    attacks: [attacks.RazorLeaf, attacks.TailWhip],
    animate: false,
    level: 7,
    phyAttack: 60,
    phyDefense: 40,
    type: "Grass",
    health: 45,
    maxHealth: 45,
    speed: 50,
  },
};
