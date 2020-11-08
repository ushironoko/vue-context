<script lang="ts">
import { defineComponent } from 'vue';
import { useTheme } from '../composables/theme';

export default defineComponent({
  name: 'BaseButton',
  props: {
    handleFn: {
      type: Function as () => void,
      required: true,
    },
    bar: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    return {
      ...useTheme(),
    };
  },
});
</script>

<template>
  <button :class="theme" @click="handleFn">button</button>
</template>

<style scoped>
.dark {
  background: #000;
  color: #fff;
}
.light {
  color: #000;
}
</style>
