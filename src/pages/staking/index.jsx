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
import Header from "../../components/Header";

const Staking = () => {
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

      let temp = [];
      res.map((data, index) => {
        temp = [
          ...temp,
          {
            id: data.NETWORK,
            label: data.NETWORK,
            value: data.VOLUME.toFixed(2),
            color: colors.chartPalette[(index + 1) * 100],
          },
        ];
      });
      setDataIBCPercent(temp);
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
      <Header
        title="Supply"
        subtitle="The Supply page includes data about the supply and distribution of LUNA,
         the native token of the Terra blockchain. It can give an indication of the overall
          supply and distribution of LUNA, as well as the transfer of LUNA between the Terra and other blockchain networks,
         and the distribution and timing of the airdropped tokens."
      />

      <Grid container gap={2}>
        <Grid item xs={12}>
          <Header
            title="Terra(LUNA) token"
            subtitle="This section includes data about the supply of LUNA. 
            It can give an indication of the overall distribution of LUNA."
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Total Supply"
            source={apis.getTotalAndCirculatingSupply}
            info={
              dataTotalSupply ? dataTotalSupply.toLocaleString("en-US") : null
            }
            status={statusTotalAndCirculatingSupply}
            getData={getTotalAndCirculatingSupply}
          />
        </Grid>
        <Grid item xs={12} lg={3.8}>
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
        </Grid>

        <Grid item xs={12} lg={3.8}>
          <InfoCard
            title="Circulation Ratio"
            source={apis.queryTotalAndCirculatingSupply}
            info={
              dataCirculatingSupply && dataTotalNumberOfStakedLUNA
                ? (
                    (dataCirculatingSupply * 100) /
                    dataTotalNumberOfStakedLUNA
                  ).toFixed(2) + "%"
                : null
            }
            status={statusTotalAndCirculatingSupply}
            getData={getTotalAndCirculatingSupply}
          />
        </Grid>
      </Grid>

      <Grid container gap={2} sx={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <Header
            title="IBC"
            subtitle="This section includes data about the amount of LUNA that is transferred between 
          the Terra and other blockchain networks via the Inter-Blockchain Communication (IBC) protocol,
           as well as the most used chains for IBC. This data can give an 
          indication of the level of interoperability between the Terra and other blockchain networks."
          />
        </Grid>

        <MyChart
          title="Most used chains for IBC"
          Chart={IBCPercent}
          data={dataIBCPercent}
          getData={getIBCPercent}
          status={statusIBCPercent}
          id="IBCPercent"
        />

        <MyChart
          title="# of LUNA IBC-ed out weekly"
          Chart={IBC}
          data={dataIBC}
          getData={getIBC}
          status={statusIBC}
        />

        <MyChart
          title="Weekly Staking"
          Chart={WeeklyStaking}
          data={dataWeeklyStaking}
          getData={getWeeklyStaking}
          status={StatusWeeklyStaking}
        />
        <MyChart
          title="Weekly Staking Reward Distributed"
          Chart={WeeklyStakingRewardsDistributed}
          data={dataWeeklyStakingRewardsDistributed}
          getData={getWeeklyStakingRewardsDistributed}
          status={statusWeeklyStakingRewardsDistributed}
        />
      </Grid>
    </Box>
  );
};

export default Staking;
