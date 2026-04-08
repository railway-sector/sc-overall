import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import LabelSymbol3D from "@arcgis/core/symbols/LabelSymbol3D";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import CustomContent from "@arcgis/core/popup/content/CustomContent";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D.js";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer.js";
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";
import SizeVariable from "@arcgis/core/renderers/visualVariables/SizeVariable.js";
import ColorVariable from "@arcgis/core/renderers/visualVariables/ColorVariable.js";
import RotationVariable from "@arcgis/core/renderers/visualVariables/RotationVariable.js";
import SceneLayer from "@arcgis/core/layers/SceneLayer";

import {
  barangayField,
  cpField,
  endorsedField,
  endorsedStatus,
  labelSymbol3DLine,
  landOwnerField,
  landUseField,
  lotHandedOverDateField,
  lotHandedOverField,
  lotStatusColor,
  lotStatusField,
  lotStatusLabel,
  lotUseArray,
  municipalityField,
  nloStatusField,
  nloStatusLabel,
  nloStatusSymbolRef,
  percentHandedOverField,
  structureOccupancyRef,
  structureOccupancyStatusField,
  structureOccupancyStatusLabel,
  structureOwnershipColor,
  structureOwnershipStatusField,
  structureOwnershipStatusLabel,
  structureStatusColorRgb,
  structureStatusField,
  structureStatusLabel,
  tunnelAffectLotField,
  utilLineColor,
  valueLabelColor,
} from "./uniqueValues";

/* Standalone table for Dates */
export const dateTable = new FeatureLayer({
  portalItem: {
    id: "b2a118b088a44fa0a7a84acbe0844cb2",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
});

const line_3d = new LineSymbol3D({
  symbolLayers: [
    new PathSymbol3DLayer({
      profile: "quad",
      width: 0.5,
      height: 5,
      material: { color: "#ffff00" },
    }),
  ],
});
// const somco_renderer = new SimpleRenderer({
//   symbol: new SimpleLineSymbol({
//     color: '#ffff00',
//     width: '2px',
//   }),
// });

const somco_renderer = new SimpleRenderer({
  symbol: line_3d,
});

export const somco_fense_layer = new FeatureLayer({
  portalItem: {
    id: "5c14f6e9e59b40ef87bb4da0f611e5e5",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  title: "SOMCO Fence",
  elevationInfo: {
    mode: "on-the-ground",
  },
  // labelingInfo: [labelChainage],
  // minScale: 150000,
  // maxScale: 0,
  renderer: somco_renderer,
  popupEnabled: false,
});

//---------------------------------------------//
//               Alignment                     //
//---------------------------------------------//
/* Chainage Layer  */
const labelChainage = new LabelClass({
  labelExpressionInfo: { expression: "$feature.KmSpot" },
  symbol: {
    type: "text",
    color: [85, 255, 0],
    haloColor: "black",
    haloSize: 0.5,
    font: {
      size: 15,
      weight: "bold",
    },
  },
});

const chainageRenderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 5,
    color: [255, 255, 255, 0.9],
    outline: {
      width: 0.2,
      color: "black",
    },
  }),
});

export const chainageLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  title: "Chainage",
  elevationInfo: {
    mode: "relative-to-ground",
  },
  labelingInfo: [labelChainage],
  minScale: 150000,
  maxScale: 0,
  renderer: chainageRenderer,

  popupEnabled: false,
});

/* Station Box */
const stationBoxRenderer = new UniqueValueRenderer({
  field: "Layer",
  uniqueValueInfos: [
    {
      value: "00_Platform",
      label: "Platform",
      symbol: new SimpleFillSymbol({
        color: [160, 160, 160],
        style: "backward-diagonal",
        outline: {
          width: 1,
          color: "black",
        },
      }),
    },
    {
      value: "00_Platform 10car",
      label: "Platform 10car",
      symbol: new SimpleFillSymbol({
        color: [104, 104, 104],
        style: "cross",
        outline: {
          width: 1,
          color: "black",
          style: "short-dash",
        },
      }),
    },
    {
      value: "00_Station",
      label: "Station Box",
      symbol: new SimpleFillSymbol({
        color: [0, 0, 0, 0],
        outline: {
          width: 2,
          color: [115, 0, 0],
        },
      }),
    },
  ],
});

export const stationBoxLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 7,
  renderer: stationBoxRenderer,
  minScale: 150000,
  maxScale: 0,
  title: "Station Box",

  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* ROW Layer */
const prowRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#ff0000",
    width: "2px",
  }),
});

export const prowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/SC_Alignment/FeatureServer/5",
  layerId: 5,
  title: "PROW",
  popupEnabled: false,
  renderer: prowRenderer,
});
// prowLayer.listMode = "hide";

/* ROW Layer version 7.1.6 */
const prowoldRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#DF00FF",
    width: "2px",
    // style: "long-dash-dot",
  }),
});

export const prowLayerold = new FeatureLayer({
  portalItem: {
    id: "84ba987eed264fe9b18938000ddf702d",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  title: "SC Alignment 7.1.6",
  definitionExpression: "Version = 'v.7.1.6b'",
  popupEnabled: false,
  renderer: prowoldRenderer,
});

/* ROW Layer version 3.9.3 */
const prowold2renderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#ffc800",
    width: "2px",
    // style: "long-dash-dot",
  }),
});

export const prowLayerold2 = new FeatureLayer({
  portalItem: {
    id: "84ba987eed264fe9b18938000ddf702d",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  title: "SC Alignment 3.9.3",
  definitionExpression: "Version = 'v.3.9.3'",
  popupEnabled: false,
  renderer: prowold2renderer,
});

/* Meralco site 1 additioinal PROW Layer */

export const meralco_site1_prowLayer = new FeatureLayer({
  portalItem: {
    id: "87ec32eacf194b91b040ca052574234b",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  title: "Meralco Site 1 Additional PROW",
  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
  renderer: prowRenderer,
});

/*------- NGCP Layers ---------- */
/* NGCP Working Area */
const ngcpPoleWARenderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: [197, 0, 255],
    style: "backward-diagonal",
    outline: {
      color: "#C500FF",
      width: 0.7,
    },
  }),
});

// export const ngcp_working_area7 = new FeatureLayer({
//   portalItem: {
//     id: "b7d01020d54c4015ba0ba9454475d1dc",
//     portal: {
//       url: "https://gis.railway-sector.com/portal",
//     },
//   },
//   renderer: ngcpPoleWARenderer,
//   elevationInfo: {
//     mode: "on-the-ground",
//   },
//   definitionExpression: "SiteNo = '7'",
//   layerId: 7,
//   title: "Proposed Pole Working Areas",
// });

