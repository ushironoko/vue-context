<script lang="ts">
import {
  ref,
  computed,
  reactive,
  watchEffect,
  watch,
  shallowReadonly,
  readonly,
  onMounted,
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
    // nomal reactive object
    const obj = reactive({
      hoge: 0,
    });

    // mutate reactive object
    function plusOneObj() {
      obj.hoge++;
    }

    // mutate nested reactive object
    const curry = (o = 2) => () => {
      const r = obj.hoge * o;
      return {
        j: r,
      };
    };

    // curry computed ref
    const curryComputed = computed(curry);

    // nomal text ref
    const textRef = ref('hoge');
    // mutable computed
    const mutable = computed({
      get: () => {
        return textRef.value;
      },
      set: (newValue) => {
        textRef.value = newValue;
      },
    });

    function mutateComputedFn() {
      mutable.value += 'e';
    }

    // stoppable watchEffect
    const stopHandler = watchEffect(() => (textRef.value += mutable.value));

    // nested object
    const nestedObj = {
      ho: 0,
      hi: {
        yo: 'cheke',
      },
    };
    // shallow readonly
    const shallowReadOnlyObj = shallowReadonly(nestedObj);
    // mutate shallowReadonly object
    function MutateShallowReadOnlyObj() {
      shallowReadOnlyObj.hi.yo = 'hogeee';
    }

    // nested object
    const o3 = {
      ho: 0,
      hi: {
        yo: 'cheke',
      },
    };
    // nomal readonly
    const o3r = readonly(o3);
    o3.ho = 100;
    // readonly object side effect
    console.log('nested obj', o3.ho);
    console.log('mutable obj', o3r.ho);

    // reactive array
    const array = reactive([{ id: 1 }]);
    function pushedState() {
      array[0].id = array[0].id * 10;
    }

    // nomal watch
    const watchState = ref<string | number>('0');
    watch(watchState, (next, prev) => {
      if (typeof prev === 'string' && typeof next === 'number') {
        console.log('move string => number');
      }
    });
    // mutate watch state
    function moveState() {
      watchState.value = 0;
    }

    const message = ref('mounted');

    // ライフサイクルメソッドにコールバックを渡して実行する
    onMounted(() => {
      console.log(message.value); // mounted!
    });

    // setup 内の処理はどのライフサイクルフックよりも先に実行される
    message.value += '!';

    return {
      obj,
      plusOneObj,
      curryComputed,
      textRef,
      mutateComputedFn,
      mutable,
      stopHandler,
      nestedObj,
      shallowReadOnlyObj,
      MutateShallowReadOnlyObj,
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
      <div>
        {{ array }}
      </div>
      <BaseButton :handle-fn="pushedState">push</BaseButton>
    </div>
    <div>
      <BaseButton :handle-fn="moveState">move</BaseButton>
    </div>
    <div>
      <div>text ref:{{ textRef }}</div>
      <div>mutable computed:{{ mutable }}</div>
      <BaseButton :handle-fn="mutateComputedFn">mutateComputedFn</BaseButton>
      <BaseButton :handle-fn="stopHandler">stopLocationMutate</BaseButton>
    </div>
    <div>
      {{ obj }}
      <BaseButton :handle-fn="plusOneObj">add</BaseButton>
    </div>
    <div>
      {{ nestedObj }}
      {{ shallowReadOnlyObj }}
      <BaseButton :handle-fn="MutateShallowReadOnlyObj"
        >MutateShallowReadOnlyObj</BaseButton
      >
    </div>
    <SampleSlot>
      <template #foo>slot1</template>
      <template #bar>slot2</template>
    </SampleSlot>
  </ThemeContext>
</template>
