//-- Date for display
export interface DisplayDates {
  asOfDate?: any;
  daysPass?: boolean;
}

export const dateDisplayKeys = {
  selected: ["displayDates"] as const,
};

//--- Chart
export interface ChartResponse {
  chartData: any[];
  totalNumber: number | string | undefined;
}

//--- type definitions
export type StatusTypenamesType =
  | "To be Constructed"
  | "Under Construction"
  | "delayed"
  | "Completed";
export type StatusStateType = "comp" | "incomp" | "ongoing" | "delayed";
export type LayerNameType = "utility" | "viaduct" | "others";
export type statisticsType = "count" | "sum";
