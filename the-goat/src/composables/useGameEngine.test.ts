import { afterEach, describe, expect, it, vi } from 'vitest';
import type { PlayerAttributes, SeasonStats } from '../types';
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

  it('makes renewal nearly certain with high morale and team success', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const engine = engineAtMorale(90);
    engine.history.value.push({ teamWins: 55 } as SeasonStats);
    engine.generateOffers();

    expect(engine.freeAgencyOffers.value[0]?.teamId).toBe('LAL');
  });

  it('does not guarantee renewal with low morale and a losing record', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const engine = engineAtMorale(10);
    engine.history.value.push({ teamWins: 25 } as SeasonStats);
    engine.generateOffers();

    expect(engine.freeAgencyOffers.value.some(
      offer => offer.teamId === 'LAL',
    )).toBe(false);
  });

  it('allows a preferred destination when morale is high', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const engine = engineAtMorale(80);
    expect(engine.requestTrade('BOS')).toBe(true);
    expect(engine.player.value.teamId).toBe('BOS');
    expect(engine.pendingMilestones.value.at(-1)?.title).toBe('Traded to BOS');
  });

  it('rejects a request when retention factors are strong', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const engine = engineAtMorale(80);
    engine.player.value.ovr = 94;
    engine.player.value.contractYearsLeft = 4;
    engine.history.value.push({ ppg: 30, teamWins: 58 } as SeasonStats);
    expect(engine.requestTrade('BOS')).toBe(false);
    expect(engine.pendingMilestones.value.at(-1)?.title)
      .toBe('Trade Request Denied');
  });

  it('automatically trades a player when morale collapses', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.2);
    const engine = engineAtMorale(0);
    const originalTeam = engine.player.value.teamId;
    engine.simulateSeason();
    expect(engine.player.value.teamId).not.toBe(originalTeam);
    expect(engine.pendingMilestones.value.some(
      milestone => milestone.title.startsWith('Traded to'),
    )).toBe(true);
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

  it('announces a championship only after the playoff presentation', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const engine = engineAtMorale(90);
    engine.player.value.ovr = 99;
    engine.player.value.attributes = Object.fromEntries(
      Object.keys(attributes).map(attribute => [attribute, 99]),
    );
    engine.simulateSeason();

    expect(engine.history.value[0].playoffs?.wonRing).toBe(true);
    expect(engine.history.value[0].awards).toContain('Finals MVP');
    expect(engine.pendingMilestones.value.some(
      milestone => milestone.title === 'NBA Champion',
    )).toBe(false);
    expect(engine.pendingMilestones.value.some(
      milestone => milestone.title === 'Finals MVP',
    )).toBe(false);

    while (!engine.playoffPresentation.value.complete) {
      engine.simulateNextPlayoffSeries();
    }
    engine.finishPlayoffPresentation();

    expect(engine.pendingMilestones.value.some(
      milestone => milestone.title === 'NBA Champion',
    )).toBe(true);
    expect(engine.pendingMilestones.value.some(
      milestone => milestone.title === 'Finals MVP',
    )).toBe(true);
  });

  it('announces DPOY and Sixth Man awards', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const defender = engineAtMorale(90);
    defender.player.value.ovr = 99;
    defender.player.value.attributes = Object.fromEntries(
      Object.keys(attributes).map(attribute => [attribute, 99]),
    );
    defender.simulateSeason();

    expect(defender.history.value[0].awards).toContain('DPOY');
    expect(defender.pendingMilestones.value.some(
      milestone => milestone.title === 'Defensive Player of the Year',
    )).toBe(false);
    while (!defender.playoffPresentation.value.complete) {
      defender.simulateNextPlayoffSeries();
    }
    defender.finishPlayoffPresentation();
    expect(defender.pendingMilestones.value.some(
      milestone => milestone.title === 'Defensive Player of the Year',
    )).toBe(true);

    defender.pendingMilestones.value = [];
    defender.simulateSeason();
    while (!defender.playoffPresentation.value.complete) {
      defender.simulateNextPlayoffSeries();
    }
    defender.finishPlayoffPresentation();
    expect(defender.pendingMilestones.value.some(
      milestone => milestone.title === 'Defensive Player of the Year',
    )).toBe(true);

    const sixthMan = engineAtMorale(90);
    sixthMan.player.value.ovr = 80;
    sixthMan.player.value.attributes = Object.fromEntries(
      Object.keys(attributes).map(attribute => [attribute, 99]),
    );
    sixthMan.simulateSeason();

    expect(sixthMan.history.value[0].awards).toContain('SMOTY');
    expect(sixthMan.pendingMilestones.value.some(
      milestone => milestone.title === 'Sixth Man of the Year',
    )).toBe(false);
    while (!sixthMan.playoffPresentation.value.complete) {
      sixthMan.simulateNextPlayoffSeries();
    }
    sixthMan.finishPlayoffPresentation();
    expect(sixthMan.pendingMilestones.value.some(
      milestone => milestone.title === 'Sixth Man of the Year',
    )).toBe(true);
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