export const ngcp_working_area6 = new FeatureLayer({
  portalItem: {
    id: "b7d01020d54c4015ba0ba9454475d1dc",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  renderer: ngcpPoleWARenderer,
  elevationInfo: {
    mode: "on-the-ground",
  },
  definitionExpression: "SiteNo = '6'",
  layerId: 7,
  title: "Proposed Pole Working Areas",
});

/* NGCP Line  */
const bufferColor = ["#55FF00", "#FFFF00", "#E1E1E1"];
const ngcpLineRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: bufferColor[0],
    width: "3px",
    style: "dash",
  }),
});

export const ngcp_line7 = new FeatureLayer({
  portalItem: {
    id: "b7d01020d54c4015ba0ba9454475d1dc",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "on-the-ground",
  },
  renderer: ngcpLineRenderer,
  definitionExpression: "SiteNo = '7' AND LAYER = 2", // 2 is 'Relocation'
  layerId: 2,
  title: "Proposed/Recorded NGCP Lines",
});

export const ngcp_line6 = new FeatureLayer({
  portalItem: {
    id: "b7d01020d54c4015ba0ba9454475d1dc",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "on-the-ground",
  },
  renderer: ngcpLineRenderer,
  definitionExpression: "SiteNo = '6' AND LAYER = 2",
  layerId: 2,
  title: "Proposed/Recorded NGCP Lines",
});

/* NGCP Pole site */
const label_ngcp_pole = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: {
          color: [255, 255, 0],
        },
        size: 15,
        halo: {
          color: "black",
          size: 0.5,
        },
        // font: {
        //   family: 'Ubuntu Mono',
        //   //weight: "bold"
        // },
      }),
    ],
    verticalOffset: {
      screenLength: 30,
      maxWorldLength: 20,
      minWorldLength: 10,
    },

    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: [128, 128, 128, 0.5],
      size: 0.2,
      border: {
        color: "grey",
      },
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "$feature.POLE_ID",
    //value: "{TEXTSTRING}"
  },
});

const ngcpDpwhRoadRenderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: [255, 255, 0],
    style: "backward-diagonal",
    outline: {
      color: "#FFFF00",
      width: 0.7,
    },
  }),
});

export const ngcp_pole7 = new FeatureLayer({
  portalItem: {
    id: "d5b30a79bdae40c492771ec1e46ab0e9",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  definitionExpression: "SiteNo = '7'",
  layerId: 3,
  renderer: ngcpDpwhRoadRenderer,
  labelingInfo: [label_ngcp_pole],
  elevationInfo: {
    mode: "on-the-ground",
  },
  popupEnabled: true,
  title: "Proposed Pole Relocation",
});

export const ngcp_pole6 = new FeatureLayer({
  portalItem: {
    id: "d5b30a79bdae40c492771ec1e46ab0e9",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  definitionExpression: "SiteNo = '6'",
  layerId: 3,
  renderer: ngcpDpwhRoadRenderer,
  labelingInfo: [label_ngcp_pole],
  elevationInfo: {
    mode: "on-the-ground",
  },
  popupEnabled: true,
  title: "Proposed Pole Relocation",
});

/* PROW for SC Tunnel Alignment */
const prow_tunnel_renderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#ff0000",
    width: "3px",
    style: "dash",
  }),
});

export const prow_tunnelLayer = new FeatureLayer({
  portalItem: {
    id: "63605177aec648e5b3ad232d2b181874",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "on-the-ground",
  },
  renderer: prow_tunnel_renderer,
  popupEnabled: false,
  title: "PROW for Tunnel Alignment",
});

/* Station Layer */
const labelClass = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: {
          color: "#d4ff33",
        },
        size: 15,
        halo: {
          color: "black",
          size: 0.5,
        },
        // font: {
        //   family: 'Ubuntu Mono',
        //   //weight: "bold"
        // },
      }),
    ],
    verticalOffset: {
      screenLength: 100,
      maxWorldLength: 700,
      minWorldLength: 80,
    },

    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: [128, 128, 128, 0.5],
      size: 0.2,
      border: {
        color: "grey",
      },
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "$feature.Station",
    //value: "{TEXTSTRING}"
  },
});

export const stationLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 6,
  title: "SC Stations",
  labelingInfo: [labelClass],
  elevationInfo: {
    mode: "relative-to-ground",
  },
});
stationLayer.listMode = "hide";

/* Pier Head and Column */
const pHeight = 0;

const pierColumn = new PolygonSymbol3D({
  symbolLayers: [
    new ExtrudeSymbol3DLayer({
      size: pHeight + 10,
      material: {
        color: [78, 78, 78, 0.5],
      },
      edges: new SolidEdges3D({
        color: "#4E4E4E",
        size: 0.3,
      }),
    }),
  ],
});

const pileCap = new PolygonSymbol3D({
  symbolLayers: [
    new ExtrudeSymbol3DLayer({
      size: pHeight + 3,
      material: {
        color: [200, 200, 200, 0.7],
      },
      edges: new SolidEdges3D({
        color: "#4E4E4E",
        size: 1.0,
      }),
    }),
  ],
});

const pierHeadRenderer = new UniqueValueRenderer({
  // defaultSymbol: new PolygonSymbol3D({
  //   symbolLayers: [
  //     {
  //       type: "extrude",
  //       size: 5, // in meters
  //       material: {
  //         color: "#E1E1E1",
  //       },
  //       edges: new SolidEdges3D({
  //         color: "#4E4E4E",
  //         size: 1.0,
  //       }),
  //     },
  //   ],
  // }),
  // defaultLabel: "Other",
  field: "Layer",
  legendOptions: {
    title: "Pile Cap/Column",
  },
  uniqueValueInfos: [
    {
      value: "Pier_Column",
      symbol: pierColumn,
      label: "Column",
    },
    /*
  {
    value: "Pier_Head",
    symbol: pierHead,
    label: "Pier Head"
  },
  */
    {
      value: "Pile_Cap",
      symbol: pileCap,
      label: "Pile Cap",
    },
  ],
});

export const pierHeadColumnLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 4,
  title: "Pile Cap/Column",
  definitionExpression: "Layer <> 'Pier_Head'",

  minScale: 150000,
  maxScale: 0,
  renderer: pierHeadRenderer,
  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});
// pierHeadColumnLayer.listMode = "hide";

