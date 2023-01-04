import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import apis from "../../services/apis";
import MyChart from "../../components/MyChart";
import NewContractsDeployedEachWeek from "./newContractsDeployedEachWeek";
import { useEffect, useState } from "react";
import http from "../../services/http";
import NumberOfCommitsPerWeek from "./numberOfCommitsPerWeek";
import TotalContractsDeployedEachWeek from "./totalContractsDeployedEachWeek";

const Development = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState("loaded");
  const [
    statusTotalContractsDeployedEachWeek,
    setStatusTotalContractsDeployedEachWeek,
  ] = useState("loading");
  const [
    dataTotalContractsDeployedEachWeek,
    setDataTotalContractsDeployedEachWeek,
  ] = useState({
    labels: [],
    datasets: [
      {
        label: "Average",
        data: [],
        backgroundColor: [colors.secondary[400]],
        borderColor: colors.secondary[500],
        borderWidth: 1,
      },
    ],
  });
  const [
    dataNewContractsDeployedEachWeek,
    setDataNewContractsDeployedEachWeek,
  ] = useState({
    labels: [],
    datasets: [
      {
        label: "Average",
        data: [],
        backgroundColor: [colors.secondary[400]],
        borderColor: colors.secondary[500],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getNewContractsDeployedEachWeek();
    getTotalContractsDeployedEachWeek();
  }, []);

  const getNewContractsDeployedEachWeek = async () => {
    let res = [];
    setLoading("loading");
    try {
      res = await http.get(apis.getNewContractsDeployedEachWeek);
      setDataNewContractsDeployedEachWeek({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "NEW CONTRACTS",
            data: res.map((data) => data.NEW_CONTRACTS),
            backgroundColor: [colors.chartPalette[100]],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
          },
        ],
      });
      setLoading("loaded");
    } catch (error) {
      setLoading("error");
    }
  };

  const getTotalContractsDeployedEachWeek = async () => {
    let res = [];
    setStatusTotalContractsDeployedEachWeek("loading");
    try {
      res = await http.get(apis.getTotalContractsDeployedEachWeek);
      setDataTotalContractsDeployedEachWeek({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Deployed contract",
            data: res.map((data) => data.TOTAL_CONTRACTS),
            backgroundColor: [colors.chartPalette[100]],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
          },
        ],
      });
      setStatusTotalContractsDeployedEachWeek("loaded");
    } catch (error) {
      setStatusTotalContractsDeployedEachWeek("error");
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Header
        title="Developments"
        subtitle="Shows charst of Developments in Terradash"
      />

      <Grid container gap={2}>
        <MyChart
          title="New Contracts Deployed Each Week"
          Chart={NewContractsDeployedEachWeek}
          url={apis.queryNewContractsDeployedEachWeek}
          status={loading}
          data={dataNewContractsDeployedEachWeek}
          getData={getNewContractsDeployedEachWeek}
          id={"NewContractsDeployedEachWeek"}
        />

        <MyChart
          title="Total Contracts Deployed Each Week"
          Chart={TotalContractsDeployedEachWeek}
          url={apis.queryTotalContractsDeployedEachWeek}
          status={statusTotalContractsDeployedEachWeek}
          data={dataTotalContractsDeployedEachWeek}
          getData={getTotalContractsDeployedEachWeek}
          id={"TotalContractsDeployedEachWeek"}
        />

        <MyChart
          title="Number of Commits per Week"
          Chart={NumberOfCommitsPerWeek}
          url={
            "https://github.com/terra-money/core/graphs/commit-activity-data"
          }
          id={"NumberOfCommitsPerWeek"}
        />
      </Grid>
    </Box>
  );
};

export default Development;
