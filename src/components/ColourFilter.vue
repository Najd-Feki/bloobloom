<script setup lang="ts">
import type { FilterType } from '@/types/filter';
const colours = [
  {
    name: 'black',
    uri: 'https://d32y5z2afvomc1.cloudfront.net/assets/filters_black_01.png',
  },
  {
    name: 'tortoise',
    uri: '	https://d32y5z2afvomc1.cloudfront.net/assets/filters_tortoise_02.png',
  },
  {
    name: 'coloured',
    uri: '	https://d32y5z2afvomc1.cloudfront.net/assets/filters_coloured_03.png',
  },
  {
    name: 'crystal',
    uri: 'https://d32y5z2afvomc1.cloudfront.net/assets/filters_crystal_04.png',
  },
  {
    name: 'dark',
    uri: 'https://d32y5z2afvomc1.cloudfront.net/assets/filters_dark_05.png',
  },
  {
    name: 'bright',
    uri: 'https://d32y5z2afvomc1.cloudfront.net/assets/filters_bright_06.png',
  },
];

const props = defineProps<{
  setSelectedFilter: (filter: FilterType) => void;
  popSelectedFilter: (filter: FilterType) => void;
  selectedColors: string[];
}>();
const handleSelectColour = (filter: FilterType) => {
  !isColorAlreadySelected(filter) && filter.colour
    ? props.setSelectedFilter(filter)
    : props.popSelectedFilter(filter);
};
const isColorAlreadySelected = (filter: FilterType) =>
  props.selectedColors.some((el) => el === filter.colour);
</script>

<template>
  <div class="glasses-row">
    <div
      v-for="colour in colours"
      :key="colour.name"
      class="colour-title"
      @click="handleSelectColour({ colour: colour.name })"
    >
      <div
        v-if="isColorAlreadySelected({ colour: colour.name })"
        class="selected-colour-title"
      >
        <img :src="colour.uri" class="colour-image" />{{ colour.name }}
      </div>
      <div v-else><img :src="colour.uri" class="colour-image" />{{ colour.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.colour-title {
  flex: 0 0 16.43%;
  border: 1px solid black;
  border-top: 0;
  line-height: 50px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  padding: 5px 0;
}
.selected-colour-title {
  border: 1px solid black;
  margin: 0 6px;
}
.colour-image {
  background-position: center center;
  background-color: black;
  height: 15px;
  width: 15px;
  display: inline-block;
  border-radius: 100%;
  margin-right: 5px;
  position: relative;
  top: 2px;
}
</style>
