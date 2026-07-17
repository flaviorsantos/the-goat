import type { PlayerAttributes, Position } from '../types';

type AttributeInput = PlayerAttributes | Record<string, number>;

type PositionModifiers = {
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
};

const POSITION_MODIFIERS: Record<Position, PositionModifiers> = {
  PG: { points: 0.98, assists: 1.35, rebounds: 0.62, steals: 1.05, blocks: 0.35 },
  SG: { points: 1.08, assists: 0.88, rebounds: 0.72, steals: 1.00, blocks: 0.45 },
  SF: { points: 1.04, assists: 0.82, rebounds: 0.88, steals: 0.95, blocks: 0.75 },
  PF: { points: 0.98, assists: 0.70, rebounds: 1.15, steals: 0.82, blocks: 1.30 },
  C: { points: 0.94, assists: 0.64, rebounds: 1.35, steals: 0.75, blocks: 1.65 },
};

const OVR_WEIGHTS: Record<Position, PlayerAttributes> = {
  PG: {
    Shooting: 0.15, Dribbling: 0.20, Defense: 0.10, IQ: 0.15,
    Athleticism: 0.10, Passing: 0.20, Rebounding: 0.02, Speed: 0.03,
    Finishing: 0.05,
  },
  SG: {
    Shooting: 0.22, Dribbling: 0.14, Defense: 0.12, IQ: 0.09,
    Athleticism: 0.12, Passing: 0.07, Rebounding: 0.05, Speed: 0.07,
    Finishing: 0.12,
  },
  SF: {
    Shooting: 0.16, Dribbling: 0.10, Defense: 0.15, IQ: 0.10,
    Athleticism: 0.14, Passing: 0.08, Rebounding: 0.08, Speed: 0.05,
    Finishing: 0.14,
  },
  PF: {
    Shooting: 0.07, Dribbling: 0.05, Defense: 0.20, IQ: 0.10,
    Athleticism: 0.15, Passing: 0.05, Rebounding: 0.23, Speed: 0.04,
    Finishing: 0.11,
  },
  C: {
    Shooting: 0.04, Dribbling: 0.03, Defense: 0.22, IQ: 0.10,
    Athleticism: 0.14, Passing: 0.04, Rebounding: 0.27, Speed: 0.03,
    Finishing: 0.13,
  },
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

const randomVariation = (amplitude: number) =>
  (Math.random() + Math.random() - 1) * amplitude;

const getAttribute = (attrs: AttributeInput, key: keyof PlayerAttributes) =>
  clamp(attrs[key] ?? 30, 30, 99);

export const calculateOverall = (
  attrs: AttributeInput,
  position: Position,
) => {
  const weights = OVR_WEIGHTS[position];
  const overall = Object.entries(weights).reduce(
    (sum, [key, weight]) =>
      sum + getAttribute(attrs, key as keyof PlayerAttributes) * weight,
    0,
  );

  return Math.round(clamp(overall, 30, 99));
};

export const calculateSeasonStats = (
  attrs: AttributeInput,
  position: Position,
  ovr: number,
  teamOvr: number,
  age: number,
) => {
  const shooting = getAttribute(attrs, 'Shooting');
  const dribbling = getAttribute(attrs, 'Dribbling');
  const defense = getAttribute(attrs, 'Defense');
  const iq = getAttribute(attrs, 'IQ');
  const athleticism = getAttribute(attrs, 'Athleticism');
  const passing = getAttribute(attrs, 'Passing');
  const rebounding = getAttribute(attrs, 'Rebounding');
  const speed = getAttribute(attrs, 'Speed');
  const finishing = getAttribute(attrs, 'Finishing');
  const modifiers = POSITION_MODIFIERS[position];

  const ageMinutesPenalty = age >= 37 ? (age - 36) * 0.8 : 0;
  const mpg = clamp(
    12 +
      (ovr - 60) * 0.78 +
      (iq - 70) * 0.045 -
      ageMinutesPenalty +
      randomVariation(1.4),
    10,
    37.5,
  );
  const minuteScale = mpg / 36;

  const offensiveSkill =
    shooting * 0.30 +
    finishing * 0.25 +
    dribbling * 0.18 +
    athleticism * 0.12 +
    speed * 0.08 +
    iq * 0.07;

  const pointsPer36 =
    (5 + (offensiveSkill - 50) * 0.42 + (ovr - 70) * 0.15) *
    modifiers.points;
  const assistsPer36 =
    (1 +
      (passing - 50) * 0.115 +
      (iq - 50) * 0.05 +
      (dribbling - 50) * 0.025 +
      (speed - 50) * 0.01) *
    modifiers.assists;
  const reboundsPer36 =
    (1.5 +
      (rebounding - 50) * 0.15 +
      (athleticism - 50) * 0.05 +
      (iq - 50) * 0.01) *
    modifiers.rebounds;
  const stealsPer36 =
    (0.35 +
      (defense - 50) * 0.022 +
      (speed - 50) * 0.014 +
      (iq - 50) * 0.012) *
    modifiers.steals;
  const blocksPer36 =
    (0.15 +
      (defense - 50) * 0.017 +
      (athleticism - 50) * 0.014 +
      (iq - 50) * 0.004) *
    modifiers.blocks;

  const ppg = clamp(pointsPer36 * minuteScale + randomVariation(2.2), 2, 38);
  const apg = clamp(assistsPer36 * minuteScale + randomVariation(0.7), 0.5, 12.5);
  const rpg = clamp(reboundsPer36 * minuteScale + randomVariation(0.8), 0.8, 15.5);
  const spg = clamp(stealsPer36 * minuteScale + randomVariation(0.18), 0.1, 3);
  const bpg = clamp(blocksPer36 * minuteScale + randomVariation(0.2), 0.1, 4);
  const tov = clamp(
    0.65 +
      ppg * 0.06 +
      apg * 0.13 -
      (iq - 50) * 0.01 -
      (dribbling - 50) * 0.006 +
      randomVariation(0.35),
    0.5,
    5,
  );

  const sizeEfficiencyBonus = position === 'C'
    ? 0.025
    : position === 'PF'
      ? 0.012
      : 0;
  const fgPct = clamp(
    0.36 +
      shooting * 0.0007 +
      finishing * 0.0011 +
      iq * 0.0002 +
      athleticism * 0.00015 +
      sizeEfficiencyBonus +
      randomVariation(0.012),
    0.36,
    0.65,
  );
  const fg3Pct = clamp(
    0.255 + shooting * 0.00155 + randomVariation(0.012),
    0.22,
    0.46,
  );
  const ftPct = clamp(
    0.61 + shooting * 0.0028 + iq * 0.00025 + randomVariation(0.012),
    0.52,
    0.94,
  );
  const teamImpact = (teamOvr - 78) * 0.3;
  const offensiveImpact =
    (ppg - 12) * 0.13 +
    (apg - 3) * 0.18 +
    (fgPct - 0.46) * 14 +
    (fg3Pct - 0.35) * 3 -
    (tov - 1.8) * 0.28;
  const defensiveImpact =
    (spg - 0.8) * 0.7 +
    (bpg - 0.6) * 0.55 +
    (defense - 70) * 0.035 +
    (iq - 70) * 0.015;
  const reboundingImpact = (rpg - 5) * 0.06;
  const roleScale = clamp(mpg / 30, 0.45, 1.15);
  const plusMinus = clamp(
    teamImpact +
      (offensiveImpact + defensiveImpact + reboundingImpact) * roleScale +
      randomVariation(0.85),
    -10,
    12,
  );

  return {
    mpg: Number(mpg.toFixed(1)),
    ppg: Number(ppg.toFixed(1)),
    rpg: Number(rpg.toFixed(1)),
    apg: Number(apg.toFixed(1)),
    spg: Number(spg.toFixed(1)),
    bpg: Number(bpg.toFixed(1)),
    tov: Number(tov.toFixed(1)),
    fgPct: Number(fgPct.toFixed(3)),
    fg3Pct: Number(fg3Pct.toFixed(3)),
    ftPct: Number(ftPct.toFixed(3)),
    plusMinus: Number(plusMinus.toFixed(1)),
  };
};
