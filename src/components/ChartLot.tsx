import { memo, use, useEffect, useMemo, useRef, useState } from "react";
import {
  lotPteLayer,
  handedOverLotLayer,
  lotLayer,
  lotPartialPaymentLayer,
} from "../layers";
import {
  dateUpdate,
  fieldStatistic,
  thousands_separators,
  zoomToLayer,
} from "../query";
import "@esri/calcite-components/dist/components/calcite-segmented-control";
import "@esri/calcite-components/dist/components/calcite-segmented-control-item";
import "@esri/calcite-components/dist/components/calcite-checkbox";
import {
  lot_aa_f,
  lot_hoa_f,
  lot_ho_f,
  lot_id_f,
  lot_status_f,
  lot_status_q,
  primaryLabelColor,
  valueLabelColor,
  cp_f,
} from "../uniqueValues";
import "@arcgis/map-components/dist/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-scene";
import { useQuery } from "@tanstack/react-query";
import type { ChartResponse } from "../interfaceKeys";
import {
  chartSetter,
  legendSetter,
  rootSetter,
  seriesSetter,
} from "../chartSetter";
import ChartPieSeriesRender from "chart-pie-series-render";
import ChartPieSeries from "chart-pie-series";
import { MyContext } from "../contexts/MyContext";
import { queryDefinitionExpression } from "../queryDefinition";
import QueryExpressionLayers from "query-layers-expression";

const CHART_ID = "pie-two";
const SERIES_SCALE = 220;
const INNER_VALUE_FONT_SIZE = "1.1rem";
const INNER_LABEL_FONT_SIZE = "0.45em";

//--------------------------//
//      useLotData          //
//--------------------------//
function useLotData(
  cpackage: string,
  statusField: string,
  hoaField: string,
  afaField: string,
  hoField: string,
  baseFilter: any,
  lot_status_q2: any,
) {
  return useQuery<ChartResponse | any>({
    queryKey: [lot_status_f, lotLayer, cpackage, baseFilter],
    queryFn: async () => {
      const q1 = new QueryExpressionLayers({ ...baseFilter });
      const q2 = new QueryExpressionLayers({
        ...baseFilter,
        qExpression: `${statusField} <> 8`,
      });

      queryDefinitionExpression({
        queryExpression: q1.queryExpression(),
        featureLayer: [
          lotLayer,
          handedOverLotLayer,
          lotPartialPaymentLayer,
          lotPteLayer,
        ],
      });

      const baseArgs = {
        where: q1.queryExpression(),
        layer: lotLayer,
        statisticType: "count" as const,
      };

      const baseArgs2 = {
        where: q1.queryExpression(),
        layer: lotLayer,
        statisticType: "sum" as const,
      };

      const [
        chartData,
        totalNumber,
        affectedArea,
        handedOverArea,
        handedOverNumber,
      ] = await Promise.all([
        new ChartPieSeries({
          ...baseArgs,
          statusList: lot_status_q2,
          statusField: statusField,
          statisticField: statusField,
        }).pieSeries(),

        //--- Total number of lots (public + private)
        fieldStatistic({ ...baseArgs, statisticField: lot_id_f }),

        //--- Total affected area (m2)
        fieldStatistic({ ...baseArgs2, statisticField: afaField }),

        //--- Total handed-over area (m2)
        fieldStatistic({ ...baseArgs2, statisticField: hoaField }),

        //--- Total number of handed-over
        fieldStatistic({
          where: q2.queryExpression(),
          layer: lotLayer,
          statisticField: hoField,
          statisticType: "sum",
        }),
      ]);

      //--- Handed-Over percent
      const handedOverPercent = Number(
        ((handedOverNumber / totalNumber) * 100).toFixed(0),
      );

      return {
        chartData,
        totalNumber,
        affectedArea,
        handedOverArea,
        handedOverNumber,
        handedOverPercent,
        query: q1,
      };
    },
    staleTime: Infinity,
  });
}

