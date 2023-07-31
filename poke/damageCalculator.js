function calculator(lvl, power, uType, oType, uAtk, oDef, atkType) {
  let stab = uType === atkType ? 1.5 : 1.0;
  let superEffective = effectiveScale(atkType, oType);
  let randomScale = Math.random() * (1.0 - 0.85) + 0.85;
  let criticalScale = Math.random() * 100 < 16 ? 2.0 : 1.0;
  let damageCalc =
    ((((2 * lvl) / 5 + 2) * power * (uAtk / oDef)) / 50 + 2) *
    criticalScale *
    stab *
    randomScale *
    superEffective;

  return damageCalc;
}
function effectiveScale(atkType, oType) {
  switch (atkType) {
    case "Fire":
      switch (oType) {
        case "Fire":
          return 0.5;
        case "Water":
          return 0.5;
        case "Grass":
          return 2.0;
      }
      break;
    case "Water":
      switch (oType) {
        case "Fire":
          return 2.0;
        case "Water":
          return 0.5;
        case "Grass":
          return 0.5;
      }
      break;
    case "Grass":
      switch (oType) {
        case "Fire":
          return 0.5;
        case "Water":
          return 2.0;
        case "Grass":
          return 0.5;
      }
      break;
    default:
      return 1.0;
  }
}
