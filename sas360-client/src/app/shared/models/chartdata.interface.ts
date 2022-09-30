export interface DataChart {
  name: string;
  series: SeriesChart[];
}

export interface SeriesChart {
  name: string;
  value: number;
}
