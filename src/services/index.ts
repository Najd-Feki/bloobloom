/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const getGlasses = async (filter: {
  queryParams?: string;
  pageNumber?: number;
  productType?: string;
}) => {
  const result = await axios.get<IProducts>(
    // eslint-disable-next-line max-len
    `https://api-staging.bloobloom.com/user/v1/sales_channels/website/collections/${
      filter.productType || 'spectacles-women'
    }/glasses?&page[limit]=12&page[number]=${filter?.pageNumber ? filter.pageNumber : 1}${
      filter?.queryParams && Object.keys(filter?.queryParams).length
        ? `&${filter.queryParams}`
        : ''
    }`,
  );
  const products = result.data;

  return products;
};
