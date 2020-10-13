<script lang="ts">
import { ref } from 'vue';
import ThemeContext from './components/ThemeContext.vue';
import ApiProvider from './components/ApiProvider.vue';
import BaseButton from './components/BaseButton.vue';
import RenderContainer from './components/RenderContainer.vue';
import largeJSON from './utils/largeJSON';

export default {
  name: 'App',
  components: {
    ApiProvider,
    ThemeContext,
    BaseButton,
    RenderContainer,
  },
  setup() {
    const live = ref(true);
    function destroyInstance() {
      live.value = false;
    }
    const json = largeJSON();
    return {
      json,
      live,
      destroyInstance,
    };
  },
};
</script>

<template>
  <ThemeContext theme="light">
    <BaseButton :handle-fn="destroyInstance" />
  </ThemeContext>
  <ApiProvider v-for="i of 20000" :key="i" :state="json">
    <RenderContainer :index="i" />
  </ApiProvider>
</template>
