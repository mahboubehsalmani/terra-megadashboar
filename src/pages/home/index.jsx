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
import AboutTerra from "./aboutTerra";
import CurrentPrice from "./currentPrice";
import QuickAccess from "./quickAccess";
import PastDayData from "./pastDayData";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [statusAverageTPS, setStatusAverageTPS] = useState("loading");
  const [statusNewUsers, setStatusNewUsers] = useState("loading");
  const [statusTransactions, setStatusTransactions] = useState("loading");
  const [statusHourlyPrice, setStatusHourlyPrice] = useState("loading");
  const [statusCurrentPrice, setStatusCurrentPrice] = useState("loading");
  const [statusActiveUsers, setStatusActiveUsers] = useState("loading");
  const [dataActiveUsers, setdataActiveUsers] = useState(null);
  const [dataCurrentPrice, setCurrentPrice] = useState(null);
  const [dataPastDay, setDataPastDay] = useState(null);
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
    getHourlyPrice();
    getCurrentPrice();
    getTransactions();
    getNewUsers();
    getAverageTPS();
    getActiveUsers();
  }, []);

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

  const getCurrentPrice = async () => {
    setStatusCurrentPrice("loading");
    try {
      const res = await http.get(apis.getCurrentPrice);
      setCurrentPrice(res[0]);
      console.log(res);
      setStatusCurrentPrice("loaded");
    } catch (error) {
      setStatusCurrentPrice("error");
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
      console.log(error.message);
      setStatusNewUsers("error");
    }
  };

  const getActiveUsers = async () => {
    setStatusActiveUsers("loading");
    try {
      const res = await http.get(apis.getActiveUserForPastDay);
      console.log(res[0]);
      setdataActiveUsers(res[0].USERS);
      setStatusActiveUsers("loaded");
    } catch (error) {
      console.log(error.message);
      setStatusActiveUsers("error");
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        paddingLeft: "0px",
      }}
    >
      <Grid container gap={2}>
        <Grid item xs={12} lg={8}>
          <AboutTerra />
          <QuickAccess />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <CurrentPrice
            data={dataCurrentPrice}
            status={statusCurrentPrice}
            getData={getCurrentPrice}
          />
          <TerraPastSevenDaysHourlyPrice data={dataHourlyPrice} />
          <PastDayData
            data={{
              dataAverageTPS,
              dataNewUsers,
              dataTransactions,
              dataActiveUsers,
            }}
            status={{
              statusAverageTPS,
              statusNewUsers,
              statusTransactions,
              statusActiveUsers,
            }}
            getData={{
              getAverageTPS,
              getNewUsers,
              getTransactions,
              getActiveUsers,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
