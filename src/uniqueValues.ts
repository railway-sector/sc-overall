import Collection from "@arcgis/core/core/Collection";
import ActionButton from "@arcgis/core/support/actions/ActionButton";

export const contractPackage = [
  "All",
  "S-01",
  "S-02",
  "S-03a",
  "S-03b",
  "S-03c",
  "S-04",
  "S-05",
  "S-06",
  "S-07",
];

// month
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Media parameters
export const image_scales = [1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4];
export const img_size = 280;
export const timestamp_field = "timestamp";

// chart width
export const chart_width = "26vw";
export const chart_box_width = 250;

// Updated Dates
export const updatedDateCategoryNames = [
  "Land Acquisition",
  "Structure",
  "Non Land Owner",
  "Utility Relocation",
  "Trees",
  "Viaduct",
];
export const cutoff_days = 30;

//---------------------------------------------//
//        Land, Structure, & NLO               //
//---------------------------------------------//
// Lot fields definitions
export const lotHandOverDateField = "HandOverDate";
export const lotTargetActualField = "TargetActual";
export const lotTargetActualDateField = "TargetActualDate";

export const lotIdField = "LotID";
export const lotPriorityField = "Priority1_1";
export const lotStatusField = "StatusLA";
export const municipalityField = "Municipality";
export const barangayField = "Barangay";
export const landOwnerField = "LandOwner";
export const cpField = "CP";
export const landUseField = "LandUse";
export const endorsedField = "Endorsed";
export const lotHandedOverField = "HandedOver";
export const lotHandedOverDateField = "HandedOverDate";
export const lotHandedOverAreaField = "HandedOverArea";
export const percentHandedOverField = "percentHandedOver";
export const tunnelAffectLotField = "TunnelAffected";
export const affectedAreaField = "AffectedArea";

// Lot Status

export const lotStatusLabel = [
  "Paid",
  "For Payment Processing",
  "For Legal Pass",
  "For Offer to Buy",
  "For Notice of Taking",
  "With PTE",
  "For Expropriation",
  "Optimized",
];

export const lotStatusColor = [
  "#00734d",
  "#0070ff",
  "#ffff00",
  "#ffaa00",
  "#FF5733",
  "#70AD47",
  "#FF0000",
  "#B2B2B2",
];
export const lotStatusQuery = lotStatusLabel.map((status, index) => {
  return Object.assign({
    category: status,
    value: index + 1,
    color: lotStatusColor[index],
  });
});

export const lotUseArray = [
  "Agricultural",
  "Agricultural & Commercial",
  "Agricultural / Residential",
  "Commercial",
  "Industrial",
  "Irrigation",
  "Residential",
  "Road",
  "Road Lot",
  "Special Exempt",
];

// Lot Endorsed
export const endorsedStatus = ["Not Endorsed", "Endorsed", "NA"];

// Structure
export const structureStatusField = "StatusStruc";
export const structureIdField = "StrucID";
export const structureStatusLabel = [
  "Demolished",
  "Paid",
  "For Payment Processing",
  "For Legal Pass",
  "For Offer to Compensate",
  "For Notice of Taking",
  "No Need to Acquire",
];

export const structureStatusColorHex = [
  "#00C5FF",
  "#70AD47",
  "#0070FF",
  "#FFFF00",
  "#FFAA00",
  "#FF5733",
  "#B2BEB5",
];
export const structureStatusColorRgb = [
  [0, 197, 255, 0.6],
  [112, 173, 71, 0.6],
  [0, 112, 255, 0.6],
  [255, 255, 0, 0.6],
  [255, 170, 0, 0.6],
  [255, 83, 73, 0.6],
  [178, 190, 181, 0.6],
];

export const structureStatusQuery = structureStatusLabel.map(
  (status, index) => {
    return Object.assign({
      category: status,
      value: index + 1,
      colorLayer: structureStatusColorRgb[index],
      color: structureStatusColorHex[index],
    });
  },
);

// Permit to Enter for structure
export const structurePteField = "PTE";

// Structure MOA
export const structureMoaField = "MoA";
export const structureMoaStatus = [
  "For Negotiation",
  "Expropriation",
  "Donation",
  "No Need to Acquire",
];

