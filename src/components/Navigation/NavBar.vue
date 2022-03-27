<script setup lang="ts">
import SideBar from './SideBar.vue';
import { navigationHook } from './navgationHook';
import { computed, onMounted, ref } from 'vue';
import MinifiedSideBar from './MinifiedSideBar.vue';

const { hideSideBar, showSideBar, isSideBarVisible } = navigationHook();
const SideBarVisible = computed(() => isSideBarVisible);
const shouldHideSideBar = computed(() => hideSideBar);
const shouldShowSideBar = computed(() => showSideBar);
const isMiniSidebar = ref(window.innerWidth <= 1025);
const minifiedSideBarToggle = ref(false);

onMounted(() => {
  window.onresize = () => (isMiniSidebar.value = window.innerWidth <= 1025);
});
const handleMinifiedSideBarToggle = () => {
  if (isMiniSidebar.value) {
    minifiedSideBarToggle.value = !minifiedSideBarToggle.value;
  }
};
</script>

<template>
  <div class="navbar">
    <div @mouseenter="showSideBar" @mouseleave="hideSideBar">
      <div class="nav-item" @click="handleMinifiedSideBarToggle">
        {{ isMiniSidebar && minifiedSideBarToggle ? 'X' : 'MENU' }}
      </div>
      <div v-if="!isMiniSidebar && !minifiedSideBarToggle">
        <SideBar
          :isSideBarVisible="SideBarVisible.value"
          :hideSideBar="shouldHideSideBar"
          :showSideBar="shouldShowSideBar"
        />
      </div>
      <div v-if="isMiniSidebar && minifiedSideBarToggle">
        <MinifiedSideBar :handleMinifiedSideBarToggle="handleMinifiedSideBarToggle" />
      </div>
    </div>
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" />
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  width: 100%;
  height: 4rem;
  background-color: white;
  display: flex;
  align-items: center;
  top: 0;
}
.nav-item {
  text-decoration: underline;
  position: absolute;
  left: 2rem;
  height: 4rem;
  width: 5rem;
  cursor: pointer;
  font-weight: 900;
  padding-left: 15px;
  font-size: 13px;
  top: 1.5rem;
  font-family: 'caslon-graphique';
}
.logo {
  display: block;
  width: 40px;
  height: 40px;
  margin: auto;
}
</style>