/* Pier Access Point  */
const defaultPierAccessLabel = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: {
          color: valueLabelColor,
        },
        size: 15,
        font: {
          family: "Ubuntu Mono",
          weight: "bold",
        },
      }),
    ],
    verticalOffset: {
      screenLength: 80,
      maxWorldLength: 500,
      minWorldLength: 30,
    },
    callout: {
      type: "line",
      size: 0.5,
      color: [0, 0, 0],
      border: {
        color: [255, 255, 255, 0.7],
      },
    },
  }),
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
    //'DefaultValue($feature.GeoTechName, "no data")'
    //"IIF($feature.Score >= 13, '', '')"
    //value: "{Type}"
  },
  labelPlacement: "above-center",
  // where: 'AccessDate IS NULL',
});

export const pierAccessLayer = new FeatureLayer(
  {
    portalItem: {
      id: "e09b9af286204939a32df019403ef438",
      portal: {
        url: "https://gis.railway-sector.com/portal",
      },
    },
    layerId: 3,
    labelingInfo: [defaultPierAccessLabel], // [pierAccessReadyDateLabel, pierAccessNotYetLabel, pierAccessDateMissingLabel], //[pierAccessDateMissingLabel, pierAccessReadyDateLabel, pierAccessNotYetLabel],
    title: "Pier Number", //'Pier with Access Date',
    minScale: 150000,
    maxScale: 0,
    popupEnabled: false,
    elevationInfo: {
      mode: "on-the-ground",
    },
  },
  //{ utcOffset: 300 },
);

const cp_break_line_renderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#4ce600",
    width: "2px",
  }),
});
export const cp_break_lines = new FeatureLayer({
  portalItem: {
    id: "1a2be501a0f54e048a7200e482eb0dd5",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  title: "CP Break Line",
  renderer: cp_break_line_renderer,
  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* For SC Substation */
const scSubstationRenderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: [115, 178, 255],
    style: "backward-diagonal",
    outline: {
      color: "#004DA8",
      width: 1.5,
    },
  }),
});

export const substationLayer = new FeatureLayer({
  portalItem: {
    id: "fd0fd77c428b4fae8f47ac46b26614ec",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 61,
  renderer: scSubstationRenderer,
  popupEnabled: false,
  labelsVisible: false,
  title: "Substation",
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* For SC Future Track */
const scFutureTrack = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#C2C7FC",
    width: "3px",
    style: "solid",
  }),
});

export const scFutureTrackLayer = new FeatureLayer({
  portalItem: {
    id: "a0ec0ab1c19c4927b0934b524e398a6a",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 64,
  renderer: scFutureTrack,
  popupEnabled: false,
  labelsVisible: false,
  title: "Future Track",
  elevationInfo: {
    mode: "on-the-ground",
  },
});

const maintenanceRoadRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#d9dddc",
    width: "3px",
    style: "dash",
  }),
});

export const maintenanceRoadLayer = new FeatureLayer({
  portalItem: {
    id: "4309e01d87694a789675cc925425f588",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  renderer: maintenanceRoadRenderer,
  title: "SC Maintenance Road",
  elevationInfo: {
    mode: "on-the-ground",
  },
});

//---------------------------------------------//
//           Land, Structure, NLO              //
//---------------------------------------------//
/* PNR */
const pnrRenderer = new UniqueValueRenderer({
  field: "OwnershipType",
  uniqueValueInfos: [
    {
      value: 1, // RP
      label: "RP",
      symbol: new SimpleFillSymbol({
        color: [137, 205, 102],
        style: "diagonal-cross",
        outline: {
          width: 0.5,
          color: "black",
        },
      }),
    },
    {
      value: 2, // PNR
      label: "PNR",
      symbol: new SimpleFillSymbol({
        color: [137, 205, 102],
        style: "diagonal-cross",
        outline: {
          width: 0.5,
          color: "black",
        },
      }),
    },
  ],
});

export const pnrLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  title: "Land (Excluded for Acquisition)",
  definitionExpression: "OwnershipType IN (1, 2)",
  elevationInfo: {
    mode: "on-the-ground",
  },
  labelsVisible: false,
  renderer: pnrRenderer,
  popupTemplate: {
    title: "<div style='color: #eaeaea'>{LandOwner} ({LotID})</div>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "OwnershipType",
            label: "Ownership Type",
          },
          {
            fieldName: "HandOverDate",
            label: "Hand-Over Date",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "Barangay",
          },
          {
            fieldName: "LandOwner",
            label: "Land Owner",
          },
        ],
      },
    ],
  },
});

/* The colors used for the each transit line */
const lotIdLabel = new LabelClass({
  labelExpressionInfo: { expression: "$feature.LotID" },
  symbol: {
    type: "text",
    color: "black",
    haloColor: "white",
    haloSize: 0.5,
    font: {
      size: 11,
      weight: "bold",
    },
  },
});

export const lotDefaultSymbol = new SimpleFillSymbol({
  color: [0, 0, 0, 0],
  style: "solid",
  outline: {
    // autocasts as new SimpleLineSymbol()
    color: [110, 110, 110],
    width: 0.7,
  },
});

export const uniqueValueInfosLotStatus = lotStatusLabel.map(
  (status: any, index: any) => {
    return Object.assign({
      value: index + 1,
      label: status,
      symbol: new SimpleFillSymbol({
        color: lotStatusColor[index],
      }),
    });
  },
);
const lotLayerRenderer = new UniqueValueRenderer({
  field: lotStatusField,
  defaultSymbol: lotDefaultSymbol, // autocasts as new SimpleFillSymbol()
  uniqueValueInfos: uniqueValueInfosLotStatus,
});

// Custom popup for lot layer
const customContentLot = new CustomContent({
  outFields: ["*"],
  creator: (event: any) => {
    // Extract AsscessDate of clicked pierAccessLayer
    const handedOverDate = event.graphic.attributes[lotHandedOverDateField];
    const handOverArea = event.graphic.attributes[percentHandedOverField];
    const statusLot = event.graphic.attributes[lotStatusField];
    const landUse = event.graphic.attributes[landUseField];
    const municipal = event.graphic.attributes[municipalityField];
    const barangay = event.graphic.attributes[barangayField];
    const landOwner = event.graphic.attributes[landOwnerField];
    const cpNo = event.graphic.attributes[cpField];
    const endorse = event.graphic.attributes[endorsedField];
    const endorsed = endorsedStatus[endorse];

    let daten: any;
    let date: any;
    if (handedOverDate) {
      daten = new Date(handedOverDate);
      const year = daten.getFullYear();
      const month = daten.getMonth() + 1;
      const day = daten.getDate();
      date = `${year}-${month}-${day}`;
    } else {
      date = "Undefined";
    }
    // Convert numeric to date format 0
    //const daten = new Date(handedOverDate);
    //const date = dateFormat(daten, 'MM-dd-yyyy');
    //<li>Hand-Over Date: <b>${date}</b></li><br>

    return `
    <div style='color: #eaeaea'>
    <ul><li>Handed-Over Area:  <span style="color: #d9dc00ff; font-weight: bold">${handOverArea} %</span></li>
    <li>Handed-Over Date:  <span style="color: #d9dc00ff; font-weight: bold">${date}</span></li>
              <li>Status:            <span style="color: #d9dc00ff; font-weight: bold">${
                statusLot >= 0 ? lotStatusLabel[statusLot - 1] : ""
              }</span></li>
              <li>Land Use:          <span style="color: #d9dc00ff; font-weight: bold">${
                landUse >= 1 ? lotUseArray[landUse - 1] : ""
              }</span></li>
              <li>Municipality:     <span style="color: #d9dc00ff; font-weight: bold">${municipal}</span></li>
              <li>Barangay:          <span style="color: #d9dc00ff; font-weight: bold">${barangay}</span></li>
              <li>Land Owner:        <span style="color: #d9dc00ff; font-weight: bold">${landOwner}</span></li>
              <li>CP:                <span style="color: #d9dc00ff; font-weight: bold">${cpNo}</span></li>
              <li>Endorsed:          <span style="color: #d9dc00ff; font-weight: bold">${endorsed}</span></li></ul>
              </div>
              `;
  },
});

