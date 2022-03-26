/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CostBreakdown {
  id: number;
  materials: number;
  labour: number;
  transport: number;
  taxes: number;
  bloobloom_price: number;
  retail_price: number;
}

export interface Medium {
  id: number;
  medium_type: string;
  mime_type: string;
  file_location: string;
  file_name: string;
  original_file_name: string;
  size: number;
  url: string;
  position: number;
}

export interface Colour {
  id: number;
  name: string;
  media: Medium[];
}

export interface FrameVariant {
  id: number;
  name: string;
  configuration_name: string;
  barcode?: any;
  harmonized_system_code?: any;
  stock_keeping_unit?: any;
  status: string;
  colour: Colour;
}

export interface Media {
  id: number;
  medium_type: string;
  mime_type: string;
  file_location: string;
  file_name: string;
  original_file_name: string;
  size: number;
  url: string;
  position: number;
}

export interface GlassVariant {
  id: number;
  barcode?: any;
  harmonized_system_code?: any;
  stock_keeping_unit?: any;
  inventory: boolean;
  home_trial_available: boolean;
  price: number;
  frame_variant: FrameVariant;
  media: Media[];
}

export interface Glass {
  id: number;
  name: string;
  configuration_name: string;
  cost_breakdown: CostBreakdown;
  glass_variants: GlassVariant[];
}

export interface Meta {
  total_count: number;
}

export interface IProducts {
  glasses: Glass[];
  meta: Meta;
}
