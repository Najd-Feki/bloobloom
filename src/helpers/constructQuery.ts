import type { FinalFilterType } from '@/types/filter';
export const constructQuery = (filter: FinalFilterType) => {
  const { colours, shapes } = filter;
  const formattedColours = colours
    .map(
      (colour) =>
        `filters[glass_variant_frame_variant_colour_tag_configuration_names][]=${colour}`,
    )
    .join('&');
  const formattedShapes = shapes
    .map(
      (shape) =>
        `filters[glass_variant_frame_variant_frame_tag_configuration_names][]=${shape}`,
    )
    .join('&');

  return `${formattedColours}&${formattedShapes}`;
};
