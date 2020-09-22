<script lang="ts">
import { defineComponent } from 'vue';
import { useTheme } from '../composables/theme';

export default defineComponent({
  name: 'BaseButton',
  setup() {
    function handleAlert(text: string) {
      alert(text);
    }
    return {
      ...useTheme(),
      handleAlert,
    };
  },
});
</script>

<template>
  <button :class="theme" @click="handleAlert(theme)">button</button>
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
