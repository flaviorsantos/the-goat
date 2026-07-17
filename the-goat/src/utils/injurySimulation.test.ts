import { afterEach, describe, expect, it, vi } from 'vitest';
import type { PlayerAttributes } from '../types';
import { simulateInjury } from './injurySimulation';

const attributes = (value: number): PlayerAttributes => ({
  Shooting: value, Dribbling: value, Defense: value, IQ: value,
  Athleticism: value, Passing: value, Rebounding: value,
  Speed: value, Finishing: value,
});

describe('injuries', () => {
  afterEach(() => vi.restoreAllMocks());

  it('reduces injury risk with durable physical attributes', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1);
    expect(simulateInjury(attributes(90), 25)).toBeNull();
    expect(simulateInjury(attributes(60), 25)).not.toBeNull();
  });

  it('supports career-ending injuries', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(simulateInjury(attributes(50), 40)?.careerEnding).toBe(true);
  });
});