const templateLot = new PopupTemplate({
  title: "<div style='color: #eaeaea'>Lot No.: <b>{LotID}</b></div>",
  lastEditInfoEnabled: false,
  content: [customContentLot],
});

export const lotLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  labelingInfo: [lotIdLabel],
  renderer: lotLayerRenderer,
  popupTemplate: templateLot,
  title: "Land Acquisition",
  minScale: 30000,
  maxScale: 0,
  //labelsVisible: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* Optmized lots for NSCR-Ex Passenger Line */
const optimizedLotRenderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: "#bbbbbb",
    style: "diagonal-cross",
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: "#FF5733", // [0, 255, 255, 1],
      width: "6px",
    },
  }),
});

export const optimizedLots_passengerLineLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  definitionExpression: "OptLotsIIA_NoT = 1",
  labelingInfo: [lotIdLabel],
  renderer: optimizedLotRenderer,
  popupTemplate: templateLot,
  title: "Optimized Lots with Issued Notice of Taking",
  minScale: 150000,
  maxScale: 0,
  //labelsVisible: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* Studied Lots of NSCR-Ex Freight Line for Optimization */
const studiedLotRenderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: "#808080",
    style: "horizontal",
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: "#808080", //#DF73FF,
      width: "6px",
    },
  }),
});

export const studiedLots_optimizationLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  definitionExpression: "OptLotsIIB = 1",
  labelingInfo: [lotIdLabel],
  renderer: studiedLotRenderer,
  popupTemplate: templateLot,
  title: "Candidate Lots of NSCR-Ex Passenger & Freight Line for Optimization",
  minScale: 150000,
  maxScale: 0,
  //labelsVisible: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* Handed-Over Lot (public + private) */
const handedOverLotRenderer = new UniqueValueRenderer({
  valueExpression:
    "When($feature.HandedOver == 1 && $feature.StatusLA != 8, 'Handed-Over', 'others')",
  uniqueValueInfos: [
    {
      value: "Handed-Over",
      label: "Handed-Over",
      symbol: new SimpleFillSymbol({
        color: [0, 255, 255, 0.3],
        outline: new SimpleLineSymbol({
          color: "#00ffff",
          width: "4px",
        }),
      }),
    },
  ],
});

export const handedOverLotLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  definitionExpression: `${lotHandedOverField} = 1 AND ${lotStatusField} <> 8`,
  renderer: handedOverLotRenderer,
  popupEnabled: false,
  labelsVisible: false,
  title: "Handed-Over (public + private)",
  elevationInfo: {
    mode: "on-the-ground",
  },
});
// handedOverLotLayer.listMode = "hide";

const tunnelAffectedLotRenderer = new UniqueValueRenderer({
  field: tunnelAffectLotField,
  uniqueValueInfos: [
    {
      value: 1,
      label: "Tunnel Affected",
      symbol: new SimpleFillSymbol({
        color: [255, 0, 0, 0],
        outline: {
          color: "#00c5ff",
          width: 0.3,
        },
      }),
    },
  ],
});

export const tunnelAffectedLotLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  definitionExpression: `${tunnelAffectLotField} = 1`,
  renderer: tunnelAffectedLotRenderer,
  popupEnabled: false,
  labelsVisible: false,
  title: "Tunnel Affected",
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* contractor accessible layer */
const accessible_renderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: "purple",
    // style: 'cross',
    style: "solid",

    outline: {
      width: 1,
      color: "black",
    },
  }),
});
export const accessibleLotAreaLayer = new FeatureLayer({
  portalItem: {
    id: "4692e76be5804db2b38c23df86c7eaa8",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },

  renderer: accessible_renderer,
  title: "Handed-Over Area",
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* Structure Layer */
const height = 5;
const edgeSize = 0.3;

const defaultStructureRenderer = new PolygonSymbol3D({
  symbolLayers: [
    new ExtrudeSymbol3DLayer({
      size: 5,
      material: {
        color: [0, 0, 0, 0.4],
      },
      edges: new SolidEdges3D({
        color: "#4E4E4E",
        size: edgeSize,
      }),
    }),
  ],
});

const uniqueValueInfosStrucStatus = structureStatusLabel.map(
  (status: any, index: any) => {
    return Object.assign({
      value: index + 1,
      symbol: new PolygonSymbol3D({
        symbolLayers: [
          new ExtrudeSymbol3DLayer({
            size: height,
            material: {
              color: structureStatusColorRgb[index],
            },
            edges: new SolidEdges3D({
              color: "#4E4E4E",
              size: edgeSize,
            }),
          }),
        ],
      }),
      label: status,
    });
  },
);
const structureRenderer = new UniqueValueRenderer({
  defaultSymbol: defaultStructureRenderer,
  defaultLabel: "Other",
  field: structureStatusField,
  uniqueValueInfos: uniqueValueInfosStrucStatus,
});

export const structureLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  title: "Structure",
  renderer: structureRenderer,

  elevationInfo: {
    mode: "on-the-ground",
  },
  popupTemplate: {
    title: "<div style='color: #eaeaea'>{StrucID}</div>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "StrucOwner",
            label: "Structure Owner",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "Barangay",
          },
          {
            fieldName: "StatusStruc",
            label: "<p>Status for Structure</p>",
          },
          {
            fieldName: "Name",
          },
          {
            fieldName: "Status",
            label: "Households Ownership (structure) ",
          },
        ],
      },
    ],
  },
});

// NLO Layer
const symbolSize = 30;

