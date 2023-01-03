import { Pie } from "react-chartjs-2";

const PieChart = ({ data, options }) => {
  return (
    <Pie
      data={data}
      options={{
        width: "100",
        height: "100",
      }}
    />
  );
};

export default PieChart;
