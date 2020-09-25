<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { provideHeavyState, HeavyState } from '../composables/heavy';

export default defineComponent({
  name: 'ThemeContext',
  props: {
    state: {
      type: Object as PropType<HeavyState>,
      required: true,
    },
  },
  setup(props) {
    provideHeavyState(reactive(props.state));
  },
});
</script>

<template>
  <slot />
</template>
