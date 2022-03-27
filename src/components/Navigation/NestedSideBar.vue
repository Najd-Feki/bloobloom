<script setup lang="ts">
import { productType } from '../ProductTypeState';
const setProductType = (type: string) => (productType.value = type);
const props = defineProps<{
  isNestedSideBarVisible: boolean;
  hideNestedSideBar: () => void;
  showNestedSideBar: () => void;
  text: string;
}>();
const handleProductTypeClick = (productType: string) => {
  setProductType(productType);
};
</script>

<template>
  <!-- <Transition name="nested-sideBar"> -->
  <div
    v-if="props.isNestedSideBarVisible"
    @mouseenter="props.showNestedSideBar"
    @mouseleave="props.hideNestedSideBar"
    class="nested-sidebar"
  >
    <div class="side-item" @click="handleProductTypeClick(`${props.text}-women`)">
      <span class="nested-side-text">women</span>
    </div>
    <div class="side-item" @click="handleProductTypeClick(`${props.text}-men`)">
      <span class="nested-side-text">men</span>
    </div>
  </div>
  <!-- </Transition -->
</template>

<style scoped>
.nested-sidebar {
  z-index: 10;
  position: fixed;
  top: 4rem;
  left: 200px;
  width: 200px;
  height: 100%;
  background-color: white;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-top: 1px solid black;
}

.nested-side-text {
  margin-left: 1rem;
}
.side-item {
  flex: 0 0 24.7%;
  border-bottom: 2px solid black;
  height: 3rem;
  line-height: 45px;
  display: flex;
  text-transform: uppercase;
  cursor: pointer;
}
/* .nested-sideBar-enter-active,
.nested-sideBar-leave-active {
  transition: all 0.3s ease-out;
}

.nested-sideBar-enter-from {
  left: 200px;
}
.nested-sideBar-leave-to {
  transform: translateX(-200px);
} */
@media only screen and (max-width: 1025px) {
  .nested-sidebar {
    width: 100%;
    z-index: 10;
    left: 1px;
  }
}
</style>
