<script setup lang="ts">
/* eslint-disable max-lines */
import { ref } from 'vue';
import ArrowIcon from './icons/ArrowIcon.vue';
import { productType } from './ProductTypeState';
const setProductType = (type: string) => (productType.value = type);
const isSideBarVisible = ref<boolean>(false);
const showSideBar = () => (isSideBarVisible.value = true);
const hideSideBar = () => (isSideBarVisible.value = false);
const isSecondSideBarVisible = ref<boolean>(false);
const showSecondSideBar = () => {
  isSecondSideBarVisible.value = true;
  isSideBarVisible.value = true;
};
const hideSecondSideBar = () => {
  isSecondSideBarVisible.value = false;
  isSideBarVisible.value = false;
};
const isThirdSideBarVisible = ref<boolean>(false);
const showThirdSideBar = () => {
  isThirdSideBarVisible.value = true;
  isSideBarVisible.value = true;
};
const hideThirdSideBar = () => {
  isThirdSideBarVisible.value = false;
  //isSideBarVisible.value = false;
};
</script>

<template>
  <div class="navbar">
    <div class="nav-item" @mouseenter="showSideBar" @mouseleave="hideSideBar">MENU</div>
    <div></div>
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" />
  </div>

  <div
    v-if="isSideBarVisible"
    @mouseenter="showSideBar"
    @mouseleave="hideSideBar"
    class="sidebar"
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
      <span class="side-text-no-icon">home&nbsp;try&nbsp;on</span>
    </div>
    <div class="side-item-light">
      <span class="side-text-no-icon">pair&nbsp;for&nbsp;pair</span>
    </div>
  </div>
  <div
    v-if="isSecondSideBarVisible"
    @mouseenter="showSecondSideBar"
    @mouseleave="hideSecondSideBar"
    class="second-sidebar"
  >
    <div class="side-item">
      <span class="second-side-text" @click="setProductType('spectacles-women')">women</span>
    </div>
    <div class="side-item">
      <span class="second-side-text" @click="setProductType('spectacles-men')">men</span>
    </div>
  </div>
  <div
    v-if="isThirdSideBarVisible"
    @mouseenter="showThirdSideBar"
    @mouseleave="hideThirdSideBar"
    class="second-sidebar"
  >
    <div class="side-item">
      <span
        class="second-side-text"
        @mouseenter="showSideBar"
        @click="setProductType('sunglasses-women')"
        >women</span
      >
    </div>
    <div class="side-item">
      <span
        class="second-side-text"
        @mouseenter="showSideBar"
        @click="setProductType('sunglasses-men')"
        >men</span
      >
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  width: 98%;
  height: 4rem;
  background-color: white;
  display: flex;
  align-items: center;
  top: 0;
  border-bottom: 1px solid black;
}
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
.second-sidebar {
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
.nav-item {
  line-height: 3.5rem;
  text-decoration: underline;
  position: absolute;
  left: 2rem;
  height: 4rem;
  width: 5rem;
  cursor: pointer;
  font-weight: 900;
  padding-left: 15px;
  font-size: 13px;
  font-family: 'caslon-graphique';
}
.logo {
  display: block;
  width: 40px;
  height: 40px;
  margin: auto;
}
.side-text {
  margin: 0 1rem;
}
.side-text-no-icon {
  margin-right: 3rem;
}
.second-side-text {
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
.v-enter-active,
.v-leave-active {
  transition: width 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  width: 0;
}
</style>