const uniqueValueInfosNlo = nloStatusLabel.map((status: any, index: any) => {
  return Object.assign({
    value: index + 1,
    label: status,
    symbol: new PointSymbol3D({
      symbolLayers: [
        new IconSymbol3DLayer({
          resource: {
            href: nloStatusSymbolRef[index],
          },
          size: symbolSize,
          outline: {
            color: "white",
            size: 2,
          },
        }),
      ],
    }),
  });
});
const nloRenderer = new UniqueValueRenderer({
  field: nloStatusField,
  uniqueValueInfos: uniqueValueInfosNlo,
});

export const nloLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 3,
  renderer: nloRenderer,

  title: "Households",
  elevationInfo: {
    mode: "relative-to-scene",
  },
  minScale: 10000,
  maxScale: 0,
  popupTemplate: {
    title: "<div style='color: #eaeaea'>{StrucID}</div>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "StrucOwner",
            label: "Structure Owner",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "Barangay",
          },
          {
            fieldName: "StatusRC",
            label: "<p>Status for Relocation</p>",
          },
          {
            fieldName: "Name",
          },
          {
            fieldName: "Status",
            label: "Households Ownership (structure) ",
          },
        ],
      },
    ],
  },
});

/* Structure Ownership Layer */
const uniqueValueInfosStrucOwnership = structureOwnershipStatusLabel.map(
  (status: any, index: any) => {
    return Object.assign({
      value: index + 1,
      label: status,
      symbol: new SimpleFillSymbol({
        style: "forward-diagonal",
        color: structureOwnershipColor[index],
        outline: {
          color: "#6E6E6E",
          width: 0.3,
        },
      }),
    });
  },
);
const structureOwnershipRenderer = new UniqueValueRenderer({
  field: structureOwnershipStatusField,
  uniqueValueInfos: uniqueValueInfosStrucOwnership,
});

export const strucOwnershipLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  renderer: structureOwnershipRenderer,
  layerId: 2,
  title: "Households Ownership (Structure)",

  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* Occupancy (Status of Relocation) */
const verticalOffsetExistingOccupancy = {
  screenLength: 10,
  maxWorldLength: 10,
  minWorldLength: 10,
};
const occupancyPointSize = 20;

const uniqueValueInfosOccupancy = structureOccupancyStatusLabel.map(
  (status: any, index: any) => {
    return Object.assign({
      value: index,
      label: status,
      symbol: new PointSymbol3D({
        symbolLayers: [
          new IconSymbol3DLayer({
            resource: {
              href: structureOccupancyRef[index],
            },
            size: occupancyPointSize,
            outline: {
              color: "white",
              size: 2,
            },
          }),
        ],
        verticalOffset: verticalOffsetExistingOccupancy,

        callout: {
          type: "line", // autocasts as new LineCallout3D()
          color: [128, 128, 128, 0.6],
          size: 0.4,
          border: {
            color: "grey",
          },
        },
      }),
    });
  },
);

const occupancyRenderer = new UniqueValueRenderer({
  field: structureOccupancyStatusField,
  uniqueValueInfos: uniqueValueInfosOccupancy,
});

export const occupancyLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 4,

  title: "Occupancy (Structure)",
  renderer: occupancyRenderer,
  elevationInfo: {
    mode: "relative-to-scene",
  },
  popupTemplate: {
    title: "<div style='color: #eaeaea'>{StrucID}</div>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "StrucOwner",
            label: "Structure Owner",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "Barangay",
          },
          {
            fieldName: "Occupancy",
            label: "<p>Status for Relocation(structure)</p>",
          },
          {
            fieldName: "Name",
          },
          {
            fieldName: "Status",
            label: "Households Ownership",
          },
        ],
      },
    ],
  },
});

// Group layers //
export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [
    stationBoxLayer,
    chainageLayer,
    prow_tunnelLayer,
    cp_break_lines,
    pierHeadColumnLayer,
    substationLayer,
    scFutureTrackLayer,
    meralco_site1_prowLayer,
    prowLayerold,
    prowLayerold2,
    prowLayer,
  ],
}); //map.add(alignmentGroupLayer, 0);

export const nloLoOccupancyGroupLayer = new GroupLayer({
  title: "Households Occupancy",
  visible: true,
  visibilityMode: "independent",
  layers: [occupancyLayer, strucOwnershipLayer, nloLayer],
});

export const lotGroupLayer = new GroupLayer({
  title: "Land",
  visible: true,
  visibilityMode: "independent",
  layers: [
    lotLayer,
    optimizedLots_passengerLineLayer,
    studiedLots_optimizationLayer,
    tunnelAffectedLotLayer,
    pnrLayer,
    accessibleLotAreaLayer,
  ],
});

export const ngcp6_groupLayer = new GroupLayer({
  title: "NGCP Site 6",
  visible: false,
  visibilityMode: "independent",
  layers: [ngcp_line6, ngcp_pole6, ngcp_working_area6],
});

export const ngcp7_groupLayer = new GroupLayer({
  title: "NGCP Site 7",
  visible: false,
  // listMode: 'hide-children',
  visibilityMode: "independent",
  // layers: [ngcp_line7, ngcp_pole7, ngcp_working_area7],
  layers: [ngcp_line7, ngcp_pole7],
});

//---------------------------------------------//
//        Tree Cutting & Compensation          //
//---------------------------------------------//
/* Tree cutting layer */
const treeCutting3DSymbol = (name: any) => {
  return new WebStyleSymbol({
    name: name,
    styleName: "EsriThematicTreesStyle",
  });
};

const treeCuttingRenderer = new UniqueValueRenderer({
  field: "Status",
  uniqueValueInfos: [
    {
      value: 1,
      label: "Cut/Earthballed",
      symbol: treeCutting3DSymbol("Larix"),
    },
    {
      value: 2,
      label: "Permit Acquired",
      symbol: treeCutting3DSymbol("Larix"),
    },
    {
      value: 3,
      label: "Submitted to DENR",
      symbol: treeCutting3DSymbol("Larix"),
    },
    {
      value: 4,
      label: "Ongoing Acquisition of Application Documents",
      symbol: treeCutting3DSymbol("Larix"),
    },
  ],
  visualVariables: [
    new SizeVariable({
      axis: "height",
      // field: 'SIZE',
      valueExpression: "When($feature.Status >= 1, 5, 0)",
      valueUnit: "meters",
    }),
    new ColorVariable({
      valueExpression: "$feature.Status",
      valueExpressionTitle: "Status Color",
      stops: [
        { value: 1, color: "#71AB48" },
        { value: 2, color: "#FFFF00" },
        { value: 3, color: "#FFAA00" },
        { value: 4, color: "#FF0000" },
      ],
      legendOptions: {
        title: "",
        showLegend: false,
      },
    }),
  ],
});

