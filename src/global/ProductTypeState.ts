import { ref } from 'vue';
export const productType = ref<string>('spectacles-women');
export const setProductType = (type: string) => (productType.value = type);
