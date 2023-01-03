import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import apis from "../../services/apis";
import TotalNumberOfActiveWalletsPerWeek from "./totalNumberOfActiveWalletsPerWeek";
import TotalNumberOfNewWalletsPerWeek from "./totalNumberOfNewWalletsPerWeek";
import CumulativeNumberOfWalletsOverTime from "./cumulativeNumberOfWalletsOverTime";
import MyChart from "../../components/MyChart";
import { useEffect, useState } from "react";
import http from "../../services/http";

const Wallets = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [
    statusTotalNumberOfActiveWalletsPerWeek,
    setStatusTotalNumberOfActiveWalletsPerWeek,
  ] = useState("loading");
  const [
    statusTotalNumberOfNewWalletsPerWeek,
    setStatusTotalNumberOfNewWalletsPerWeek,
  ] = useState("loading");
  const [
    statusCumulativeNumberOfWalletsOverTime,
    setStatusCumulativeNumberOfWalletsOverTime,
  ] = useState("loading");
  const [
    dataTotalNumberOfActiveWalletsPerWeek,
    setDataTotalNumberOfActiveWalletsPerWeek,
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
    dataTotalNumberOfNewWalletsPerWeek,
    setDataTotalNumberOfNewWalletsPerWeek,
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
    dataCumulativeNumberOfWalletsOverTime,
    setDataCumulativeNumberOfWalletsOverTime,
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
    getTotalNumberOfActiveWalletsPerWeek();
    getCumulativeNumberOfWalletsOverTime();
    getTotalNumberOfNewWalletsPerWeek();
  }, []);

  const getTotalNumberOfActiveWalletsPerWeek = async () => {
    let res = [];

    try {
      res = await http.get(apis.getTotalNumberOfActiveWalletsPerWeek);
      setDataTotalNumberOfActiveWalletsPerWeek({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "ACTIVE WALLETS",
            data: res.map((data) => data.ACTIVE_WALLETS),
            backgroundColor: [colors.secondary[400]],
            borderColor: colors.secondary[500],
            borderWidth: 1,
          },
        ],
      });
      setStatusTotalNumberOfActiveWalletsPerWeek("loaded");
    } catch (error) {
      setStatusTotalNumberOfActiveWalletsPerWeek("error");
    }
  };

  const getCumulativeNumberOfWalletsOverTime = async () => {
    let res = [];
    try {
      res = await http.get(apis.getCumulativeNumberOfWalletsOverTime);
      setDataCumulativeNumberOfWalletsOverTime({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "CUMULATIVE NEW WALLETS",
            data: res.map((data) => data.CUMULATIVE_NEW_WALLETS),
            backgroundColor: [colors.secondary[400]],
            borderColor: colors.secondary[500],
            borderWidth: 1,
          },
        ],
      });
      setStatusCumulativeNumberOfWalletsOverTime("loaded");
    } catch (error) {
      setStatusCumulativeNumberOfWalletsOverTime("error");
    }
  };

  const getTotalNumberOfNewWalletsPerWeek = async () => {
    let res = [];
    try {
      res = await http.get(apis.getTotalNumberOfNewWalletsPerWeek);
      setDataTotalNumberOfNewWalletsPerWeek({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "NEW WALLETS",
            data: res.map((data) => data.NEW_WALLETS),
            backgroundColor: [colors.secondary[400]],
            borderColor: colors.secondary[500],
            borderWidth: 1,
          },
        ],
      });
      setStatusTotalNumberOfNewWalletsPerWeek("loaded");
    } catch (error) {
      setStatusTotalNumberOfNewWalletsPerWeek("error");
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Header
        title="Wallets"
        subtitle="Shows charst of Wallets' activities in Terradash"
      />
      <Grid container gap={2}>
        <MyChart
          title="Total Number Of Active Wallets Per Week"
          Chart={TotalNumberOfActiveWalletsPerWeek}
          url={apis.queryTotalNumberOfActiveWalletsPerWeek}
          status={statusTotalNumberOfActiveWalletsPerWeek}
          getData={getTotalNumberOfActiveWalletsPerWeek}
          data={dataTotalNumberOfActiveWalletsPerWeek}
        />

        <MyChart
          title="Total Number Of New Wallets Per Week"
          Chart={TotalNumberOfNewWalletsPerWeek}
          url={apis.queryTotalNumberOfNewWalletsPerWeek}
          status={statusTotalNumberOfNewWalletsPerWeek}
          getData={getTotalNumberOfNewWalletsPerWeek}
          data={dataTotalNumberOfNewWalletsPerWeek}
        />

        <MyChart
          title="Cumulative Number Of Wallets Over Time"
          Chart={CumulativeNumberOfWalletsOverTime}
          url={apis.queryCumulativeNumberOfWalletsOverTime}
          status={statusCumulativeNumberOfWalletsOverTime}
          getData={getCumulativeNumberOfWalletsOverTime}
          data={dataCumulativeNumberOfWalletsOverTime}
        />
      </Grid>
    </Box>
  );
};

export default Wallets;
