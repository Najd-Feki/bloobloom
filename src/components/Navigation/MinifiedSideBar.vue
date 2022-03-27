<script setup lang="ts">
import { productType } from '../../global/ProductTypeState';
import { ref } from 'vue';
import ArrowIcon from '../icons/ArrowIcon.vue';
const props = defineProps<{
  handleMinifiedSideBarToggle: () => void;
}>();
const secondMenu = ref<'spectacles' | 'sunglasses' | ''>('');
const setSecondMenu = (value: 'spectacles' | 'sunglasses' | '') => (secondMenu.value = value);
const setProductType = (type: string) => (productType.value = type);
const handleProductTypeClick = (productType: string) => {
  setProductType(`${secondMenu.value}-${productType}`);
  props.handleMinifiedSideBarToggle();
};
</script>
<template>
  <div v-if="!secondMenu">
    <div class="sidebar">
      <div class="side-item" @click="setSecondMenu('spectacles')">
        <span class="side-text">spectacles</span>
        <div><ArrowIcon /></div>
      </div>
      <div class="side-item" @click="setSecondMenu('sunglasses')">
        <span class="side-text">sunglasses</span>
        <div><ArrowIcon /></div>
      </div>
      <div class="side-item">
        <span class="side-text">Home&nbsp;Try&nbsp;On</span>
      </div>
      <div class="side-item">
        <span class="side-text">Pair&nbsp;for&nbsp;Pair</span>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="sidebar">
      <div class="side-item" @click="setSecondMenu('')">
        <div class="arrow-icon"><ArrowIcon /></div>
        <span class="side-text">Back</span>
      </div>
      <div class="side-item" @click="handleProductTypeClick('women')">
        <span class="side-text">women</span>
        <div><ArrowIcon /></div>
      </div>
      <div class="side-item" @click="handleProductTypeClick('men')">
        <span class="side-text">men</span>
        <div><ArrowIcon /></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 4rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  align-items: center;
  border-right: 1px solid black;
  border-top: 1px solid black;
}
.side-item {
  padding: 1.5rem;
  border-bottom: 2px solid black;
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  text-transform: uppercase;
  cursor: pointer;
}
.side-text {
  margin: 0 1rem;
}
.arrow-icon {
  transform: rotate(180deg);
}
</style>
