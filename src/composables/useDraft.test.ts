import { afterEach, describe, expect, it, vi } from 'vitest';
import type { PlayerAttributes } from '../types';
import { useDraft } from './useDraft';

const attributeKeys: Array<keyof PlayerAttributes> = [
  'Shooting', 'Dribbling', 'Defense', 'IQ', 'Athleticism',
  'Passing', 'Rebounding', 'Speed', 'Finishing',
];

describe('draft engine', () => {
  afterEach(() => vi.restoreAllMocks());

  it('records every selection and completes without an extra draw', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const draft = useDraft();
    draft.drawRandomPlayer();

    attributeKeys.forEach(key => draft.selectAttribute(key));

    expect(draft.isDraftComplete.value).toBe(true);
    expect(Object.keys(draft.attributeSources.value)).toHaveLength(9);
    expect(draft.selectAttribute('Shooting')).toBe(false);
  });

  it('allows one reroll and always changes the drawn player', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const draft = useDraft();
    const first = draft.drawRandomPlayer()?.id;

    expect(draft.useReroll()).toBe(true);
    expect(draft.currentDrawnPlayer.value?.id).not.toBe(first);
    expect(draft.useReroll()).toBe(false);
  });

  it('keeps rookie attributes 8 to 18 points below their peak', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const draft = useDraft();
    const peak = Object.fromEntries(
      attributeKeys.map(key => [key, 90]),
    ) as unknown as PlayerAttributes;
    const rookie = draft.generateRookieAttributes(peak);

    attributeKeys.forEach(key => {
      expect(peak[key] - rookie[key]).toBeGreaterThanOrEqual(8);
      expect(peak[key] - rookie[key]).toBeLessThanOrEqual(18);
    });
  });
});
