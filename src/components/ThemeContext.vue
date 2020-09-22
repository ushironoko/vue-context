<script lang="ts">
import { defineComponent, ref } from 'vue';
import { provideTheme } from '../composables/theme';

export default defineComponent({
  name: 'ThemeContext',
  setup() {
    provideTheme(ref('dark'));
  },
});
</script>

<template>
  <slot />
</template>
