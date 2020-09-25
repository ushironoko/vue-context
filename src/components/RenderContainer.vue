<script lang="ts">
import { defineComponent } from 'vue';
import { useHeavyState } from '../composables/heavy';

export default defineComponent({
  name: 'RenderContainer',
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const [state, setState] = useHeavyState();
    return {
      state,
      setState,
    };
  },
});
</script>

<template>
  {{ state[index] }}
</template>

<style scoped>
button {
  width: 120px;
  height: 60px;
}
.dark {
  background: #000;
  color: #fff;
}
.light {
  color: #000;
}
</style>
