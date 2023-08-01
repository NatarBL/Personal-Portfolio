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
    attacks: [
      attacks.Tackle,
      attacks.Fireball,
      attacks.TailWhip,
      attacks.Growl,
    ],
    animate: false,
    level: 5,
    phyAttack: 60,
    phyDefense: 40,
    type: "Fire",
    health: 45,
    maxHealth: 45,
    speed: 45,
  },
  MudkipFront: {
    position: {
      x: 312,
      y: -32,
    },
    frames: {
      max: 1,
      hold: 1,
    },
    image: {
      src: "./poke/Images/mudkip-front.png",
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
  TreeckoFront: {
    position: {
      x: 312,
      y: -32,
    },
    frames: {
      max: 1,
      hold: 1,
    },
    image: {
      src: "./poke/Images/treecko-front.png",
    },
    isEnemy: true,
    name: "Treecko",
    attacks: [attacks.RazorLeaf, attacks.TailWhip],
    animate: false,
    level: 5,
    phyAttack: 60,
    phyDefense: 40,
    type: "Grass",
    health: 45,
    maxHealth: 45,
    speed: 50,
  },
};
