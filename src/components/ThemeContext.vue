<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  onRenderTracked,
  onRenderTriggered,
} from 'vue';
import { provideTheme, Theme } from '../composables/theme';

export default defineComponent({
  name: 'ThemeContext',
  props: {
    theme: {
      type: String as PropType<Theme>,
      default: 'light',
    },
  },
  setup(props) {
    provideTheme(ref(props.theme));
    onRenderTracked((e) => {
      console.log('tracker', e);
    });

    onRenderTriggered((e) => {
      console.log('trigger', e);
    });
  },
});
</script>

<template>
  <slot />
</template>
