import { describe, expect, it } from 'vitest';
import {
  calculateAutomaticTradeChance,
  calculateTradeRequestApproval,
} from './tradeCalculator';

describe('trade decisions', () => {
  it('makes low morale eligible for automatic trades', () => {
    expect(calculateAutomaticTradeChance({
      morale: 15, playerOvr: 80, ppg: 18, teamWins: 35, contractYears: 1,
    })).toBeGreaterThan(0);
  });

  it('lets strong performance, winning and contract control increase retention', () => {
    const base = { morale: 35, playerOvr: 80, ppg: 18, teamWins: 35, contractYears: 1 };
    const retained = { morale: 35, playerOvr: 94, ppg: 30, teamWins: 58, contractYears: 4 };
    expect(calculateTradeRequestApproval(retained)).toBeLessThan(
      calculateTradeRequestApproval(base),
    );
  });
});