export const treeCuttingLayer = new FeatureLayer({
  portalItem: {
    id: "dfd0bca99c754002b55459004b684415",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  elevationInfo: {
    mode: "on-the-ground",
  },

  title: "Tree Cutting",
  renderer: treeCuttingRenderer,
  popupTemplate: {
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "ScientificName",
            label: "Scientific Name",
          },
          {
            fieldName: "CommonName",
            label: "Common Name",
          },
          {
            fieldName: "Province",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "TreeNo",
            label: "Tree No.",
          },
          {
            fieldName: "CP",
            label: "<h5>CP</h5>",
          },
          {
            fieldName: "Compensation",
            label: "Status of Tree Compensation",
          },
          {
            fieldName: "Conservation",
            label: "Conservation Status",
          },
        ],
      },
    ],
  },
});

/* Tree compensation layer */
const treeCompensationRenderer = new UniqueValueRenderer({
  field: "Compensation",
  uniqueValueInfos: [
    {
      value: 1,
      label: "Non-Compensable",
      symbol: treeCutting3DSymbol("Larix"),
    },
    {
      value: 2,
      label: "For Processing",
      symbol: treeCutting3DSymbol("Larix"),
    },
    {
      value: 3,
      label: "Compensated",
      symbol: treeCutting3DSymbol("Larix"),
    },
  ],
  visualVariables: [
    new SizeVariable({
      axis: "height",
      valueExpression: "When($feature.Compensation >= 1, 5, 0)",
      valueUnit: "meters",
    }),
    new ColorVariable({
      valueExpression: "$feature.Compensation",
      valueExpressionTitle: "Status Color",
      legendOptions: {
        title: "",
        showLegend: false,
      },
      stops: [
        { value: 1, color: "#0070FF" },
        { value: 2, color: "#FFFF00" },
        { value: 3, color: "#71AB48" },
      ],
    }),
  ],
});

export const treeCompensationLayer = new FeatureLayer({
  portalItem: {
    id: "dfd0bca99c754002b55459004b684415",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,

  title: "Tree Compensation",
  renderer: treeCompensationRenderer,
  popupTemplate: {
    title: "<div style='color: #eaeaea'>{Compensation}</div>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "ScientificName",
            label: "Scientific Name",
          },
          {
            fieldName: "CommonName",
            label: "Common Name",
          },
          {
            fieldName: "Province",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "TreeNo",
            label: "Tree No.",
          },
          {
            fieldName: "CP",
            label: "<h5>CP</h5>",
          },
          {
            fieldName: "Status",
            label: "Status of Tree Cutting",
          },
          {
            fieldName: "Conservation",
            label: "Conservation Status",
          },
        ],
      },
    ],
  },
});

export const treeGroupLayer = new GroupLayer({
  title: "Tree Cutting & Compensation",
  visible: false,
  visibilityMode: "exclusive",
  layers: [treeCompensationLayer, treeCuttingLayer],
});

//---------------------------------------------//
//           Utility Relocation                //
//---------------------------------------------//
// * Utility Point * //
// * Utility Point * //
function customSymbol3D(name: string) {
  return new WebStyleSymbol({
    //portal: 'https://www.maps.arcgis.com',
    // IMPORTANT: Your browser needs to be able to open the following link. It will say insecure so need to go to advanced.
    styleUrl:
      "https://www.maps.arcgis.com/sharing/rest/content/items/c04d4d4145f64f8fa38407dd5331dd1f/data",
    name: name,
  });
}

function utilPtSymbolInfra(name: string) {
  return new WebStyleSymbol({
    name: name,
    styleName: "EsriInfrastructureStyle",
  });
}

function utilPtSymbolStreet(name: string) {
  return new WebStyleSymbol({
    name: name,
    styleName: "EsriRealisticStreetSceneStyle",
  });
}

const verticalOffsetRelocation = {
  screenLength: 10,
  maxWorldLength: 30,
  minWorldLength: 35,
};

// Function that automatically creates the symbol for the points of interest
function getUniqueValueSymbol(name: string, color: any, sizeS: number) {
  return new PointSymbol3D({
    symbolLayers: [
      new IconSymbol3DLayer({
        resource: {
          href: name,
        },
        size: sizeS,
        outline: {
          color: color,
          size: 2,
        },
      }),
    ],

    verticalOffset: verticalOffsetRelocation,

    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: [128, 128, 128, 0.1],
      size: 0.2,
      border: {
        color: "grey",
      },
    },
  });
}

const utilPointSymbolRenderer = new UniqueValueRenderer({
  valueExpression:
    // eslint-disable-next-line no-multi-str
    "When($feature.UtilType2 == 1, 'Telecom Pole (BTS)', \
                          $feature.UtilType2 == 2, 'Telecom Pole (CATV)', \
                          $feature.UtilType2 == 3, 'Water Meter', \
                          $feature.UtilType2 == 4, 'Water Valve', \
                          $feature.UtilType2 == 5, 'Manhole', \
                          $feature.UtilType2 == 6, 'Drain Box', \
                          $feature.UtilType2 == 7, 'Electric Pole', \
                          $feature.UtilType2 == 8, 'Street Light', \
                          $feature.UtilType2 == 9, 'Junction Box', \
                          $feature.UtilType2 == 10, 'Coupling', \
                          $feature.UtilType2 == 11, 'Fitting', \
                          $feature.UtilType2 == 12, 'Transformer', \
                          $feature.UtilType2 == 13, 'Truss Guy', \
                          $feature.UtilType2 == 14, 'Concrete Pedestal', \
                          $feature.UtilType2 == 15, 'Ground', \
                          $feature.UtilType2 == 16, 'Down Guy', \
                          $feature.UtilType2 == 17, 'Entry/Exit Pit', \
                          $feature.UtilType2 == 18, 'Handhole', \
                          $feature.UtilType2 == 19, 'Transmission Tower', \
                          $feature.UtilType)",
  uniqueValueInfos: [
    {
      value: "Telecom Pole (BTS)",
      symbol: customSymbol3D("3D_Telecom_BTS"),
    },
    {
      value: "Telecom Pole (CATV)",
      symbol: customSymbol3D("3D_TelecomCATV_Pole"),
    },
    {
      value: "Manhole",
      symbol: utilPtSymbolStreet("Storm_Drain"),
    },
    {
      value: "Electric Pole",
      //symbol: utilPtSymbolInfra("Powerline_Pole")
      symbol: customSymbol3D("3D_Electric_Pole"),
    },
    {
      value: "Street Light",
      symbol: utilPtSymbolStreet("Overhanging_Street_and_Sidewalk_-_Light_on"),
    },
    {
      value: "Junction Box",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Coupling",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Fitting",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Transformer",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Truss Guy",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Concrete Pedestal",
      symbol: customSymbol3D("Concrete Pedestal"),
    },
    {
      value: "Ground",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Down Guy",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Entry/Exit Pit",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Handhole",
      symbol: customSymbol3D("3D_Drain_Box"),
    },
    {
      value: "Transmission Tower",
      symbol: utilPtSymbolInfra("Powerline_Pole"),
    },
  ],
  visualVariables: [
    new SizeVariable({
      axis: "height",
      field: "SIZE",
      valueUnit: "meters",
    }),
    new RotationVariable({
      field: "ROTATION",
    }),
  ],
});

