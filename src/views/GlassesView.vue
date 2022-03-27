<script setup lang="ts">
/* eslint-disable max-lines */
import { getGlasses } from '@/services';
import type { IProducts } from '@/types/products';
import { onMounted, ref, watchEffect } from 'vue';
import ColourFilter from '@/components/ColourFilter.vue';
import ShapeFilter from '@/components/ShapeFilter.vue';
import type { FilterType, FinalFilterType } from '@/types/filter';
import Filter from '@/components/Filter.vue';
import { constructQuery } from '@/helpers/constructQuery';
import { productType } from '@/components/ProductTypeState';
const data = ref<IProducts>({} as IProducts);
const colourSwitcher = ref<boolean>(false);
const shapeSwitcher = ref<boolean>(false);
const pageNumber = ref<number>(1);
const selectedFilters = ref<FinalFilterType>({
  colours: [],
  shapes: [],
});
watchEffect(async () => {
  data.value = await getGlasses({
    productType: productType.value,
  });
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
const setSelectedFilter = async (filter: FilterType) => {
  filter.colour && selectedFilters.value.colours.push(filter.colour);
  filter.shape && selectedFilters.value.shapes.push(filter.shape);
  const queryParams = constructQuery(selectedFilters.value);
  data.value = await getGlasses({ queryParams, productType: productType.value });
  pageNumber.value = 1;
};
const popSelectedFilter = async (filter: FilterType) => {
  if (filter.colour)
    selectedFilters.value.colours = selectedFilters.value.colours.filter(
      (el) => el !== filter.colour,
    );
  if (filter.shape)
    selectedFilters.value.shapes = selectedFilters.value.shapes.filter(
      (el) => el !== filter.shape,
    );
  const queryParams = constructQuery(selectedFilters.value);
  data.value = await getGlasses({ queryParams, productType: productType.value });
  pageNumber.value = 1;
};
const clearFilter = async () => {
  selectedFilters.value = { colours: [], shapes: [] };
  data.value = await getGlasses({ productType: productType.value });
};
const showColours = () => {
  colourSwitcher.value = !colourSwitcher.value;
  shapeSwitcher.value = false;
};
const showShapes = () => {
  shapeSwitcher.value = !shapeSwitcher.value;
  colourSwitcher.value = false;
};
onMounted(async () => {
  data.value = await getGlasses({ productType: productType.value });
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
    <div v-if="data.glasses" class="glasses-row">
      <div v-for="item in data.glasses" :key="item.id" class="glasses-image-container">
        <img class="glasses-image" :src="item.glass_variants[0].media[0].url" />
      </div>
    </div>
    <div v-else>
      <img class="loader" src="@/assets/eyewear.gif" />
    </div>
  </div>
</template>
<style>
.loader {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.container {
  margin-top: 4rem;
}
.glasses-header {
  flex: 0 0 33%;
  border: 1px solid black;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  height: 3rem;
}
.filter-title {
  flex: 0 0 24.7%;
  border-right: 2px solid black;
  height: 3rem;
  line-height: 45px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
}
.glasses-title {
  line-height: 45px;
  font-size: 25px;
  font-family: 'caslon-graphique';
  font-weight: 300;
  text-align: center;
  margin: 0;
  text-transform: uppercase;
  font-family: 'caslon-graphique';
  font-weight: bold;
}
.glasses-image {
  max-width: 100%;
  height: 100%;
}
.glasses-image-container {
  flex: 0 0 33%;
  border: 1px solid black;
  border-top: 0;
}
.glasses-container {
  overflow-x: hidden;
}
.glasses-row {
  display: flex;
  flex-wrap: wrap;
}
@media only screen and (max-width: 1200px) {
  .glasses-image-container {
    flex: 0 0 49.5%;
  }
}
@media only screen and (max-width: 412px) {
  .glasses-image-container {
    flex: 0 0 99%;
  }
}
@media only screen and (max-width: 1025px) {
  .glasses-header {
    flex: 0 0 99%;
  }
  .filter-title {
    flex: 0 0 49.7%;
    border-right: 1px solid black;
  }
}
</style>
