import { describe, expect, it } from 'vitest';
import { calculateOverall } from '../utils/statsCalculator';
import { nbaPlayers } from './players';

const attributeKeys = [
  'Shooting', 'Dribbling', 'Defense', 'IQ', 'Athleticism',
  'Passing', 'Rebounding', 'Speed', 'Finishing',
] as const;

describe('player ratings database', () => {
  it('contains unique, bounded and complete profiles', () => {
    expect(new Set(nbaPlayers.map(player => player.id)).size).toBe(nbaPlayers.length);
    expect(new Set(nbaPlayers.map(player => player.name)).size).toBe(nbaPlayers.length);
    nbaPlayers.forEach(player => {
      attributeKeys.forEach(attribute => {
        expect(player.attributes[attribute]).toBeGreaterThanOrEqual(30);
        expect(player.attributes[attribute]).toBeLessThanOrEqual(99);
      });
    });
  });

  it('keeps the overall distribution selective', () => {
    const overalls = nbaPlayers
      .map(player => calculateOverall(player.attributes, player.position))
      .sort((left, right) => left - right);
    const median = overalls[Math.floor(overalls.length / 2)];
    expect(median).toBeGreaterThanOrEqual(74);
    expect(median).toBeLessThanOrEqual(80);
    expect(overalls.filter(overall => overall >= 90).length / overalls.length)
      .toBeLessThan(0.06);
  });

  it('includes audited modern archetypes', () => {
    const wembanyama = nbaPlayers.find(player => player.name === 'Victor Wembanyama');
    const thompson = nbaPlayers.find(player => player.name === 'Amen Thompson');
    const flagg = nbaPlayers.find(player => player.name === 'Cooper Flagg');
    expect(wembanyama?.attributes.Defense).toBe(99);
    expect(thompson?.attributes.Athleticism).toBe(99);
    expect(flagg?.attributes.Passing).toBeGreaterThanOrEqual(80);
  });
});