export const utilityPointLayer = new FeatureLayer({
  portalItem: {
    id: "b7d01020d54c4015ba0ba9454475d1dc",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  title: "Point Symbol",
  // outFields: ['*'],
  renderer: utilPointSymbolRenderer,
  elevationInfo: {
    mode: "relative-to-ground", // original was "relative-to-scene"
    featureExpressionInfo: {
      expression: "$feature.Height",
    },
    unit: "meters",
    //offset: 0
  },
  popupTemplate: {
    title: "<div style='color: #eaeaea'>{comp_agency}</div>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Id",
          },
          {
            fieldName: "UtilType",
            label: "Utility Type",
          },
          {
            fieldName: "UtilType2",
            label: "Utility Name",
          },
          {
            fieldName: "LAYER",
            label: "<h5>Action</h5>",
          },
          {
            fieldName: "Status",
            label: "<h5>Status</h5>",
          },
          {
            fieldName: "CP",
          },
          {
            fieldName: "Remarks",
          },
        ],
      },
    ],
  },
});

const utilityStatusRenderer = new UniqueValueRenderer({
  valueExpression:
    // eslint-disable-next-line no-multi-str
    "When($feature.Remarks == 'pending', 'NoAction', \
                          $feature.Status == 1 && $feature.LAYER == 1, 'DemolishComplete',\
                          $feature.Status == 0 && $feature.LAYER == 1, 'DemolishIncomplete',\
                          $feature.Status == 0 && $feature.LAYER == 2, 'RelocIncomplete', \
                          $feature.Status == 1 && $feature.LAYER == 2, 'RelocComplete', \
                          $feature.Status == 0 && $feature.LAYER == 3, 'NewlyAdded', \
                          $feature.Status == 1 && $feature.LAYER == 3, 'NewlyAddedComplete',$feature.Comp_Agency)",
  uniqueValueInfos: [
    {
      value: "DemolishIncomplete",
      label: "To be Demolished",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Demolished.png",
        "#D13470",
        20,
      ),
    },
    {
      value: "DemolishComplete",
      label: "Demolision Completed",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/DemolishComplete_v2.png",
        "#D13470",
        25,
      ),
    },
    {
      value: "RelocIncomplete",
      label: "Proposed Relocation",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Relocatd.png",
        "#D13470",
        30,
      ),
    },
    {
      value: "RelocComplete",
      label: "Relocation Completed",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Utility_Relocated_Completed_Symbol.png",
        "#D13470",
        30,
      ),
    },
    {
      value: "NewlyAdded",
      label: "Add New Utility",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/NewlyAdded.png",
        "#D13470",
        35,
      ),
    },
    {
      value: "NewlyAddedComplete",
      label: "Newly Utility Added",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/NewlyAdded_Completed.png",
        "#D13470",
        35,
      ),
    },
    {
      value: "NoAction",
      label: "Require Data Checking",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Unknown_v2.png",
        "#D13470",
        35,
      ),
    },
  ],
});

const utilPointStatusTextSymbol = labelSymbol3DLine({
  materialColor: "white",
  fontSize: 10,
  haloColor: [0, 0, 0, 0.7],
  haloSize: 0.4,
});

const utilPointStatusLabel = new LabelClass({
  labelPlacement: "above-center",
  labelExpressionInfo: {
    //value: "{Company}",
    expression:
      "When($feature.Status >= 0, DomainName($feature, 'Comp_Agency'), '')", //$feature.Comp_Agency
  },
  symbol: utilPointStatusTextSymbol,
});

export const utilityPointLayer1 = new FeatureLayer({
  portalItem: {
    id: "b7d01020d54c4015ba0ba9454475d1dc",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  title: "Point Status",
  // outFields: ['*'],
  renderer: utilityStatusRenderer,
  elevationInfo: {
    mode: "relative-to-ground", // original was "relative-to-scene"
    featureExpressionInfo: {
      expression: "$feature.Height",
    },
    unit: "meters",
    //offset: 0
  },
  labelingInfo: [utilPointStatusLabel],
  popupTemplate: {
    title: "<div style='color: #eaeaea'>{comp_agency}</div>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Id",
          },
          {
            fieldName: "UtilType",
            label: "Utility Type",
          },
          {
            fieldName: "UtilType2",
            label: "Utility Name",
          },
          {
            fieldName: "LAYER",
            label: "<h5>Action</h5>",
          },
          {
            fieldName: "Status",
            label: "<h5>Status</h5>",
          },
          {
            fieldName: "CP",
          },
          {
            fieldName: "Remarks",
          },
        ],
      },
    ],
  },
});

// * Utility Line * //
const utilLineStatusRenderer = new UniqueValueRenderer({
  valueExpression:
    // eslint-disable-next-line no-multi-str
    "When($feature.Remarks == 'pending', 'NoAction', \
                          $feature.Status == 1 && $feature.LAYER == 1, 'DemolishComplete',\
                          $feature.Status == 0 && $feature.LAYER == 1, 'DemolishIncomplete',\
                          $feature.Status == 0 && $feature.LAYER == 2, 'RelocIncomplete', \
                          $feature.Status == 1 && $feature.LAYER == 2, 'RelocComplete', \
                          $feature.Status == 0 && $feature.LAYER == 3, 'NewlyAdded', \
                          $feature.Status == 1 && $feature.LAYER == 3, 'NewlyAddedComplete',$feature.Comp_Agency)",
  //field: "Company",
  uniqueValueInfos: [
    {
      value: "DemolishIncomplete",
      label: "To be Demolished",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Demolished.png",
        "#D13470",
        20,
      ),
    },
    {
      value: "DemolishComplete",
      label: "Demolision Completed",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/DemolishComplete_v2.png",
        "#D13470",
        25,
      ),
    },
    {
      value: "RelocIncomplete",
      label: "Proposed Relocation",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Relocatd.png",
        "#D13470",
        30,
      ),
    },
    {
      value: "RelocComplete",
      label: "Relocation Completed",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Utility_Relocated_Completed_Symbol.png",
        "#D13470",
        30,
      ),
    },
    {
      value: "NewlyAdded",
      label: "Add New Utility",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/NewlyAdded.png",
        "#D13470",
        35,
      ),
    },
    {
      value: "NewlyAddedComplete",
      label: "Newly Utility Added",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/NewlyAdded_Completed.png",
        "#D13470",
        35,
      ),
    },
    {
      value: "NoAction",
      label: "Require Data Checking",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/Unknown_v2.png",
        "#D13470",
        35,
      ),
    },
  ],
});

