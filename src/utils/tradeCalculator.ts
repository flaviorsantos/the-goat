type TradeContext = {
  morale: number;
  playerOvr: number;
  ppg: number;
  teamWins: number;
  contractYears: number;
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

const retentionStrength = ({
  playerOvr,
  ppg,
  teamWins,
  contractYears,
}: TradeContext) => clamp(
  Math.max(0, playerOvr - 82) * 0.025 +
  Math.max(0, ppg - 22) * 0.012 +
  Math.max(0, teamWins - 45) * 0.012 +
  Math.max(0, contractYears - 1) * 0.07,
  0,
  0.68,
);

export const calculateTradeRequestApproval = (context: TradeContext) =>
  clamp(
    0.62 + (55 - context.morale) * 0.007 - retentionStrength(context),
    0.1,
    0.9,
  );

export const calculateAutomaticTradeChance = (context: TradeContext) => {
  if (context.morale >= 30) return 0;
  return clamp(
    0.1 + (30 - context.morale) * 0.018 - retentionStrength(context) * 0.45,
    0.03,
    0.48,
  );
};
