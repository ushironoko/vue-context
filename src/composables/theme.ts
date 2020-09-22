import { InjectionKey, inject, Ref, provide, readonly } from 'vue';

type Theme = Ref<string>;

export const ThemeSymbol: InjectionKey<Theme> = Symbol();

export function provideTheme(theme: Theme) {
  provide(ThemeSymbol, theme);
}

export function useTheme() {
  const t = inject(ThemeSymbol);
  if (!t) {
    throw new Error('useTheme() is called without provider.');
  }

  const theme = readonly(t);
  const setTheme = (theme: string) => (t.value = theme);
  return { theme, setTheme };
}
