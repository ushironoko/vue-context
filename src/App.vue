<script lang="ts">
import ThemeContext from './components/ThemeContext.vue';
import BaseButton from './components/BaseButton.vue';

export default {
  name: 'App',
  components: {
    ThemeContext,
    BaseButton,
  },
};
</script>

<template>
  <ThemeContext theme="light">
    <BaseButton />
  </ThemeContext>
</template>
