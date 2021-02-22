import React, { useEffect } from "react";
import { ResponsiveRadar } from "@nivo/radar";

const chartTheme = {
  axis: {
    ticks: {
      text: {
        fill: "#ccc",
      },
    },
  },
  grid: {
    line: {
      stroke: "rgba(255, 255, 255, .15)",
    },
  },

  tooltip: {
    container: {
      background: "#2d374d",
      color: "inherit",
      boxShadow: "0 3px 9px rgba(0, 0, 0, 0.5)",
      fontFamily: "monospace",
    },
  },
};

const dataTemp = [
  {
    name: "usd20",
    current: 78,
    sketch: 0,
  },
  {
    name: "usd10",
    current: 102,
    sketch: 0,
  },
  {
    name: "usd30",
    current: 47,
    sketch: 0,
  },
  {
    name: "usd40",
    current: 28,
    sketch: 0,
  },
  {
    name: "usd50",
    current: 64,
    sketch: 0,
  },
];

export default function NewRadarChart(props) {
  const { data } = props;
  const { keys } = props;

  return (
    <div className='NewRadarChart' style={{ height: "50vh" }}>
      <ResponsiveRadar
        theme={chartTheme}
        data={data}
        keys={keys}
        indexBy='option'
        maxValue='auto'
        margin={{ top: 70, right: 50, bottom: 40, left: 50 }}
        curve='linearClosed'
        borderWidth={2}
        borderColor={{ from: "color" }}
        gridLevels={5}
        gridShape='circular'
        gridLabelOffset={10}
        enableDots={true}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        dotBorderColor={{ from: "color" }}
        enableDotLabel={true}
        dotLabel={false}
        dotLabelYOffset={-12}
        colors={{ scheme: "accent" }}
        fillOpacity={0.25}
        blendMode='normal'
        animate={true}
        motionConfig='wobbly'
        isInteractive={true}
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: "#999",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
