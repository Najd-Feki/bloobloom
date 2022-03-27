<script setup lang="ts">
import { computed } from 'vue';
import { navigationHook } from './navgationHook';
import ArrowIcon from '../icons/ArrowIcon.vue';
import NestedSideBar from './NestedSideBar.vue';
const {
  hideSecondSideBar,
  showSecondSideBar,
  isSecondSideBarVisible,
  isThirdSideBarVisible,
  showThirdSideBar,
  hideThirdSideBar,
} = navigationHook();
const props = defineProps<{
  isSideBarVisible: boolean;
  hideSideBar: () => void;
  showSideBar: () => void;
}>();
const isSideBarVisible = computed(() => props.isSideBarVisible);
const hideSideBar = computed(() => props.hideSideBar);
const showSideBar = computed(() => props.showSideBar);
</script>

<template>
  <Transition name="sideBar">
    <div
      class="sidebar"
      v-if="isSideBarVisible"
      @mouseenter="showSideBar"
      @mouseleave="hideSideBar"
    >
      <div
        :class="isSecondSideBarVisible ? 'side-item-dark' : 'side-item-light'"
        @mouseenter="showSecondSideBar"
        @mouseleave="hideSecondSideBar"
      >
        <span class="side-text">spectacles</span>
        <div class="arrow-icon"><ArrowIcon /></div>
      </div>
      <div
        :class="isThirdSideBarVisible ? 'side-item-dark' : 'side-item-light'"
        @mouseenter="showThirdSideBar"
        @mouseleave="hideThirdSideBar"
      >
        <span class="side-text">sunglasses</span>
        <div class="arrow-icon"><ArrowIcon /></div>
      </div>
      <div class="side-item-light">
        <span class="side-text-no-icon">Home&nbsp;Try&nbsp;On</span>
      </div>
      <div class="side-item-light">
        <span class="side-text-no-icon">Pair&nbsp;for&nbsp;Pair</span>
      </div>
      <NestedSideBar
        :showNestedSideBar="showSecondSideBar"
        :isNestedSideBarVisible="isSecondSideBarVisible"
        :hideNestedSideBar="hideSecondSideBar"
        text="spectacles"
      />
      <NestedSideBar
        :showNestedSideBar="showThirdSideBar"
        :isNestedSideBarVisible="isThirdSideBarVisible"
        :hideNestedSideBar="hideThirdSideBar"
        text="sunglasses"
      />
    </div>
  </Transition>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 4rem;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: white;
  border-right: 1px solid black;
  border-top: 1px solid black;
}

.side-text {
  margin: 0 1rem;
}
.side-text-no-icon {
  margin-right: 3rem;
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
.side-item-light {
  flex: 0 0 24.7%;
  border-bottom: 2px solid black;
  height: 3rem;
  line-height: 45px;
  justify-content: space-around;
  display: flex;
  padding: 0 5rem;
  text-transform: uppercase;
  cursor: pointer;
}
.side-item-dark {
  flex: 0 0 24.7%;
  border-bottom: 2px solid black;
  height: 3rem;
  background-color: black;
  color: white;
  line-height: 45px;
  padding: 0 5rem;
  justify-content: space-around;
  display: flex;
  text-transform: uppercase;
  cursor: pointer;
}
.arrow-icon {
  padding-top: 2px;
  margin-left: 2rem;
}
.sideBar-enter-active,
.sideBar-leave-active {
  transition: all 0.3s ease-out;
}

.sideBar-enter-from,
.sideBar-leave-to {
  transform: translateX(-100%);
}
@media only screen and (max-width: 1025px) {
  .sidebar {
    width: 100%;
  }
}
</style>
