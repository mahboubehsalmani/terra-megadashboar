import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import {
  LaunchOutlined as LaunchOutlinedIcon,
  RefreshOutlined as RefreshOutlinedIcon,
} from "@mui/icons-material";
import { tokens } from "../theme";

const InfoCard = ({ title, info, source, status, getData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Grid
      item
      xs={12}
      lg="3.8"
      md="5.7"
      sx={{
        border: `1px solid ${colors.secondaryBackground[400]}`,
        borderRadius: "10px",
        backgroundColor: colors.secondaryBackground[300],
        boxShadow: `1px 2px ${colors.backgroundColor[900]}`,
        justifyContent: "center",
        display: "flex",
        padding: "20px",
        flexDirection: "column",
        marginTop: "10px",
        width: "100%",
        maxHeight: "relative",
        height: "max-content",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography fontSize={"1.2rem"} color={colors.primary[500]}>
          {title}
        </Typography>
        <a
          href={source}
          target="_blank"
          style={{
            textDecoration: "none",
            color: colors.primary[500],
            marginTop: "4px",
          }}
        >
          <LaunchOutlinedIcon
            sx={{ marginLeft: "4px", alignItems: "center", fontSize: "1.2rem" }}
          />
        </a>
      </Box>
      <Box>
        <Box
          sx={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginTop: "8px",
            color: colors.chartPalette[100],
          }}
        >
          {status === "loaded" ? (
            info
          ) : status === "loading" ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <CircularProgress
                sx={{
                  color: colors.secondary[400],
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                marginBottom: "20px",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  color: "#de291d",
                }}
              >
                Oops! Something went wrong on the server.
              </Typography>
              <IconButton
                onClick={getData}
                sx={{
                  backgroundColor: colors.primary[300],
                  color: colors.grey[100],
                  borderRadius: "8px",
                  fontSize: "1.2rem",
                  padding: "10px",
                  marginTop: "10px",
                }}
              >
                <RefreshOutlinedIcon
                  sx={{
                    marginRight: "4px",
                  }}
                />
                Refresh
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default InfoCard;
