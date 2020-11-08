import { InjectionKey, inject, Ref, provide, readonly } from 'vue';

export type Theme = 'black' | 'white';
export type ThemeRef = Ref<Theme>;

export const ThemeSymbol: InjectionKey<ThemeRef> = Symbol();

export function provideTheme(theme: ThemeRef) {
  provide(ThemeSymbol, theme);
}

export function useTheme() {
  const t = inject(ThemeSymbol);
  if (!t) {
    throw new Error('useTheme() is called without provider.');
  }

  const theme = readonly(t);
  const setTheme = (theme: Theme) => (t.value = theme);
  return { theme, setTheme };
}
