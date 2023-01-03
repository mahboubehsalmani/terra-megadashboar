import { useTheme } from "@emotion/react";
import LineChart from "../../components/LineChart";
import { tokens } from "../../theme";

const TerraPastSevenDaysHourlyPrice = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const options = {
    color: colors.grey[100],
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        stacked: true,
        tick: {
          color: colors.redAccent[800],
          display: true,
        },
        grid: {
          display: true,
          color: colors.grey[600],
        },
        title: {
          display: true,
          color: colors.chartPalette[100],
          text: "Prie (USD)",
        },
      },
      x: {
        stacked: true,
        grid: {
          display: false,
          color: colors.grey[100],
        },
        title: {
          display: true,
          text: "Time",
          color: colors.chartPalette[100],
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };
  return <LineChart chartData={data} options={options} />;
};

export default TerraPastSevenDaysHourlyPrice;
