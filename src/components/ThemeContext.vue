<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { provideTheme, Theme } from '../composables/theme';

export default defineComponent({
  name: 'ThemeContext',
  props: {
    theme: {
      type: String as PropType<Theme>,
      default: 'white',
    },
  },
  setup(props) {
    provideTheme(ref(props.theme));
  },
});
</script>

<template>
  <slot />
</template>
