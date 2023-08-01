/**
 * Status Descriptions:
 *  - 2DD: Drop defense by x0.5
 *  - 2RD: Raise defense by x2.0.
 *  - 1DA: Drop attack by x1.5.
 *  - 1RA: Raise attack by x0.67.
 *  - 1RS: Raise speed by x1.5.
 *  - 0: Do nothing
 *
 *    Increases: x1.50, x2.00, x2.50, x3.00, x3.05, x4.00
 *    Decreases: x0.67, x0.50, x0.40, x0.33, x2.85, x0.25
 */
const attacks = {
  Tackle: {
    name: "Tackle",
    damage: 40,
    type: "Normal",
    status: "0",
    Accuracy: 100,
  },
  Fireball: {
    name: "Fireball",
    damage: 40,
    type: "Fire",
    status: "0",
    Accuracy: 100,
  },
  Growl: {
    name: "Growl",
    damage: 0,
    type: "Normal",
    status: "1DA",
    Accuracy: 100,
  },
  TailWhip: {
    name: "Tail Whip",
    damage: 0,
    type: "Normal",
    status: "1DD",
    Accuracy: 100,
  },
  RazorLeaf: {
    name: "Razor Leaf",
    damage: 40,
    type: "Grass",
    status: "0",
    Accuracy: 100,
  },
  WaterGun: {
    name: "Water Gun",
    damage: 40,
    type: "Water",
    status: "0",
    Accuracy: 100,
  },
};
