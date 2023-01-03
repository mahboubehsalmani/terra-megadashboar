import { useTheme } from "@emotion/react";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import BarChart from "../../components/BarChart";
import InfoCard from "../../components/InfoCard";
import apis from "../../services/apis";
import http from "../../services/http";
import { tokens } from "../../theme";
import TerraPastSevenDaysHourlyPrice from "./terraPastSevenDaysHourlyPrice";
import MyChart from "../../components/MyChart";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const sourceQuickData = apis.queryAllTimeQuickTransactions;
  const [quickData, setQuickData] = useState({});
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [statusHourlyPrice, setStatusHourlyPrice] = useState("loading");
  const [statusAverageTPS, setStatusAverageTPS] = useState("loading");
  const [statusNewUsers, setStatusNewUsers] = useState("loading");
  const [statusTransactions, setStatusTransactions] = useState("loading");
  const [dataAverageTPS, setDataAverageTPS] = useState(null);
  const [dataNewUsers, setDataNewUsers] = useState(null);
  const [dataTransactions, setDataTransactions] = useState(null);
  const [dataHourlyPrice, setDataHourlyPrice] = useState({
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
    getData();
    getHourlyPrice();
    getTransactions();
    getNewUsers();
    getAverageTPS();
  }, []);

  const getData = async () => {
    try {
      const res = await http.get(apis.getThisWeekQuickTransactions);
      setQuickData(res[0]);
      setLoadingStatus("loaded");
    } catch (error) {
      setLoadingStatus("error");
    }
  };

  const getAverageTPS = async () => {
    setStatusAverageTPS("loading");
    try {
      const res = await http.get(apis.getAverageTPSForPastDay);
      setDataAverageTPS(res[0].AVERAGE_TPS);
      setStatusAverageTPS("loaded");
    } catch (error) {
      setStatusAverageTPS("error");
    }
  };

  const getTransactions = async () => {
    setStatusTransactions("loading");
    try {
      const res = await http.get(apis.getNumberOfTransactionsPastDay);
      setDataTransactions(res[0].TX_COUNT);
      setStatusTransactions("loaded");
    } catch (error) {
      setStatusTransactions("error");
    }
  };

  const getNewUsers = async () => {
    setStatusNewUsers("loading");
    try {
      const res = await http.get(apis.getNewWalletsPastDay);
      console.log(res[0]);
      setDataNewUsers(res[0].NEW_WALLETS);
      setStatusNewUsers("loaded");
    } catch (error) {
      setStatusNewUsers("error");
    }
  };

  const getHourlyPrice = async () => {
    setStatusHourlyPrice("loading");

    try {
      const res = await http.get(apis.getHourlyPrive);
      setDataHourlyPrice({
        labels: res.map((data) => data.HOUR),
        datasets: [
          {
            label: "Price",
            data: res.map((data) => data.PRICE),
            backgroundColor: [colors.chartPalette[100]],
            borderColor: colors.chartPalette[100],
            borderWidth: 1,
          },
        ],
      });
      setStatusHourlyPrice("loaded");
    } catch (error) {
      setStatusHourlyPrice("error");
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
      }}
    >
      <h1>HOME</h1>

      <Grid
        container
        gap={2}
        sx={{
          width: "100%",
        }}
      >
        <InfoCard
          title="Total No. of Transactions"
          source={sourceQuickData}
          info={
            quickData.TOTAL_TRANSACTIONS
              ? quickData.TOTAL_TRANSACTIONS.toLocaleString("en-US")
              : null
          }
          status={loadingStatus}
          getData={getData}
        />
        <InfoCard
          title="Total Fee of Transactions"
          source={sourceQuickData}
          info={
            quickData.TOTAL_FEE
              ? quickData.TOTAL_FEE.toLocaleString("en-US")
              : null
          }
          status={loadingStatus}
          getData={getData}
        />
        <InfoCard
          title="Average of Fees of Transactions"
          source={sourceQuickData}
          info={
            quickData.AVERAGE_FEE
              ? quickData.AVERAGE_FEE.toLocaleString("en-US")
              : null
          }
          status={loadingStatus}
          getData={getData}
        />
        <InfoCard
          title="Total Users"
          source={sourceQuickData}
          info={
            quickData.USERS ? quickData.USERS.toLocaleString("en-US") : null
          }
          status={loadingStatus}
          getData={getData}
        />
        <InfoCard
          title="Total TPS"
          source={sourceQuickData}
          info={quickData.TPS ? quickData.TPS.toLocaleString("en-US") : null}
          status={loadingStatus}
          getData={getData}
        />

        <InfoCard
          title="No. Transactions of past 24 hours"
          source={apis.queryNumberOfTransactionsPastDay}
          info={
            dataTransactions ? dataTransactions.toLocaleString("en-US") : null
          }
          status={statusTransactions}
          getData={getTransactions}
        />

        <InfoCard
          title="Average TPS of past 24 hours"
          source={apis.queryAverageTPSForPastDay}
          info={dataAverageTPS ? dataAverageTPS.toLocaleString("en-US") : null}
          status={statusAverageTPS}
          getData={getAverageTPS}
        />

        <InfoCard
          title="New users of past 24 hours"
          source={apis.queryNewWalletsPastDay}
          info={dataNewUsers ? dataNewUsers.toLocaleString("en-US") : null}
          status={statusNewUsers}
          getData={getNewUsers}
        />
      </Grid>

      <Grid container>
        <MyChart
          title="Terra's hourly price for the past 7 days"
          Chart={TerraPastSevenDaysHourlyPrice}
          url={apis.queryHourlyPrice}
          status={statusHourlyPrice}
          getData={getHourlyPrice}
          data={dataHourlyPrice}
          defaultSize={100}
        />
      </Grid>
    </Box>
  );
};

export default Home;