export const structureMoaQuery = structureMoaStatus.map((status, index) => {
  return Object.assign({
    category: status,
    value: index + 1,
  });
});

// NLO
export const nloStatusField = "StatusRC";
export const nloStatusLabel = [
  "Relocated",
  "Paid",
  "For Payment Processing",
  "For Legal Pass",
  "For Appraisal/OtC/Requirements for Other Entitlements",
  "For Notice of Taking",
];
export const nloStatusColor = [
  "#00C5FF",
  "#70AD47",
  "#0070FF",
  "#FFFF00",
  "#FFAA00",
  "#FF0000",
];

export const nloStatusSymbolRef = [
  "https://EijiGorilla.github.io/Symbols/3D_Web_Style/ISF/ISF_Relocated.svg",
  "https://EijiGorilla.github.io/Symbols/3D_Web_Style/ISF/ISF_Paid.svg",
  "https://EijiGorilla.github.io/Symbols/3D_Web_Style/ISF/ISF_PaymentProcess.svg",
  "https://EijiGorilla.github.io/Symbols/3D_Web_Style/ISF/ISF_LegalPass.svg",
  "https://EijiGorilla.github.io/Symbols/3D_Web_Style/ISF/ISF_OtC.svg",
  "https://EijiGorilla.github.io/Symbols/3D_Web_Style/ISF/ISF_LBP.svg",
];

export const nloStatusQuery = nloStatusLabel.map((status, index) => {
  return Object.assign({
    category: status,
    value: index + 1,
    color: nloStatusColor[index],
  });
});

// Structure Ownership
export const structureOwnershipStatusField = "Status";
export const structureOwnershipStatusLabel = ["LO (Land Owner)", "Households"];
export const structureOwnershipColor = [
  [128, 128, 128, 1],
  [128, 128, 128, 1],
];

// Structure Occupancy
export const structureOccupancyStatusField = "Occupancy";
export const structureOccupancyStatusLabel = ["Occupied", "Relocated"];
export const structureOccupancyRef = [
  "https://EijiGorilla.github.io/Symbols/Demolished.png",
  "https://EijiGorilla.github.io/Symbols/DemolishComplete_v2.png",
];

// Pier Access layer
export const pierAccessValue = ["empty", "accessible", "others"];
export const pierAccessValueLabel = [
  "Dates are missing",
  "Accessible",
  "Others",
];
export const pierAccessValueDateColor = [
  [255, 0, 0, 0.9], // Missing
  [0, 255, 0, 0.9], // Accessible
  [255, 255, 255, 0.9], // Dates are missing
];

export const pierAccessStatusField = "AccessStatus";
export const pierAccessBatchField = "BatchNo";

// Handed Over Date and Handed Over Area
export const handedOverLotField = "HandedOver";

// Chart and chart label color
export const primaryLabelColor = "#9ca3af";
export const valueLabelColor = "#d1d5db";

//---------------------------------------------//
//        Tree Cutting & Compensation          //
//---------------------------------------------//
export const treeStatus_field = "Status";

//--- Tree Cutting ---//
export const colorsCutting = ["#71ab48", "#ffff00", "#ffaa00", "#ff0000"];
export const statusTreeCutting: string[] = [
  "Cut/Earthballed",
  "Permit Acquired",
  "Submitted to DENR",
  "Ongoing Acquisition of Application Documents",
];

export const statusTreeCuttingChart = [
  {
    category: statusTreeCutting[0],
    value: 1,
    color: colorsCutting[0],
  },
  {
    category: statusTreeCutting[1],
    value: 2,
    color: colorsCutting[1],
  },
  {
    category: statusTreeCutting[2],
    value: 3,
    color: colorsCutting[2],
  },
  {
    category: statusTreeCutting[3],
    value: 4,
    color: colorsCutting[3],
  },
];

//--- Tree Compensation ---//
export const treeCompen_status_field = "Compensation";
export const colorsCompen = ["#0070ff", "#ffff00", "#71ab48"];
const statusTreeCompensation: string[] = [
  "Non-Compensable",
  "For Processing",
  "Compensated",
];

