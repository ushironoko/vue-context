import { InjectionKey, inject, provide, readonly } from 'vue';

export type HeavyState = Record<string, unknown>;

export const HeavySymbol: InjectionKey<HeavyState> = Symbol();

export function provideHeavyState(state: HeavyState) {
  provide(HeavySymbol, state);
}

export function useHeavyState() {
  const s = inject(HeavySymbol);
  if (!s) {
    throw new Error('useHeavyState() is called without provider.');
  }

  const state = readonly(s);
  const setState = (state: HeavyState) => (s.value = state);
  return [state, setState];
}
