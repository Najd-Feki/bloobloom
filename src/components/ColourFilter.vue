<script setup lang="ts">
import type { FilterType } from '@/types/filter';
import { colours } from '@/constants/filterData';

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
      <div v-else class="inside-colour-title">
        <img :src="colour.uri" class="colour-image" />{{ colour.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.colour-title {
  flex: 0 0 16.43%;
  border: 1px solid black;
  border-top: 2px solid black;
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.inside-colour-title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.colour-image {
  background-position: center center;
  background-color: black;
  height: 15px;
  width: 15px;
  display: inline-block;
  border-radius: 100%;
  margin-right: 5px;
  top: 2px;
  margin-bottom: 1px;
}
@media only screen and (max-width: 1025px) {
  .colour-title {
    flex: 0 0 49.5%;
  }
}
@media only screen and (max-width: 415px) {
  .colour-title {
    flex: 0 0 49.2%;
  }
}
</style>
