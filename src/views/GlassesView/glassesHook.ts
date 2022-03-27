import { ref } from 'vue';
import type { FilterType, FinalFilterType } from '@/types/filter';
import { constructQuery } from '@/helpers/constructQuery';
import { getGlasses } from '@/services';
import { productType } from '@/global/ProductTypeState';
import type { IProducts } from '@/types/products';
export const glassesHook = () => {
  const data = ref<IProducts>({} as IProducts);
  const colourSwitcher = ref<boolean>(false);
  const shapeSwitcher = ref<boolean>(false);
  const pageNumber = ref<number>(1);
  const loading = ref(false);
  const selectedFilters = ref<FinalFilterType>({
    colours: [],
    shapes: [],
  });
  const setSelectedFilter = async (filter: FilterType) => {
    filter.colour && selectedFilters.value.colours.push(filter.colour);
    filter.shape && selectedFilters.value.shapes.push(filter.shape);
    const queryParams = constructQuery(selectedFilters.value);
    data.value = await getGlasses({ queryParams, productType: productType.value });
    pageNumber.value = 1;
  };
  const popSelectedFilter = async (filter: FilterType) => {
    if (filter.colour)
      selectedFilters.value.colours = selectedFilters.value.colours.filter(
        (el) => el !== filter.colour,
      );
    if (filter.shape)
      selectedFilters.value.shapes = selectedFilters.value.shapes.filter(
        (el) => el !== filter.shape,
      );
    const queryParams = constructQuery(selectedFilters.value);
    loading.value = true;
    data.value = await getGlasses({ queryParams, productType: productType.value });
    pageNumber.value = 1;
    loading.value = false;
  };
  const clearFilter = async () => {
    selectedFilters.value = { colours: [], shapes: [] };
    loading.value = true;
    data.value = await getGlasses({ productType: productType.value });
    loading.value = false;
  };
  const showColours = () => {
    colourSwitcher.value = !colourSwitcher.value;
    shapeSwitcher.value = false;
  };
  const showShapes = () => {
    shapeSwitcher.value = !shapeSwitcher.value;
    colourSwitcher.value = false;
  };

  return {
    showShapes,
    showColours,
    clearFilter,
    popSelectedFilter,
    setSelectedFilter,
    data,
    colourSwitcher,
    shapeSwitcher,
    pageNumber,
    loading,
    selectedFilters,
  };
};
