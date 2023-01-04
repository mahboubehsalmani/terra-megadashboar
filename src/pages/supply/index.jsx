import { Box, Grid, useTheme } from "@mui/material";
import RichBox from "./richBox";
import WeeklyStaking from "./weeklyStaking";
import MyChart from "../../components/MyChart";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import http from "../../services/http";
import apis from "../../services/apis";
import WeeklyStakingRewardsDistributed from "./weeklyStakingRewardsDistributed";
import InfoCard from "../../components/InfoCard";
import IBC from "./IBC";
import IBCPercent from "./IBCPercent";
import MyTable from "../../components/MaterialTable";

const Supply = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [richList, setRichList] = useState([]);
  const [StatusWeeklyStaking, setStatusWeeklyStaking] = useState("loading");
  const [statusIBC, setStatusIBC] = useState("loading");
  const [statusIBCPercent, setStatusIBCPercent] = useState("loading");
  const [dataTotalSupply, setDataTotalSupply] = useState(null);
  const [dataCirculatingSupply, setDataCirculatingSupply] = useState(null);
  const [dataTotalPercentStakedLUNA, setDataTotalPercentStakedLUNA] =
    useState(null);
  const [statusTotalAndCirculatingSupply, setStatusTotalAndCirculatingSupply] =
    useState("loading");
  const [dataTotalNumberOfStakedLUNA, setDataTotalNumberOfStakedLUNA] =
    useState(null);
  const [
    statusTotalNumberAndPercentOfStakedLUNA,
    setStatusTotalNumberAndPercentOfStakedLUNA,
  ] = useState("loading");
  const [
    statusWeeklyStakingRewardsDistributed,
    setStatusWeeklyStakingRewardsDistributed,
  ] = useState("loading");
  const [dataWeeklyStaking, setDataWeeklyStaking] = useState({
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
    dataWeeklyStakingRewardsDistributed,
    setDataWeeklyStakingRewardsDistributed,
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

  const [dataIBC, setDataIBC] = useState({
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

  const [dataIBCPercent, setDataIBCPercent] = useState({
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
    getIBC();
    getWeeklyStaking();
    getWeeklyStakingRewardsDistributed();
    getRichList();
    getTotalAndCirculatingSupply();
    getTotalNumberOfStakedLUNA();
    getIBCPercent();
  }, []);

  useEffect(() => {
    getTotalPercentofStakedLUNA();
  }, [dataTotalSupply, dataTotalNumberOfStakedLUNA]);

  const getIBC = async () => {
    let res = [];
    setStatusIBC("loading");
    try {
      res = await http.get(apis.getIBC);
      let _osmo = [];
      let _secret = [];
      let _CRE = [];
      let _SIF = [];
      let _kujira = [];
      let _cosmos = [];
      let _juno = [];
      let _others = [];
      await res.map((data) => {
        if (data.BLOCKCHAIN === "osmo") _osmo = [..._osmo, data];
        else if (data.BLOCKCHAIN === "secret") _secret = [..._secret, data];
        else if (data.BLOCKCHAIN === "CRE") _CRE = [..._CRE, data];
        else if (data.BLOCKCHAIN === "SIF") _SIF = [..._SIF, data];
        else if (data.BLOCKCHAIN === "kujira") _kujira = [..._kujira, data];
        else if (data.BLOCKCHAIN === "cosmos") _cosmos = [..._cosmos, data];
        else if (data.BLOCKCHAIN === "juno") _juno = [..._juno, data];
        else _others = [..._others, data];
      });
      setDataIBC({
        labels: _osmo.map((data) => data.WEEK),
        datasets: [
          {
            label: "Osmo",
            data: _osmo.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[100],
            stack: "base",
          },
          {
            label: "kujira",
            data: _kujira.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[200],
            stack: "base",
          },
          {
            label: "cosmos",
            data: _cosmos.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[300],
            stack: "base",
          },
          {
            label: "secret",
            data: _secret.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[400],
            stack: "base",
          },
          {
            label: "CRE",
            data: _CRE.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[500],
            stack: "base",
          },
          {
            label: "SIF",
            data: _SIF.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[700],
            stack: "base",
          },
          {
            label: "juno",
            data: _juno.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[800],
            stack: "base",
          },
          {
            label: "others",
            data: _others.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[900],
            stack: "base",
          },
        ],
      });
      setStatusIBC("loaded");
    } catch (error) {
      setStatusIBC("error");
    }
  };

  const getIBCPercent = async () => {
    let res = [];
    setStatusIBCPercent("loading");
    try {
      res = await http.get(apis.getIBCPercent);
      console.log(res);
      let labels = [];
      let volumes = [];
      res.map((data) => {
        labels = [...labels, data.NETWORK];
        volumes = [...volumes, data.VOLUME];
      });
      setDataIBCPercent({
        labels: labels,
        datasets: [
          {
            label: "# of Votes",
            data: volumes,
            backgroundColor: [
              colors.chartPalette[100],
              colors.chartPalette[200],
              colors.chartPalette[300],
              colors.chartPalette[400],
              colors.chartPalette[500],
              colors.chartPalette[600],
              colors.chartPalette[700],
              colors.chartPalette[800],
              colors.chartPalette[900],
            ],

            borderWidth: 1,
          },
        ],
      });
      console.log(labels, volumes);
      console.log(dataIBCPercent);
      setStatusIBCPercent("loaded");
    } catch (error) {
      console.log(error.message);
      setStatusIBCPercent("error");
    }
  };

  const getWeeklyStaking = async () => {
    let res = [];
    setStatusWeeklyStaking("loading");
    try {
      res = await http.get(apis.getWeeklyStaking);
      let _delegate = [];
      let _undelegate = [];
      let _redelegate = [];
      await res.map((data) => {
        if (data.ACTION === "Redelegate") _redelegate = [..._redelegate, data];
        else if (data.ACTION === "Undelegate")
          _undelegate = [..._undelegate, data];
        else _delegate = [..._delegate, data];
      });
      setDataWeeklyStaking({
        labels: _redelegate.map((data) => data.WEEK),
        datasets: [
          {
            label: "Redelegate",
            data: _redelegate.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[100],
            stack: "base",
          },
          {
            label: "Undelegate",
            data: _undelegate.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[200],
            stack: "base",
          },
          {
            label: "Delegate",
            data: _delegate.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[300],
            stack: "base",
          },
        ],
      });
      setStatusWeeklyStaking("loaded");
    } catch (error) {
      setStatusWeeklyStaking("error");
    }
  };

  const getWeeklyStakingRewardsDistributed = async () => {
    let res = [];
    setStatusWeeklyStakingRewardsDistributed("loading");
    try {
      res = await http.get(apis.getWeeklyStakingRewardsDistributed);
      let _delegate = [];
      let _undelegate = [];
      let _redelegate = [];
      await res.map((data) => {
        if (data.ACTION === "Redelegate") _redelegate = [..._redelegate, data];
        else if (data.ACTION === "Undelegate")
          _undelegate = [..._undelegate, data];
        else _delegate = [..._delegate, data];
      });
      setDataWeeklyStakingRewardsDistributed({
        labels: res.map((data) => data.WEEK),
        datasets: [
          {
            label: "Volume(LUNA)",
            data: res.map((data) => data.VOLUME),
            backgroundColor: colors.chartPalette[200],
            borderColor: colors.chartPalette[200],
            type: "line",
          },
          {
            label: "Count",
            yAxisID: "countAxis",
            data: res.map((data) => data.COUNT),
            backgroundColor: colors.chartPalette[100],
          },
        ],
      });
      setStatusWeeklyStakingRewardsDistributed("loaded");
    } catch (error) {
      setStatusWeeklyStakingRewardsDistributed("error");
    }
  };

  const getRichList = async () => {
    try {
      const res = await http.get(apis.getRichList);
      let data = [];
      res.map((row) => {
        data = [...data, [row.USER, row.BALANCE]];
      });
      setRichList(data);
    } catch (error) {}
  };

  const getTotalAndCirculatingSupply = async () => {
    setStatusTotalAndCirculatingSupply("loading");
    try {
      const res = await http.get(apis.getTotalAndCirculatingSupply);
      setDataTotalSupply(res.market_data.total_supply);
      setDataCirculatingSupply(res.market_data.circulating_supply);
      setStatusTotalAndCirculatingSupply("loaded");
    } catch (error) {
      setStatusTotalAndCirculatingSupply("error");
    }
  };

  const getTotalNumberOfStakedLUNA = async () => {
    setStatusTotalNumberAndPercentOfStakedLUNA("loading");
    try {
      const res = await http.get(apis.getTotalNumberOfStakedLUNA);
      setDataTotalNumberOfStakedLUNA(res.result.bonded_tokens / 1e6);

      setStatusTotalNumberAndPercentOfStakedLUNA("loaded");
    } catch (error) {
      setStatusTotalNumberAndPercentOfStakedLUNA("error");
    }
  };

  const getTotalPercentofStakedLUNA = () => {
    if (dataTotalNumberOfStakedLUNA != null) {
      const temp = (dataTotalNumberOfStakedLUNA / dataTotalSupply) * 100;
      console.log(temp.toFixed(2));
      setDataTotalPercentStakedLUNA(temp.toFixed(2));
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
      }}
    >
      <h1>Supply</h1>

      <Grid
        container
        gap={2}
        sx={{
          width: "100%",
        }}
      >
        <InfoCard
          title="Total Supply"
          source={apis.getTotalAndCirculatingSupply}
          info={
            dataTotalSupply ? dataTotalSupply.toLocaleString("en-US") : null
          }
          status={statusTotalAndCirculatingSupply}
          getData={getTotalAndCirculatingSupply}
        />

        <InfoCard
          title="Circulating Supply"
          source={apis.queryTotalAndCirculatingSupply}
          info={
            dataCirculatingSupply
              ? dataCirculatingSupply.toLocaleString("en-US")
              : null
          }
          status={statusTotalAndCirculatingSupply}
          getData={getTotalAndCirculatingSupply}
        />

        <InfoCard
          title="Total number of staked LUNA"
          source={apis.queryTotalNumberOfStakedLUNA}
          info={
            dataTotalNumberOfStakedLUNA
              ? dataTotalNumberOfStakedLUNA.toLocaleString("en-US")
              : null
          }
          status={statusTotalNumberAndPercentOfStakedLUNA}
          getData={getTotalNumberOfStakedLUNA}
        />

        <InfoCard
          title="Total percent of staked LUNA"
          source={"#"}
          info={
            dataTotalPercentStakedLUNA ? dataTotalPercentStakedLUNA + "%" : null
          }
          status={statusTotalNumberAndPercentOfStakedLUNA}
          getData={getTotalPercentofStakedLUNA}
        />
      </Grid>
      <Grid container gap={2}>
        <MyChart
          title="Weekly Staking"
          Chart={WeeklyStaking}
          data={dataWeeklyStaking}
          getData={getWeeklyStaking}
          status={StatusWeeklyStaking}
        />

        <MyChart
          title="Number and percent of LUNA IBC-ed out"
          Chart={IBC}
          data={dataIBC}
          getData={getIBC}
          status={statusIBC}
        />

        <MyChart
          title="Percent of LUNA IBC-ed out of All Time"
          Chart={IBCPercent}
          data={dataIBCPercent}
          getData={getIBCPercent}
          status={statusIBCPercent}
        />

        <MyChart
          title="Weekly Staking Reward Distributed"
          Chart={WeeklyStakingRewardsDistributed}
          data={dataWeeklyStakingRewardsDistributed}
          getData={getWeeklyStakingRewardsDistributed}
          status={statusWeeklyStakingRewardsDistributed}
        />
        <MyTable
          data={richList}
          columns={["user", "balance"]}
          title="Rich List"
        />
      </Grid>
    </Box>
  );
};

export default Supply;
