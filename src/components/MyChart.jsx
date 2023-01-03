import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined as SettingsOutlinedIcon,
  LaunchOutlined as LaunchOutlinedIcon,
  CheckOutlined as CheckOutlinedIcon,
  RefreshOutlined as RefreshOutlinedIcon,
  WindowOutlined as WindowOutlinedIcon,
} from "@mui/icons-material";
import { tokens } from "../theme";

const MyChart = ({
  Chart,
  title,
  subtitle,
  status,
  getData,
  data,
  url,
  defaultSize,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chartWidth, setChartWidth] = useState(5.8);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (defaultSize) {
      defaultSize === 100 ? setChartWidth(11.6) : setChartWidth(5.8);
    } else {
      const width = window.innerWidth;
      width > 1200 ? setChartWidth(5.8) : setChartWidth(11.6);
    }
  }, []);

  return (
    <Grid
      item
      xs={chartWidth}
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
      <Box
        sx={{
          justifyContent: "space-between",
          justifyItems: "baseline",
          display: "flex",
          width: "100%",
        }}
      >
        <Box>
          <Typography color={colors.primary[600]} fontSize="1.4rem">
            {title}
          </Typography>
          <Typography color={colors.primary[300]} fontSize="1rem">
            {subtitle}
          </Typography>
        </Box>
        <Box>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <SettingsOutlinedIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose} divider={true}>
              <a
                href={url}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: colors.grey[100],
                  margin: 0,
                }}
              >
                Source Query
                <LaunchOutlinedIcon sx={{ marginLeft: "10px" }} />
              </a>
            </MenuItem>
            <MenuItem disabled sx={{ justifyContent: "space-between" }}>
              Chart Width
              <WindowOutlinedIcon />
            </MenuItem>
            <MenuItem
              sx={{
                justifyContent: "space-between",
                justifyItems: "baseline",
                display: "flex",
              }}
              onClick={() => {
                setChartWidth(5.8);
                handleClose();
              }}
            >
              50%
              {chartWidth === 5.8 && <CheckOutlinedIcon />}
            </MenuItem>
            <MenuItem
              sx={{
                justifyContent: "space-between",
                justifyItems: "baseline",
                display: "flex",
              }}
              onClick={() => {
                setChartWidth(11.6);
                handleClose();
              }}
            >
              100%
              {chartWidth === 11.6 && <CheckOutlinedIcon />}
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {status === "loading" ? (
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
      ) : status === "error" ? (
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
      ) : (
        <Chart data={data} />
      )}
    </Grid>
  );
};

export default MyChart;