//--------------------------------------------//
//              Chart Component                //
//--------------------------------------------//
const ChartLot = memo(() => {
  const { cpackage } = use(MyContext);
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();
  const [handedOverCheckBox, setHandedOverCheckBox] = useState<any>(false);

  const lot_status_q2 = useMemo(
    () =>
      lot_status_q.map((item) =>
        item.value === 6 ? { ...item, category: "With CNO" } : item,
      ),
    [],
  );

  //--- As of date
  const { data: asofdate = "" } = useQuery({
    queryKey: ["As_Of_Date"],
    queryFn: () => dateUpdate("Land Acquisition"),
    staleTime: Infinity,
  });

  //--- Base filter
  const baseFilter = useMemo(
    () => ({
      qFields: [cp_f],
      qValues: [cpackage === "All" ? undefined : cpackage],
    }),
    [cpackage],
  );

  //--- Generate chart data
  const { data, isLoading } = useLotData(
    cpackage,
    lot_status_f,
    lot_hoa_f,
    lot_aa_f,
    lot_ho_f,
    baseFilter,
    lot_status_q2,
  );

  const chartData = data?.chartData ?? [];
  const totalNumber = data?.totalNumber ?? 0;
  const affectedArea = data?.affectedArea ?? 0;
  const handedOverArea = data?.handedOverArea ?? 0;
  const handedOverNumber = data?.handedOverNumber ?? 0;
  const handedOverPercent = data?.handedOverPercent ?? 0;

  // ************************************
  //  Responsive Chart parameters
  // ***********************************
  const new_fontSize = chartPanelwidth ? chartPanelwidth / 30 : 0;
  const new_valueSize = chartPanelwidth ? chartPanelwidth / 19 : 0;
  const new_asofDateSize = chartPanelwidth ? chartPanelwidth * 0.03 : 0;

  const pieSeriesRef = useRef<any>(null);
  const legendRef = useRef<any>(null);

  //--- Show handed-over lots
  useEffect(() => {
    handedOverLotLayer.visible = handedOverCheckBox;
  }, [handedOverCheckBox]);

  const zoomFiltersRef = useRef(`${cpackage}`);

  useEffect(() => {
    const arcgisScene = document.querySelector("arcgis-scene");

    //--- Zoom after 1st render
    const currentZoomFilters = `${cpackage}`;
    if (currentZoomFilters !== zoomFiltersRef.current) {
      zoomFiltersRef.current = currentZoomFilters;
      zoomToLayer(lotLayer, arcgisScene?.view);
    }

    const root = rootSetter({ chartID: CHART_ID });
    root.setThemes([]);
    const chart = chartSetter({ root, y: 10 });

    const pieSeries = seriesSetter({
      chart,
      root,
      categoryField: "category",
      valueField: "value",
      legendLabelText: "{category}",
      legendValueText: "{valuePercentTotal.formatNumber('#.')}% ({value})",
      radius: 45,
      innerRadius: 28,
    });
    pieSeriesRef.current = pieSeries;
    chart.series.push(pieSeries);

    const legend = legendSetter({
      chart,
      root,
      centerX: 50,
      x: 50,
      scale: 1.0,
    });
    legendRef.current = legend;
    legend.setAll({ marginBottom: 10 });
    legend.data.setAll(pieSeries.dataItems);

    new ChartPieSeriesRender({
      chart,
      pieSeries,
      legend,
      root,
      qChart: data?.query,
      q2Expression: undefined,
      status_field: lot_status_f,
      view: arcgisScene?.view,
      updateChartPanelwidth: setChartPanelwidth,
      data: chartData,
      seriesScale: SERIES_SCALE,
      innerLabel: "PRIVATE LOTS",
      innerLabelFontSize: INNER_LABEL_FONT_SIZE,
      innerValueFontSize: INNER_VALUE_FONT_SIZE,
      layer: lotLayer,
      statusArray: lot_status_q2,
      bkg_color_switch: false,
      seriesFillHash: undefined,
    }).chartDataRenderer();

    pieSeries.data.setAll(chartData);
    legend.data.setAll(pieSeries.dataItems);

    return () => root.dispose();
  }, [cpackage, chartData]);

  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: "3px",
          marginLeft: "35px",
          justifyContent: "center",
          gap: "65px",
          marginBottom: "5px",
        }}
      >
        <dl style={{ alignItems: "center" }}>
          <dt
            style={{ color: primaryLabelColor, fontSize: `${new_fontSize}px` }}
          >
            TOTAL LOTS
          </dt>
          <dd
            style={{
              color: valueLabelColor,
              fontSize: `${new_valueSize}px`,
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              opacity: isLoading ? 0 : 1,
              textAlign: "center",
            }}
          >
            {thousands_separators(totalNumber)}
          </dd>
        </dl>
        <dl style={{ alignItems: "center" }}>
          <dt
            style={{ color: primaryLabelColor, fontSize: `${new_fontSize}px` }}
          >
            TOTAL AFFECTED AREA
          </dt>
          <dd
            style={{
              color: valueLabelColor,
              fontSize: `${new_valueSize}px`,
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              fontWeight: "bold",
              opacity: isLoading ? 0 : 1,
              textAlign: "center",
            }}
          >
            {thousands_separators(affectedArea.toFixed(0))}
            <label
              style={{ fontWeight: "normal", fontSize: `${new_fontSize}px` }}
            >
              {" "}
              m
            </label>
            <label style={{ verticalAlign: "super", fontSize: "0.6rem" }}>
              2
            </label>
          </dd>
        </dl>
      </div>

      <div
        style={{
          color: "gray",
          fontSize: `${new_asofDateSize}px`,
          float: "right",
          marginRight: "1%",
          marginTop: "1.5%",
          opacity: isLoading ? 0 : 1,
        }}
      >
        {asofdate ? `As of ${asofdate}` : `As of `}
      </div>

      {/* Lot Chart */}
      <div
        id={CHART_ID}
        style={{
          width: "100%",
          height: "57vh",
          backgroundColor: "rgb(0,0,0,0)",
          color: "white",
          marginTop: "6%",
          marginBottom: "1%",
          opacity: isLoading ? 0 : 1,
        }}
      ></div>

      {/* Handed-Over */}
      <div
        style={{
          display: "flex",
          marginLeft: "3%",
          marginRight: "5%",
          justifyContent: "space-between",
          marginTop: "3%",
        }}
      >
        <div
          style={{
            backgroundColor: "green",
            height: "0",
            marginTop: "13px",
            marginRight: "-10px",
          }}
        >
          <calcite-checkbox
            name="handover-checkbox"
            label="VIEW"
            scale="l"
            oncalciteCheckboxChange={() =>
              setHandedOverCheckBox((prev: any) => !prev)
            }
          ></calcite-checkbox>
        </div>
        <dl style={{ alignItems: "center" }}>
          <dt
            style={{ color: primaryLabelColor, fontSize: `${new_fontSize}px` }}
          >
            TOTAL HANDED-OVER
          </dt>
          <dd
            style={{
              color: valueLabelColor,
              fontSize: `${new_valueSize}px`,
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              opacity: isLoading ? 0 : 1,
              textAlign: "center",
            }}
          >
            {handedOverPercent}% ({thousands_separators(handedOverNumber)})
          </dd>
        </dl>
        <dl style={{ alignItems: "center" }}>
          <dt
            style={{ color: primaryLabelColor, fontSize: `${new_fontSize}px` }}
          >
            HANDED-OVER AREA
          </dt>
          <dd
            style={{
              color: valueLabelColor,
              fontSize: `${new_valueSize}px`,
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              fontWeight: "bold",
              opacity: isLoading ? 0 : 1,
              textAlign: "center",
            }}
          >
            {thousands_separators(handedOverArea.toFixed(0))}
            <label
              style={{ fontWeight: "normal", fontSize: `${new_fontSize}px` }}
            >
              {" "}
              m
            </label>
            <label style={{ verticalAlign: "super", fontSize: "0.6rem" }}>
              2
            </label>
          </dd>
        </dl>
      </div>
    </>
  );
});

export default ChartLot;
