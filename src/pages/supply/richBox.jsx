import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import {
  Grid,
  Box,
  IconButton,
  Menu,
  Typography,
  useTheme,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import {
  SettingsOutlined as SettingsOutlinedIcon,
  LaunchOutlined as LaunchOutlinedIcon,
  CheckOutlined as CheckOutlinedIcon,
} from "@mui/icons-material";

const RichBox = ({ rows, title, subtitle, url }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chartWidth, setChartWidth] = useState(11.6);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const columns = [
    {
      field: "id",
      headerName: "No.",
      hide: true,
      valueFormatter: (data) => {
        return data.value + 1;
      },
    },
    {
      field: "USER",
      headerName: "USER",
      minWidth: 320,
      width: (window.innerWidth * 2) / 5,
    },
    {
      field: "BALANCE",
      headerName: "BALANCE",
      valueFormatter: (data) => {
        if (data.value == null) return "";
        return data.value.toLocaleString("en-US");
      },
      minWidth: 140,
      width: (window.innerWidth * 2) / 5,
    },
  ];

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
          <Typography color={colors.grey[200]} fontSize="1rem">
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
                style={{ textDecoration: "none", color: colors.grey[100] }}
              >
                Source Query
                <LaunchOutlinedIcon sx={{ marginLeft: "10px" }} />
              </a>
            </MenuItem>
            <MenuItem disabled>Chart Width</MenuItem>
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
      <Box
        sx={{
          height: "640px",
          marginTop: "20px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          sx={{
            boxShadow: 2,

            "& .MuiDataGrid-columnHeader": {
              background: colors.primary[400],
            },
          }}
        />
      </Box>
    </Grid>
  );
};

export default RichBox;
