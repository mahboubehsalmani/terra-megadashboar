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
          fontSize: "1.2rem",
          marginTop: "8px",
        }}
      >
        Terra is an open-source, community-owned blockchain which hosts a
        vibrant ecosystem of applications. The Terra ecosystem runs on its
        native cryptocurrency, LUNA.You can use LUNA to pay for transaction fees
        on the Terra blockchain as you interact with various applications.
        Additionally, you can also use LUNA to earn staking rewards, purchase
        your favorite digital art, have a say on community-led governance
        proposals, and much more. In this analytical dashboard we will take a
        look at Activity, User behavior, Staking rewards and much more in the
        terra network. This dashboard is updated every 3 hours automatically.
      </Typography>
    </Box>
  );
};

export default AboutTerra;
