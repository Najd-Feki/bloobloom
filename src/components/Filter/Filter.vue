<script setup lang="ts">
import type { FinalFilterType } from '@/types/filter';
import { computed } from '@vue/reactivity';

const props = defineProps<{
  filters: FinalFilterType;
  clearFilter: () => void;
}>();

const flattenedFilters = computed(() => [...props.filters.colours, ...props.filters.shapes]);
</script>

<template>
  <div class="glasses-row filter-container">
    <div v-for="(filter, index) in flattenedFilters" :key="index" class="filter-name">
      {{ `${filter},` }}
    </div>
    <span @click="props.clearFilter" class="filter-clear" v-if="flattenedFilters.length"
      >clear&nbsp;filters&nbsp;X</span
    >
  </div>
</template>

<style scoped>
.filter-name {
  height: 3rem;
  line-height: 45px;
  text-align: center;
  text-transform: uppercase;
  padding: 0 5px;
  font-size: 14px;
  font-weight: 600;
}
.filter-clear {
  flex: 0 0 0;

  font-weight: 600;
  height: 3rem;
  line-height: 45px;
  text-align: center;
  cursor: pointer;
  padding: 0 5px;
  font-size: 14px;
  font-style: italic;
}
.filter-container {
  padding: 0 2px;
  border: 1px solid black;
  border-top: 0;
  max-width: 99%;
}
</style>
