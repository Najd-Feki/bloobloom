<script setup lang="ts">
import { getGlasses } from '@/services';
import { onMounted, watchEffect } from 'vue';
import ColourFilter from '@/components/Filter/ColourFilter.vue';
import ShapeFilter from '@/components/Filter/ShapeFilter.vue';
import Filter from '@/components/Filter/Filter.vue';
import { constructQuery } from '@/helpers/constructQuery';
import { productType } from '@/global/ProductTypeState';
import { glassesHook } from './glassesHook';
const {
  showShapes,
  showColours,
  clearFilter,
  popSelectedFilter,
  setSelectedFilter,
  data,
  colourSwitcher,
  shapeSwitcher,
  pageNumber,
  loading,
  selectedFilters,
} = glassesHook();
watchEffect(async () => {
  loading.value = true;
  data.value = await getGlasses({
    productType: productType.value,
  });
  loading.value = false;
});
window.onscroll = async () => {
  const bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight ===
    document.documentElement.offsetHeight;
  if (bottomOfWindow) {
    pageNumber.value++;
    const queryParams = constructQuery(selectedFilters.value);
    const newFetchedData = await getGlasses({
      pageNumber: pageNumber.value,
      queryParams,
      productType: productType.value,
    });
    data.value.glasses.push(...newFetchedData.glasses);
  }
};
onMounted(async () => {
  loading.value = true;
  data.value = await getGlasses({ productType: productType.value });
  loading.value = false;
});
</script>
<template>
  <div class="container">
    <div class="glasses-row">
      <div class="glasses-header" />
      <div class="glasses-header glasses-title">{{ productType.replace('-', ' ') }}</div>
      <div class="glasses-header glasses-row">
        <div @click="showColours" class="filter-title">colour</div>
        <div @click="showShapes" class="filter-title">shape</div>
      </div>
    </div>
    <div v-if="colourSwitcher">
      <ColourFilter
        :colourSwitcher="colourSwitcher"
        :selectedColors="selectedFilters.colours"
        :setSelectedFilter="setSelectedFilter"
        :popSelectedFilter="popSelectedFilter"
      ></ColourFilter>
    </div>
    <div v-if="shapeSwitcher">
      <ShapeFilter
        :selectedShapes="selectedFilters.shapes"
        :setSelectedFilter="setSelectedFilter"
        :popSelectedFilter="popSelectedFilter"
      ></ShapeFilter>
    </div>
    <Filter :clearFilter="clearFilter" :filters="selectedFilters"></Filter>
    <div v-if="data.glasses && !loading" class="glasses-row">
      <div v-for="item in data.glasses" :key="item.id" class="glasses-image-container">
        <img class="glasses-image" :src="item.glass_variants[0].media[0].url" />
      </div>
    </div>
  </div>
  <div class="loader-container" v-if="!data.glasses || loading">
    <img id="loader" class="rotating" src="@/assets/logo.png" />
  </div>
</template>
<style>
@import '@/views/GlassesView/glassesStyle.css';
</style>
