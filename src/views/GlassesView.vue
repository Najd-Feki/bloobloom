<script setup lang="ts">
import { getGlasses } from '@/services/glasses';
import type { IProducts } from '@/types/products';
import { onMounted, ref } from 'vue';
import ColourFilter from '@/components/ColourFilter.vue';
import ShapeFilter from '@/components/ShapeFilter.vue';
import type { FilterType, FinalFilterType } from '@/types/filter';
import Filter from '@/components/Filter.vue';
import { constructQuery } from '@/helpers/constructQuery';
const data = ref<IProducts>({} as IProducts);
const colourSwitcher = ref<boolean>(false);
const shapeSwitcher = ref<boolean>(false);
const pageNumber = ref<number>(1);
const selectedFilters = ref<FinalFilterType>({
  colours: [],
  shapes: [],
});
window.onscroll = async () => {
  const bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight ===
    document.documentElement.offsetHeight;

  if (bottomOfWindow) {
    pageNumber.value++;
    const queryParams = constructQuery(selectedFilters.value);
    const newFetchedData = await getGlasses({ pageNumber: pageNumber.value, queryParams });
    data.value.glasses.push(...newFetchedData.glasses);
  }
};
const setSelectedFilter = async (filter: FilterType) => {
  filter.colour && selectedFilters.value.colours.push(filter.colour);
  filter.shape && selectedFilters.value.shapes.push(filter.shape);
  const queryParams = constructQuery(selectedFilters.value);
  data.value = await getGlasses({ queryParams });
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
  data.value = await getGlasses({ queryParams });
  pageNumber.value = 1;
};
const clearFilter = async () => {
  selectedFilters.value = { colours: [], shapes: [] };
  data.value = await getGlasses({});
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
  data.value = await getGlasses({});
});
</script>

<template>
  <div class="glasses-row">
    <div class="glasses-header"></div>
    <div class="glasses-header glasses-title">hehe</div>
    <div class="glasses-header glasses-row">
      <div @click="showColours" class="filter-title">colour</div>
      <div @click="showShapes" class="filter-title">shape</div>
    </div>
  </div>
  <div v-if="colourSwitcher">
    <ColourFilter
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
  <!-- <div v-if="selectedFilters"> -->
  <Filter :clearFilter="clearFilter" :filters="selectedFilters"></Filter>
  <!-- </div> -->
  <div v-if="data" class="glasses-row">
    <div
      v-for="item in data.glasses"
      :key="item.id"
      class="glasses-image-container border border-1 border-dark"
    >
      <img class="glasses-image" :src="item.glass_variants[0].media[0].url" />
    </div>
  </div>
</template>

<style>
.glasses-header {
  flex: 0 0 33%;
  border: 1px solid black;
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
</style>
