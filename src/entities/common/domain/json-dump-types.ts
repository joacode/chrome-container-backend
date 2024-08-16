/* eslint-disable @typescript-eslint/no-explicit-any */
export interface WineInformation {
  wines: Wine[];
}

export interface Wine {
  id: number;
  name: string;
  seo_name: string;
  type_id: 1 | 2 | 3;
  vintage_type: number;
  is_natural: boolean;
  region: Region;
  winery: Winery;
  taste: Taste;
  statistics?: any;
  style: Style;
  has_valid_ratings: boolean;
}

interface Region {
  id: number;
  name: string;
  name_en: string;
  seo_name: string;
  country: Country;
  background_image?: any;
}

interface Country {
  code: string;
  name: string;
  native_name: string;
  seo_name: string;
  currency: Currency;
  regions_count: number;
  users_count: number;
  wines_count: number;
  wineries_count: number;
  most_used_grapes: Grape[];
}

interface Currency {
  code: string;
  name: string;
  prefix: string;
  suffix?: any;
}

interface Grape {
  id: number;
  name: string;
  seo_name: string;
  has_detailed_info: boolean;
  wines_count: number;
  parent_grape_id?: any;
}

export interface Winery {
  id: number;
  name: string;
  seo_name: string;
  status: number;
  background_image?: any;
}

interface Taste {
  structure: Structure;
  flavor: Flavor[];
}

interface Structure {
  acidity: number;
  fizziness?: any;
  intensity: number;
  sweetness: number;
  tannin: number;
  user_structure_count: number;
  calculated_structure_count: number;
}

interface Flavor {
  group: string;
  stats: Stats;
  primary_keywords: Keyword[];
  secondary_keywords: Keyword[];
}

interface Stats {
  count: number;
  score: number;
  mentions_count: number;
}

interface Keyword {
  id: number;
  name: string;
  count: number;
}

interface Style {
  id: number;
  seo_name: string;
  regional_name: string;
  varietal_name: string;
  name: string;
  image?: any;
  background_image?: any;
  description?: any;
  blurb?: any;
  interesting_facts?: any;
  body: number;
  body_description: string;
  acidity: number;
  acidity_description: string;
  wine_type_id: number;
  food: Food[];
  grapes: Grape[];
  parent_style_id: number;
  hidden: boolean;
  statistics: Statistics;
  vintage_mask?: any;
  baseline_structure: BaselineStructure;
}

interface Food {
  id: number;
  name: string;
  weight: number;
  background_image: BackgroundImage;
  seo_name: string;
}

interface BackgroundImage {
  location: string;
  variations: Variations;
}

interface Variations {
  small: string;
}

interface Statistics {
  wines_count: number;
  aggregated_wines_count: number;
}

interface BaselineStructure {
  acidity: number;
  fizziness?: any;
  intensity: number;
  sweetness: number;
  tannin: number;
}
