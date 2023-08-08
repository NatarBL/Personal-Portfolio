let encounters = ["Torchic", "Mudkip", "Treecko"];
// Create pokemon objects

/**
 * isEnemy:
 *  0 - Not a pokemon
 *  1 - is an enemy
 *  2 - not an enemy
 */
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
    frontImage: {
      src: "./poke/Images/torchic-front.png",
    },
    backImage: {
      src: "./poke/Images/torchic-back.png",
    },
    isEnemy: 1,
    name: "Torchic",
    attacks: [
      attacks.Fireball,
      attacks.TailWhip,
      attacks.Tackle,
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
    frontImage: {
      src: "./poke/Images/mudkip-front.png",
    },
    backImage: {
      src: "./poke/Images/mudkip-back.png",
    },
    isEnemy: 1,
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
    frontImage: {
      src: "./poke/Images/treecko-front.png",
    },
    backImage: {
      src: "./poke/Images/treecko-back.png",
    },
    isEnemy: 1,
    name: "Treecko",
    attacks: [attacks.RazorLeaf, attacks.Growl],
    animate: false,
    level: 7,
    phyAttack: 60,
    phyDefense: 40,
    type: "Grass",
    health: 45,
    maxHealth: 45,
    speed: 50,
  },
  TorchicBack: {
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
    isEnemy: 1,
    name: "Torchic",
    attacks: [
      attacks.Fireball,
      attacks.TailWhip,
      attacks.Tackle,
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
  MudkipBack: {
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
    isEnemy: 1,
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
  TreeckoBack: {
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
    isEnemy: 1,
    name: "Treecko",
    attacks: [attacks.RazorLeaf, attacks.Growl],
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
