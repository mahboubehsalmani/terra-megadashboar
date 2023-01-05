import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const AboutTerra = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        border: `1px solid ${colors.backgroundColor[400]}`,
        borderRadius: "10px",
        backgroundColor: colors.backgroundColor[400],
        boxShadow: `1px 2px ${colors.backgroundColor[900]}`,
        justifyContent: "start",
        display: "flex",
        padding: "20px",
        flexDirection: "column",
        marginTop: "10px",
      }}
    >
      <Typography
        sx={{
          color: colors.grey[200],
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        About Terra
      </Typography>
      <Typography
        sx={{
          textAlign: "justify",
          fontSize: "1rem",
          marginTop: "8px",
        }}
      >
        Terra is a decentralized, open-source blockchain platform that enables
        the creation and use of stablecoins and other financial applications. It
        was developed by the Terraform Labs team and is supported by a large and
        active community of users and developers.
      </Typography>

      <Typography
        sx={{
          textAlign: "justify",
          fontSize: "1rem",
          marginTop: "8px",
        }}
      >
        One of the key features of the Terra blockchain is its use of a
        proof-of-stake (PoS) consensus algorithm, which allows users to earn
        rewards for participating in the network by staking their tokens. This
        approach is designed to be more energy-efficient than proof-of-work
        (PoW) algorithms, which are used by many other blockchains. Terra's
        native token, LUNA, is used to pay transaction fees on the platform and
        also plays a key role in the PoS algorithm.
      </Typography>
      <Typography
        sx={{
          textAlign: "justify",
          fontSize: "1rem",
          marginTop: "8px",
        }}
      >
        The Terra Network Analytical Dashboard is a comprehensive resource for
        tracking key metrics and data points related to the Terra blockchain.
        With data that is updated every 3 hours, you can stay informed on the
        latest trends and developments in real time. On this dashboard, you can
        explore a range of data, including activity, wallets, and staking
        rewards. The interactive charts and customizable views make it easy to
        analyze the data and gain insights into the inner workings of the Terra
        network. Whether you are a Terra network user, investor, or simply
        interested in learning more about the platform, we hope this dashboard
        will be a valuable resource for you.
      </Typography>
    </Box>
  );
};

export default AboutTerra;