export const statusTreeCompensationChart = [
  {
    category: statusTreeCompensation[0],
    value: 1,
    color: colorsCompen[0],
  },
  {
    category: statusTreeCompensation[1],
    value: 2,
    color: colorsCompen[1],
  },
  {
    category: statusTreeCompensation[2],
    value: 3,
    color: colorsCompen[2],
  },
];

//---------------------------------------------//
//              Layer List                     //
//---------------------------------------------//
// Layter list
export async function defineActions(event: any) {
  const { item } = event;

  // NGCP Site 6
  if (item.title === "Proposed Pole Working Areas") {
    item.actionsSections = new Collection([
      new Collection([
        new ActionButton({
          title: "Zoom to Area",
          icon: "zoom-in-fixed",
          id: "full-extent-ngcpwa6",
        }),
      ]),
    ]);
  }

  if (item.title === "Proposed/Recorded NGCP Lines") {
    item.actionsSections = new Collection([
      new Collection([
        new ActionButton({
          title: "Zoom to Area",
          icon: "zoom-in-fixed",
          id: "full-extent-ngcpline6",
        }),
      ]),
    ]);
  }

  if (item.title === "Proposed Pole Relocation") {
    item.actionsSections = new Collection([
      new Collection([
        new ActionButton({
          title: "Zoom to Area",
          icon: "zoom-in-fixed",
          id: "full-extent-ngcppolerelo6",
        }),
      ]),
    ]);
  }

  // NGCP Site 7
  // if (item.title === "Proposed Pole Working Areas") {
  //   item.actionsSections = new Collection([
  //     new Collection([
  //       new ActionButton({
  //         title: "Zoom to Area",
  //         icon: "zoom-in-fixed",
  //         id: "full-extent-ngcpwa7",
  //       }),
  //     ]),
  //   ]);

  //   // highlightLot(ngcp_tagged_structureLayer);
  // }

  if (item.title === "Proposed/Recorded NGCP Lines") {
    item.actionsSections = new Collection([
      new Collection([
        new ActionButton({
          title: "Zoom to Area",
          icon: "zoom-in-fixed",
          id: "full-extent-ngcpline7",
        }),
      ]),
    ]);
  }

  if (item.title === "Proposed Pole Relocation") {
    item.actionsSections = new Collection([
      new Collection([
        new ActionButton({
          title: "Zoom to Area",
          icon: "zoom-in-fixed",
          id: "full-extent-ngcppolerelo7",
        }),
      ]),
    ]);
  }

  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend",
      open: true,
    };
  }

  // if (item.title === "Super Urgent Lot") {
  //   // highlightLot(superUrgentLotLayer);
  // } else if (item.title === "Handed-Over (public + private)") {
  //   // highlightLot(handedOverLotLayer);
  // } else if (item.title === "Tunnel Affected") {
  //   highlightLot(tunnelAffectedLotLayer, arcgisScene);
  // }

  item.title === "Chainage" ||
  item.title === "SC Alignment 7.1.6" ||
  item.title === "SC Alignment 3.9.3" ||
  item.title === "Substation" ||
  item.title === "Future Track" ||
  item.title === "Households Ownership (Structure)" ||
  item.title === "Super Urgent Lot" ||
  item.title === "Handed-Over (public + private)" ||
  item.title === "For Land Optimization" ||
  item.title === "Land Acquisition (Endorsed Status)" ||
  item.title === "Tunnel Affected" ||
  item.title ===
    "Candidate Lots of NSCR-Ex Passenger & Freight Line for Optimization" ||
  item.title === "Optimized Lots with Issued Notice of Taking" ||
  item.title === "Structure" ||
  item.title === "Households" ||
  item.title === "Occupancy (Structure)" ||
  item.title === "Proposed Pole Working Areas" ||
  item.title === "Proposed/Recorded NGCP Lines" ||
  item.title === "Proposed Pole Relocation" ||
  item.title === "Handed-Over Area" ||
  item.title === "Tree Cutting" ||
  item.title === "Tree Compensation" ||
  item.title === "Tree Cutting & Compensation" ||
  item.title === "Point Symbol" ||
  item.title === "Point Status" ||
  item.title === "Line Symbol" ||
  item.title === "Line Status" ||
  item.title === "Pier Head/Column" ||
  item.title === "Viaduct"
    ? (item.visible = false)
    : (item.visible = true);
}
