import type { InjuryEvent, PlayerAttributes } from '../types';

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

export const simulateInjury = (
  attributes: PlayerAttributes | Record<string, number>,
  age: number,
): InjuryEvent | null => {
  const athleticism = attributes.Athleticism ?? 30;
  const speed = attributes.Speed ?? 30;
  const iq = attributes.IQ ?? 30;
  const durability = athleticism * 0.55 + speed * 0.25 + iq * 0.2;
  const injuryChance = clamp(
    0.105 + Math.max(0, age - 29) * 0.004 - (durability - 70) * 0.0018,
    0.035,
    0.22,
  );

  if (Math.random() >= injuryChance) return null;

  const careerEndingChance = clamp(
    0.006 + Math.max(0, age - 33) * 0.003 + Math.max(0, 65 - athleticism) * 0.0008,
    0.004,
    0.06,
  );
  if (Math.random() < careerEndingChance) {
    return {
      name: 'Catastrophic knee injury',
      severity: 'career-ending',
      gamesMissed: 82,
      careerEnding: true,
    };
  }

  const roll = Math.random();
  if (roll < 0.58) {
    return {
      name: ['Ankle sprain', 'Back tightness', 'Hamstring strain'][Math.floor(Math.random() * 3)],
      severity: 'minor',
      gamesMissed: 3 + Math.floor(Math.random() * 10),
      careerEnding: false,
    };
  }
  if (roll < 0.9) {
    return {
      name: ['Knee sprain', 'Shoulder injury', 'Calf strain'][Math.floor(Math.random() * 3)],
      severity: 'moderate',
      gamesMissed: 13 + Math.floor(Math.random() * 18),
      careerEnding: false,
    };
  }
  return {
    name: ['ACL tear', 'Achilles tear', 'Foot fracture'][Math.floor(Math.random() * 3)],
    severity: 'severe',
    gamesMissed: 31 + Math.floor(Math.random() * 25),
    careerEnding: false,
  };
};
