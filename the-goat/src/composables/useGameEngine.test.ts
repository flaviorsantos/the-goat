import { afterEach, describe, expect, it, vi } from 'vitest';
import type { PlayerAttributes } from '../types';
import { useGameEngine } from './useGameEngine';

const attributes: PlayerAttributes = {
  Shooting: 80, Dribbling: 80, Defense: 80, IQ: 80,
  Athleticism: 80, Passing: 80, Rebounding: 80,
  Speed: 80, Finishing: 80,
};

const engineAtMorale = (morale: number) => {
  const engine = useGameEngine({ persistRetiredCareers: false });
  engine.initCareer('Test', 'SF', 'US', 23, 'pro');
  engine.player.value.teamId = 'LAL';
  engine.player.value.age = 25;
  engine.player.value.ovr = 80;
  engine.player.value.attributes = { ...attributes };
  engine.player.value.potentialAttributes = { ...attributes };
  engine.player.value.morale = morale;
  engine.player.value.careerTimeline = [
    { teamId: 'LAL', startYear: 1, endYear: null },
  ];
  return engine;
};

describe('team morale and trades', () => {
  afterEach(() => vi.restoreAllMocks());

  it('improves team performance with high morale', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const low = engineAtMorale(10);
    const high = engineAtMorale(90);
    low.simulateSeason();
    high.simulateSeason();
    expect(high.history.value[0].teamWins).toBeGreaterThan(
      low.history.value[0].teamWins,
    );
  });

  it('allows a preferred destination when morale is high', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const engine = engineAtMorale(80);
    expect(engine.requestTrade('BOS')).toBe(true);
    expect(engine.player.value.teamId).toBe('BOS');
  });

  it('locks game mode until the current series ends', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const engine = engineAtMorale(90);
    engine.player.value.ovr = 99;
    engine.simulateSeason();

    expect(engine.playoffPresentation.value.active).toBe(true);
    engine.simulateNextPlayoffGame();
    expect(engine.simulateNextPlayoffSeries()).toBe(false);

    while (
      engine.playoffPresentation.value.active &&
      engine.playoffPresentation.value.seriesIndex === 0
    ) {
      engine.simulateNextPlayoffGame();
    }
    expect(engine.playoffPresentation.value.mode).toBeNull();
  });

  it('suppresses milestones during full-career simulation', () => {
    let seed = 73;
    vi.spyOn(Math, 'random').mockImplementation(() => {
      seed = (Math.imul(seed, 1_664_525) + 1_013_904_223) >>> 0;
      return seed / 4_294_967_296;
    });
    const engine = engineAtMorale(80);
    engine.player.value.age = 19;
    engine.player.value.ovr = 99;
    engine.player.value.attributes = {
      ...engine.player.value.attributes,
      Shooting: 99,
      Finishing: 99,
    };
    engine.player.value.potentialAttributes = {
      ...engine.player.value.attributes,
    };
    engine.simulateRemainingCareer();

    expect(engine.pendingMilestones.value).toHaveLength(0);
    expect(engine.playoffPresentation.value.active).toBe(false);
  });
});
