<script setup lang="ts">
import type { FilterType } from '@/types/filter';
import { shapes } from '@/constants/filterData';
const props = defineProps<{
  setSelectedFilter: (filter: FilterType) => void;
  popSelectedFilter: (filter: FilterType) => void;
  selectedShapes: string[];
}>();
const handleSelectShape = (filter: FilterType) => {
  !isShapeAlreadySelected(filter) && filter
    ? props.setSelectedFilter(filter)
    : props.popSelectedFilter(filter);
};
const isShapeAlreadySelected = (filter: FilterType) =>
  props.selectedShapes.some((el) => el === filter.shape);
</script>

<template>
  <div class="glasses-row">
    <div
      v-for="shape in shapes"
      :key="shape"
      class="shape-title"
      @click="handleSelectShape({ shape })"
    >
      <div v-if="isShapeAlreadySelected({ shape })" class="selected-shape-title">
        {{ shape }}
      </div>
      <div v-else>{{ shape }}</div>
    </div>
  </div>
</template>

<style scoped>
.shape-title {
  flex: 0 0 24.71%;
  border: 1px solid black;
  border-top: 0;
  line-height: 50px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  padding: 5px 0;
}
.selected-shape-title {
  border: 1px solid black;
  margin: 0 6px;
}
@media only screen and (max-width: 1025px) {
  .shape-title {
    flex: 0 0 49.5%;
  }
}
@media only screen and (max-width: 415px) {
  .shape-title {
    flex: 0 0 49.2%;
  }
}
</style>
