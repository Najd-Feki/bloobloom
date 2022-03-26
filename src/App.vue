<script setup lang="ts">
import GlassesView from '@/views/GlassesView.vue';
import { getGlasses } from './services/glasses';
import { onMounted, ref } from 'vue';
import type { IProducts } from './types/products';
const data = ref<IProducts>({} as IProducts);

onMounted(async () => {
  data.value = await getGlasses();
});
</script>

<template>
  <div>
    <GlassesView />
    <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->
  </div>
</template>

<style>
/* @import '@/assets/base.css'; */
</style>