export const utilityLineLayer = new FeatureLayer({
  portalItem: {
    id: "b7d01020d54c4015ba0ba9454475d1dc",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  title: "Line Symbol", // Relocation PLan?
  elevationInfo: {
    mode: "relative-to-ground", // original was "relative-to-scene"
    featureExpressionInfo: {
      expression: "$feature.height",
    },
    unit: "meters",
    //offset: 0
  },
  // outFields: ['*'],
  popupTemplate: {
    title: "<div style='color: #eaeaea'>{comp_agency}</div>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Id",
          },
          {
            fieldName: "UtilType",
            label: "Utility Type",
          },
          {
            fieldName: "UtilType2",
            label: "Utility Name",
          },
          {
            fieldName: "LAYER",
            label: "<h5>Action</h5>",
          },
          {
            fieldName: "Status",
            label: "<h5>Status</h5>",
          },
          {
            fieldName: "CP",
          },
          {
            fieldName: "Remarks",
          },
        ],
      },
    ],
  },
});

function lineSizeShapeSymbolLayers(
  profile: "circle" | "quad" | undefined,
  cap: "round" | "none" | "butt" | "square" | undefined,
  join: "round" | "miter" | "bevel" | undefined,
  width: number,
  height: number,
  profileRotation: "heading" | "all" | undefined,
  property: number,
) {
  return new LineSymbol3D({
    symbolLayers: [
      new PathSymbol3DLayer({
        profile: profile,
        material: {
          color: utilLineColor[property],
        },
        width: width,
        height: height,
        join: join,
        cap: cap,
        anchor: "bottom",
        profileRotation: profileRotation,
      }),
    ],
  });
}

function renderutilityLineLayer() {
  const renderer = new UniqueValueRenderer({
    field: "utiltype2",
  });

  for (let i = 1; i <= utilLineColor.length; i++) {
    renderer.addUniqueValueInfo({
      value: i,
      symbol: lineSizeShapeSymbolLayers(
        "circle",
        "none",
        "miter",
        0.5,
        0.5,
        "all",
        i - 1,
      ),
    });
  }
  utilityLineLayer.renderer = renderer;
}

renderutilityLineLayer();

const utilLineStatusTextSymbol = labelSymbol3DLine({
  materialColor: "black",
  fontSize: 10,
  haloColor: [255, 255, 255, 0.7],
  haloSize: 0.7,
});

const utilityLineLabelClass = new LabelClass({
  //labelPlacement: 'above-center', // Polyline has not choice
  labelExpressionInfo: {
    expression:
      "When($feature.Status >= 0, DomainName($feature, 'Comp_Agency'), '')",
  },
  symbol: utilLineStatusTextSymbol,
});

export const utilityLineLayer1 = new FeatureLayer({
  portalItem: {
    id: "b7d01020d54c4015ba0ba9454475d1dc",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  title: "Line Status",
  elevationInfo: {
    mode: "relative-to-ground", // original was "relative-to-scene"
    featureExpressionInfo: {
      expression: "$feature.height",
    },
    unit: "meters",
    //offset: 0
  },
  // outFields: ['*'],
  renderer: utilLineStatusRenderer,
  labelingInfo: [utilityLineLabelClass],
  popupTemplate: {
    title: "<div style='color: #eaeaea'>{comp_agency}</div>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Id",
          },
          {
            fieldName: "UtilType",
            label: "Utility Type",
          },
          {
            fieldName: "UtilType2",
            label: "Utility Name",
          },
          {
            fieldName: "LAYER",
            label: "<h5>Action</h5>",
          },
          {
            fieldName: "Status",
            label: "<h5>Status</h5>",
          },
          {
            fieldName: "CP",
          },
          {
            fieldName: "Remarks",
          },
        ],
      },
    ],
  },
});
export const utilityGroupLayer = new GroupLayer({
  title: "Utility Relocation",
  visible: false,
  visibilityMode: "independent",
  layers: [
    utilityLineLayer1,
    utilityLineLayer,
    utilityPointLayer1,
    utilityPointLayer,
  ],
});

//---------------------------------------------//
//                   Viaduct                   //
//---------------------------------------------//
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";

const viaduct_renderer = new UniqueValueRenderer({
  field: "Status",
  uniqueValueInfos: [
    {
      value: 1,
      label: "To be Constructed",
      symbol: new MeshSymbol3D({
        symbolLayers: [
          new FillSymbol3DLayer({
            material: {
              color: [225, 225, 225, 0.1],
              colorMixMode: "replace",
            },
            edges: new SolidEdges3D({
              color: [225, 225, 225, 0.3],
            }),
          }),
        ],
      }),
    },
    {
      value: 2,
      label: "Under Construction",
      symbol: new MeshSymbol3D({
        symbolLayers: [
          new FillSymbol3DLayer({
            material: {
              color: [211, 211, 211, 0.5],
              colorMixMode: "replace",
            },
            edges: new SolidEdges3D({
              color: [225, 225, 225, 0.3],
            }),
          }),
        ],
      }),
    },
    {
      value: 4,
      label: "Completed",
      symbol: new MeshSymbol3D({
        symbolLayers: [
          new FillSymbol3DLayer({
            material: {
              color: [0, 112, 255, 0.8],
              colorMixMode: "replace",
            },
            edges: new SolidEdges3D({
              color: [225, 225, 225, 0.3],
            }),
          }),
        ],
      }),
    },
  ],
});

export const viaductLayer = new SceneLayer({
  portalItem: {
    id: "1f89733a04b443e2a1e0e5e6dfd493e3",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "absolute-height", //absolute-height, relative-to-ground
  },
  title: "Viaduct",
  labelsVisible: false,
  renderer: viaduct_renderer,
  popupTemplate: {
    title: "<div style='color: #eaeaea'>{PierNumber}</div>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Type",
            label: "Type",
          },
          {
            fieldName: "CP",
          },
          {
            // this gives error.. WHY?
            fieldName: "start_actual",
            label: "Construction started",
          },
          {
            fieldName: "uniqueID",
          },
        ],
      },
    ],
  },
});
