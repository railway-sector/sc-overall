/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-unsafe-optional-chaining */

import { dateTable } from "./layers";
import StatisticDefinition from "@arcgis/core/rest/support/StatisticDefinition";
import { handedOverLotField, cpField, lotStatusField } from "./uniqueValues";
import type { statisticsType } from "./uniqueValues";
import Query from "@arcgis/core/rest/support/Query";

//---------------------------------------------------------//
//                 Add Layers to Map                      //
//---------------------------------------------------------//
export function addLayersToMap(map: any, layersList: any[]) {
  layersList.forEach((layer: any) => {
    map.add(layer);
  });
}

//--------------------------------//
//    As of Date function         //
//--------------------------------//
// get last date of month
export function lastDateOfMonth(date: Date) {
  const old_date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const year = old_date.getFullYear();
  const month = old_date.getMonth() + 1;
  const day = old_date.getDate();
  const final_date = `${year}-${month}-${day}`;

  return final_date;
}

// Updat date
export async function dateUpdate(category: any) {
  const query = dateTable.createQuery();
  const queryExpression =
    "project = 'SC'" + " AND " + "category = '" + category + "'";
  query.where = queryExpression; // "project = 'N2'" + ' AND ' + "category = 'Land Acquisition'";

  return dateTable.queryFeatures(query).then((response: any) => {
    const stats = response.features;
    const dates = stats.map((result: any) => {
      // get today and date recorded in the table
      const today = new Date();
      const date = new Date(result.attributes.date);

      // Calculate the number of days passed since the last update
      const time_passed = today.getTime() - date.getTime();
      const days_passed = Math.round(time_passed / (1000 * 3600 * 24));

      const year = date.getFullYear();
      const month = date.toLocaleString("en-US", {
        month: "long",
      });
      const day = date.getDate();
      const as_of_date = year < 1990 ? "" : `${month} ${day}, ${year}`;
      return [as_of_date, days_passed, date];
    });
    return dates;
  });
}

//---------------------------------------------//
//               Pie chart                     //
//---------------------------------------------//
// 'piechart' = constant declared from class ChartPieSeries in layers.ts
interface pieChartDataType {
  piechart: any;
  qChart: any;
  layer: any;
  statusList: any;
  statusField: any;
  statisticField: any;
  statisticType: "sum" | "count";
}
export async function pieChartData({
  piechart,
  qChart,
  layer,
  statusList,
  statusField,
  statisticField,
  statisticType,
}: pieChartDataType) {
  piechart.qChart = qChart.queryExpression();
  piechart.layer = layer;
  piechart.statusList = statusList;
  piechart.statusField = statusField;
  piechart.statisticField = statisticField;
  piechart.statisticType = statisticType;

  return await piechart.chartDataPieSeries();
}

interface fieldStatisticType {
  qChart: any;
  layer: any;
  statisticField: any;
  statisticType: statisticsType;
}

export async function fieldStatistic({
  qChart,
  layer,
  statisticField,
  statisticType,
}: fieldStatisticType) {
  const statsCollect = new StatisticDefinition({
    onStatisticField: statisticField,
    outStatisticFieldName: "statsCollect",
    statisticType: statisticType,
  });

  //--- Query
  const query = new Query();
  query.outStatistics = [statsCollect];
  query.where = qChart;

  return layer?.queryFeatures(query).then((response: any) => {
    return response.features[0].attributes.statsCollect;
  });
}

//---------------------------------------------//
//               Stack Columns                 //
//---------------------------------------------//
interface stackColumnsDataType {
  stackchart: any;
  qChart: any;
  categoryTypes: any;
  categoryTypeField: any;
  layers: any;
  statusField: any;
  statusState: any;
}

export async function stackColumnsChartData({
  stackchart,
  qChart,
  categoryTypes,
  categoryTypeField,
  layers,
  statusField,
  statusState,
}: stackColumnsDataType) {
  stackchart.qChart = qChart.queryExpression();
  stackchart.categoryTypes = categoryTypes;
  stackchart.categoryTypeField = categoryTypeField;
  stackchart.layers = layers;
  stackchart.statusField = statusField;
  stackchart.statusState = statusState;

  return await stackchart.chartDataStackColumns();
}

//---------------------------------------------//
//           Lot (handed over area)            //
//---------------------------------------------//
interface HandedOverArea {
  aa_field: any;
  hoa_field: any;
  cp_list: any;
  layer: any;
}
export async function handedOverAreaByContractp({
  aa_field,
  hoa_field,
  cp_list,
  layer,
}: HandedOverArea) {
  return await Promise.all(
    cp_list.map(async (cp: any) => {
      const aa = new StatisticDefinition({
        onStatisticField: aa_field,
        outStatisticFieldName: "aa",
        statisticType: "sum",
      });

      const hoa = new StatisticDefinition({
        onStatisticField: hoa_field,
        outStatisticFieldName: "hoa",
        statisticType: "sum",
      });

      const query = layer.createQuery();
      query.where = `CP = '${cp}' AND ${cpField} IS NOT NULL`;
      query.outStatistics = [aa, hoa];

      const response = await layer?.queryFeatures(query);
      const attributes = response.features[0].attributes;
      const perc = ((attributes.hoa / attributes.aa) * 100).toFixed(0);

      return {
        category: cp,
        value: perc ?? 0,
      };
    }),
  );
}

export const dateFormat = (inputDate: any, format: any) => {
  //parse the input date
  const date = new Date(inputDate);

  //extract the parts of the date
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  //replace the month
  format = format.replace("MM", month.toString().padStart(2, "0"));

  //replace the year
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  }

  //replace the day
  format = format.replace("dd", day.toString().padStart(2, "0"));

  return format;
};

//---------------------------------------------//
//                  Highlight Lot              //
//---------------------------------------------//
let highlight: any;
export async function highlightLot(layer: any, view: any) {
  const query = layer.createQuery();

  const layerView = await view?.whenLayerView(layer);
  const results = await layer?.queryObjectIds(query);

  if (highlight) {
    highlight.remove();
  }
  highlight = layerView.highlight(results);
}

export function highlightRemove() {
  if (highlight) {
    highlight.remove();
  }
}

export async function highlightHandedOverLot(layer: any, view: any) {
  const query = layer.createQuery();
  query.where = `${handedOverLotField} = 1 AND ${lotStatusField} <> 8`;

  const layerView = view?.whenLayerView(layer);
  const results = await layer?.queryObjectIds(query);

  if (highlight) {
    highlight.remove();
  }
  highlight = layerView.highlight(results);
}

//---------------------------------------------//
//                  Other Tools                //
//---------------------------------------------//
export function thousands_separators(num: any) {
  if (num) {
    const num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  } else {
    return 0;
  }
}
// Zoom to Layer
// const arcgisScene = document.querySelector("arcgis-scene") as ArcgisScene;
export function zoomToLayer(layer: any, view: any) {
  return layer.queryExtent().then((response: any) => {
    view
      ?.goTo(response.extent, {
        //response.extent
        speedFactor: 2,
      })
      .catch((error: any) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  });
}
