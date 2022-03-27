import { ref } from 'vue';
import { productType } from '../../global/ProductTypeState';
export const navigationHook = () => {
  const setProductType = (type: string) => (productType.value = type);
  const isSideBarVisible = ref<boolean>(false);
  const showSideBar = () => {
    isSideBarVisible.value = true;
  };
  const hideSideBar = () => {
    isSideBarVisible.value = false;
  };
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
    isSideBarVisible.value = false;
  };

  return {
    setProductType,
    isSideBarVisible,
    isSecondSideBarVisible,
    showSideBar,
    hideSideBar,
    showSecondSideBar,
    hideSecondSideBar,
    isThirdSideBarVisible,
    showThirdSideBar,
    hideThirdSideBar,
  };
};
