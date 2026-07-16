import "../index.css";
import "@esri/calcite-components/components/calcite-switch";
import { memo, useEffect, useState } from "react";
import type { ArcgisScene } from "@arcgis/map-components/components/arcgis-scene";

const UndergroundSwitch = memo(() => {
  const arcgisScene = document.querySelector("arcgis-scene") as ArcgisScene;
  const [underground, setUnderground] = useState(false);

  useEffect(() => {
    if (arcgisScene?.map?.ground) {
      arcgisScene.map.ground.opacity = underground === true ? 1 : 0.7;
    }
  }, [underground]);

  return (
    <>
      <div
        className="groundSwitchDiv"
        style={{
          position: "fixed",
          zIndex: 10,
          bottom: 0,
          // left: 0,
          color: "white",
          borderStyle: "solid",
          borderColor: "grey",
          borderWidth: "0.7px",
          backgroundColor: "#2b2b2b",
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        Ground: {""}
        Off{" "}
        <calcite-switch
          oncalciteSwitchChange={(event: any) =>
            setUnderground(event.target.checked)
          }
        ></calcite-switch>{" "}
        On
      </div>
    </>
  );
});

export default UndergroundSwitch;
