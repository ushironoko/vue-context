<script lang="ts">
import {
  ref,
  computed,
  reactive,
  watchEffect,
  watch,
  shallowReadonly,
  readonly,
} from 'vue';
import ThemeContext from './components/ThemeContext.vue';
import BaseButton from './components/BaseButton.vue';
import SampleSlot from './components/SampleSlots.vue';

export default {
  name: 'App',
  components: {
    ThemeContext,
    BaseButton,
    SampleSlot,
  },
  setup() {
    const obj = reactive({
      hoge: 0,
      piyo: 'uuu',
    });

    function a() {
      obj.hoge++;
    }

    const curry = (o = 2) => () => {
      const r = obj.hoge * o;
      return {
        j: r,
      };
    };
    const p = computed(curry);

    const text = ref('hoge');
    const mutable = computed({
      get: () => {
        return text.value;
      },
      set: (newValue) => {
        text.value = newValue;
      },
    });

    const stopHandler = watchEffect(() => console.log(obj.hoge));

    const o = {
      ho: 0,
      hi: {
        yo: 'cheke',
      },
    };

    const o2 = shallowReadonly(o);
    watchEffect(() => console.log(o2));
    function o2Mutation() {
      o2.hi.yo = 'hogeee';
    }

    const o3 = {
      ho: 0,
      hi: {
        yo: 'cheke',
      },
    };
    const o3r = readonly(o3);
    o3.ho = 100;
    console.log(o3.ho);
    console.log(o3r.ho);

    // reactive array
    const array = reactive([{ id: 1 }]);
    function pushedState() {
      array[0].id = array[0].id * 10;
    }

    const watchState = ref<string | number>('0');
    watch(watchState, (next, prev) => {
      if (typeof prev === 'string' && typeof next === 'number') {
        console.log('move string => number');
      }
    });

    function moveState() {
      watchState.value = 0;
    }

    return {
      p,
      a,
      stopHandler,
      o2Mutation,
      array,
      pushedState,
      moveState,
    };
  },
};
</script>

<template>
  <ThemeContext theme="dark">
    <div>
      {{ array }}
      <BaseButton :handle-fn="pushedState">push</BaseButton>
    </div>
    <div>
      <BaseButton :handle-fn="moveState">move</BaseButton>
    </div>
    {{ p }}
    <BaseButton :handle-fn="a">add</BaseButton>
    <BaseButton :handle-fn="stopHandler">stop</BaseButton>
    <BaseButton :handle-fn="o2Mutation">o2Mutation</BaseButton>
    <SampleSlot>
      <template #foo>slot1</template>
      <template #bar>slot2</template>
    </SampleSlot>
  </ThemeContext>
</template>
